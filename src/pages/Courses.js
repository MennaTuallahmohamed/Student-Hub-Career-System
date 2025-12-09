var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageSquare, BookOpen, Briefcase, Users, FileText, Award, Star, Clock, Play, Download, Eye, Calendar, ChevronLeft, CheckCircle, PlayCircle, FileVideo, User, Globe } from 'lucide-react';
import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Courses.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService, CourseService, ExercisesService } from '../firebase/src/firebaseServices';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaBriefcase, FaBook, FaFileDownload, FaPencilAlt, FaSignOutAlt, } from 'react-icons/fa';
import { FaPaintBrush, FaShieldAlt, FaChartLine, FaCode, FaMobileAlt } from 'react-icons/fa';
import { Tag } from 'lucide-react';
import { SECTIONS } from './CoursesData';
import { Video, Link as LucideLink, Image } from 'lucide-react';
import { File, Plus } from 'lucide-react';
const faPaintBrush = _jsx(FaPaintBrush, {});
const faShieldAlt = _jsx(FaShieldAlt, {});
const faChartLine = _jsx(FaChartLine, {});
const faCode = _jsx(FaCode, {});
const faMobileAlt = _jsx(FaMobileAlt, {});
function Courses() {
    var _a;
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [activeTab, setActiveTab] = useState('courses');
    const [viewMode, setViewMode] = useState('courses');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [viewModeE, setViewModeE] = useState('catalog');
    const [quizOpen, setQuizOpen] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizResults, setQuizResults] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [loadingExercise, setLoadingExercise] = useState(false);
    const [currentCourseSection, setCurrentCourseSection] = useState({
        id: '',
        title: '',
        icon: _jsx(_Fragment, {}),
        courses: [],
    });
    const [showCertificate, setShowCertificate] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [mcqExpanded, setMcqExpanded] = useState(false);
    const [mcqAnswers, setMcqAnswers] = useState([]);
    const [mcqSubmitted, setMcqSubmitted] = useState(false);
    const [mcqScore, setMcqScore] = useState(null);
    const [exerciseAnswers, setExerciseAnswers] = useState({});
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [fileURL, setFileURL] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        category: [],
        message: '',
        attachedFile: null,
    });
    const navigate = useNavigate();
    const [sharedNotes, setSharedNotes] = useState([]);
    const prevSharedNotesCount = useRef(0);
    const [firebaseCourses, setFirebaseCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const currentSection = SECTIONS.find(sec => sec.id === activeSection);
    // ✅ Single source of truth for exercises
    const [exercises, setExercises] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [loadingExercises, setLoadingExercises] = useState(true); // Start true
    const [updatedCurrentSections, setUpdatedCurrentSection] = useState(null);
    const [firebaseExercises, setFirebaseExercises] = useState([]);
    const [currentSectionC, setCurrentSection] = useState(null);
    ////////////////////////////////////////
    //////////////////////////////////////
    //COURSES LECTURES
    /////////////////////////////////////
    ///////////////////////////////////////
    const handleCourseClick = (course) => {
        const fullCourse = Object.assign(Object.assign({}, course), { courseLinks: course.courseLinks || [], lessons: course.lessons || [], requirements: course.requirements || [], whatYouLearn: course.whatYouLearn || [], reviews: course.reviews || [] });
        setSelectedCourse(fullCourse);
        setViewMode('courses');
        setCurrentLesson(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
        setViewMode('lessons');
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleBackToCatalog = () => {
        setViewMode('catalog');
        setSelectedCourse(null);
        setCurrentLesson(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleBackToCourse = () => {
        setViewMode('courses');
        setCurrentLesson(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleShare = () => {
        if (navigator.clipboard && selectedCourse) {
            navigator.clipboard.writeText(window.location.href);
            setShareModal(true);
            setTimeout(() => setShareModal(false), 1500);
        }
    };
    const markLessonComplete = (lessonId) => {
        if (!selectedCourse)
            return;
        const updatedLessons = selectedCourse.lessons.map((lesson) => lesson.id === lessonId ? Object.assign(Object.assign({}, lesson), { completed: true }) : lesson);
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = Math.round((completedCount / updatedLessons.length) * 100);
        setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { lessons: updatedLessons, progress }));
        if (currentLesson && currentLesson.id === lessonId) {
            setCurrentLesson(Object.assign(Object.assign({}, currentLesson), { completed: true }));
        }
    };
    const loadFirebaseCourses = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoadingCourses(true);
            console.log('🔥 Starting to load Firebase courses...');
            const courses = yield CourseService.getAllCourses();
            console.log('🔥 Raw courses from Firebase:', courses);
            if (!courses || courses.length === 0) {
                console.log('🔥 No courses found in Firebase');
                setFirebaseCourses([]);
                return;
            }
            const formattedCourses = courses.map((course, index) => {
                console.log(`🔥 Processing course ${index + 1}:`, course.title);
                return {
                    id: parseInt(course.id) || Math.random() * 1000,
                    title: course.title || 'Untitled Course',
                    description: course.description || 'No description available',
                    thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center',
                    instructor: course.instructor || course.teacherName || 'Unknown Instructor',
                    rating: course.rating || 0,
                    students: course.studentsCount || 0,
                    duration: course.duration || 'Unknown',
                    level: course.level || course.difficulty || 'Beginner',
                    price: course.price || 'Free',
                    originalPrice: course.originalPrice,
                    modules: course.modules || course.lessons || 0,
                    certificate: course.certificate || false,
                    lessons: course.lessons || [],
                    overview: course.overview || '',
                    requirements: course.requirements || [],
                    whatYouLearn: course.whatYouLearn || [],
                    reviews: course.reviews || [],
                    courseLinks: course.courseLinks || [],
                    teacherId: course.teacherId, // ✅ مهم جدًا
                };
            });
            setFirebaseCourses(formattedCourses);
            console.log('🔥 Firebase courses loaded successfully:', formattedCourses);
            console.log('🔥 Number of Firebase courses:', formattedCourses.length);
        }
        catch (error) {
            console.error('🔥 Error loading courses from Firebase:', error);
            setFirebaseCourses([]);
        }
        finally {
            setLoadingCourses(false);
        }
    });
    useEffect(() => {
        const fetchUserData = () => __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const data = yield UserService.getUserData(user.uid);
                setUserData(data);
            }
        });
        fetchUserData();
    }, [user]);
    // ✅ دالة التسجيل في الكورس
    const handleEnroll = (course) => __awaiter(this, void 0, void 0, function* () {
        if (!user) {
            alert('Please log in to enroll in this course.');
            return;
        }
        try {
            let courseId;
            if (typeof course.id === 'string') {
                courseId = course.id;
            }
            else if (typeof course.id === 'number') {
                courseId = course.id.toString();
            }
            else {
                courseId = `course-${Date.now()}`;
            }
            const courseData = {
                id: courseId,
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                instructor: course.instructor,
                duration: course.duration,
                level: course.level,
                price: course.price,
                certificate: course.certificate,
                difficulty: course.level || 'Beginner',
            };
            yield CourseService.enrollCourse(courseId, user.uid, courseData);
            const updatedData = yield UserService.getUserData(user.uid);
            setUserData(updatedData);
            toast.success('Successfully enrolled in the course! 🎉');
        }
        catch (error) {
            console.error('Error enrolling in course:', error);
            toast.error(error.message || 'An error occurred while enrolling in the course');
        }
    });
    const isEnrolled = (course) => {
        if (!(userData === null || userData === void 0 ? void 0 : userData.registeredCourses) || course.id === undefined)
            return false;
        const courseId = typeof course.id === 'string' ? course.id : course.id.toString();
        return userData.registeredCourses.some((c) => String(c.id) === courseId || String(c.courseId) === courseId);
    };
    useEffect(() => {
        loadSharedNotesFromFirebase();
        loadFirebaseCourses();
        loadFirebaseExercise();
    }, []);
    const formatNumber = (num) => {
        if (num === undefined || num === null)
            return '0';
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return '#28a745';
            case 'intermediate': return '#ffc107';
            case 'advanced': return '#dc3545';
            default: return '#6c757d';
        }
    };
    const getCurrentSectionWithFirebaseNotes = () => {
        if (!currentSection)
            return null;
        const allCourses = [
            ...currentSection.courses.map((course) => (Object.assign(Object.assign({}, course), { courseLinks: course.courseLinks || [] }))),
            ...firebaseCourses.map((course) => {
                console.log('🔥 Adding Firebase course to mix:', course.title);
                return Object.assign(Object.assign({}, course), { courseLinks: course.courseLinks || [] });
            })
        ];
        console.log('🔥 All courses combined:', allCourses.length);
        console.log('🔥 Firebase courses in mix:', firebaseCourses.length);
        const localExercises = Array.isArray(currentSection.exercises) ? currentSection.exercises : [];
        const firebaseExercisesForSection = (firebaseExercises || []).filter((ex) => String(ex.sectionId) === String(activeSection) ||
            String(ex.course) === String(activeSection) ||
            String(ex.teacherId) === String(activeSection));
        const normalize = (ex) => {
            var _a, _b;
            return ({
                id: ex.id,
                title: ex.title || 'Untitled Exercise',
                type: ex.type || 'General',
                difficulty: ex.difficulty || 'Easy',
                duration: ex.duration || 'Unknown',
                points: (_a = ex.points) !== null && _a !== void 0 ? _a : 0,
                completed: !!ex.completed,
                questions: ex.questions || [],
                progress: (_b = ex.progress) !== null && _b !== void 0 ? _b : 0,
                teacherId: ex.teacherId,
                teacherName: ex.teacherName,
                createdAt: ex.createdAt,
                rating: ex.rating,
                reviews: ex.reviews,
                studentsCount: ex.studentsCount,
            });
        };
        const normalizedFirebaseExercises = firebaseExercisesForSection.map(normalize);
        // dedupe by id (string/number)
        const existingIds = new Set(localExercises.map((e) => String(e.id)));
        const mergedExercises = [
            ...localExercises,
            ...normalizedFirebaseExercises.filter((e) => !existingIds.has(String(e.id)))
        ];
        return Object.assign(Object.assign({}, currentSection), { sharedNotes: sharedNotes.filter(note => note.course === activeSection || note.course === 'General'), courses: allCourses, exercises: mergedExercises });
    };
    const updatedCurrentSection = getCurrentSectionWithFirebaseNotes();
    const firebaseForSection = (firebaseCourses || []).filter((course) => {
        const courseCategory = String(course.category || course.section || course.sectionId || '').toLowerCase().trim();
        const activeKey = String(activeSection || '').toLowerCase().trim();
        return courseCategory && courseCategory === activeKey;
    });
    const courses = [
        ...currentCourseSection.courses.map((course) => (Object.assign(Object.assign({}, course), { courseLinks: course.courseLinks || [] }))),
        ...firebaseForSection.map((course) => (Object.assign(Object.assign({}, course), { courseLinks: course.courseLinks || [] })))
    ];
    /////////////////////////////////////////
    //////////////////////////////////////
    //COURSES Edit
    /////////////////////////////////////
    /////////////////////////////////////
    const handleEditClick = (courseId) => {
        if (!user)
            return;
        navigate(`/edit-course?id=${courseId}`);
    };
    /////////////////////////////////////////
    //////////////////////////////////////
    //COURSES Exercise
    /////////////////////////////////////
    //////////////////////////////////////
    useEffect(() => {
        const fetchAllExerciseData = () => __awaiter(this, void 0, void 0, function* () {
            setLoadingExercises(true);
            try {
                setCurrentSection(userData.currentSection);
                const firebaseData = yield ExercisesService.getAllExercises();
                // تحويل البيانات من Firebase إلى Exercise[]
                const exercisesData = (firebaseData || []).map((ex) => (Object.assign({ id: ex.id || Date.now(), title: ex.title || 'Exercise', type: ex.type || 'quiz', difficulty: ex.difficulty || 'medium', duration: ex.duration || '10 min', points: ex.points || 10 }, ex)));
                setFirebaseExercises(exercisesData);
            }
            catch (error) {
                console.error("Error loading exercises:", error);
            }
            finally {
                setLoadingExercises(false);
            }
        });
        if (activeTab === "exercises") {
            fetchAllExerciseData();
        }
    }, [activeTab]);
    // Rerun when activeTab changes
    useEffect(() => {
        console.log("🔥 All exercises loaded:", exercises.length);
    }, [exercises]);
    // ✅ Simple expand toggle for a modern clean UI interaction
    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };
    const getLevelColor = (level) => {
        switch (level.trim().toLowerCase()) {
            case 'beginner':
            case 'beginners':
            case 'beginners ':
            case 'beginner to advanced':
                return '#28a745';
            case 'intermediate':
                return '#ffc107';
            case 'advanced':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };
    const handleExerciseClick = (exercise) => {
        const fullExercise = Object.assign(Object.assign({}, exercise), { questions: exercise.questions || [] });
        setSelectedExercise(fullExercise);
        setViewModeE('exercise');
        setCurrentExercise(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleBackToExercises = () => {
        setViewModeE('exercises');
        setSelectedExercise(null);
        setCurrentExercise(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const handleBackToExercise = () => {
        setViewModeE('exercise');
        setCurrentExercise(null);
        setQuizOpen(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const openQuiz = () => {
        setQuizOpen(true);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        setQuizResults(null);
    };
    const submitQuiz = () => {
        if (!currentExercise || !currentExercise.questions)
            return;
        let correct = 0;
        currentExercise.questions.forEach((q, i) => {
            var _a;
            // support different possible question shapes (correctAnswer or correct)
            const correctAns = (_a = q.correctAnswer) !== null && _a !== void 0 ? _a : q.correct;
            if (quizAnswers[i] === correctAns)
                correct++;
        });
        setQuizSubmitted(true);
        setQuizResults({ correct, total: currentExercise.questions.length });
        if (currentExercise.questions.length > 0 && correct / currentExercise.questions.length >= 0.7) {
            markExerciseComplete(currentExercise.id);
        }
    };
    const markExerciseComplete = (exerciseId) => {
        if (!selectedExercise)
            return;
        // Safely mark the exercise as completed without assuming questions exist
        setSelectedExercise(Object.assign(Object.assign({}, selectedExercise), { completed: true, progress: 100 }));
        if (currentExercise && currentExercise.id === exerciseId) {
            setCurrentExercise(Object.assign(Object.assign({}, currentExercise), { completed: true }));
        }
    };
    const addExerciseToSection = (exercisePartial, sectionId = activeSection) => {
        var _a;
        const newExercise = {
            id: Date.now(), // simple unique id for local usage
            title: exercisePartial.title || 'Untitled Exercise',
            type: exercisePartial.type || 'MCQ',
            difficulty: exercisePartial.difficulty || 'Beginner',
            duration: exercisePartial.duration || 'Unknown',
            points: (_a = exercisePartial.points) !== null && _a !== void 0 ? _a : 0,
            completed: false,
            questions: exercisePartial.questions || [],
            progress: 0,
        };
        const secIndex = SECTIONS.findIndex(s => s.id === sectionId);
        if (secIndex >= 0) {
            // ensure we merge with a consistent typed array to avoid union types where 'completed' becomes optional
            const existingExercises = (SECTIONS[secIndex].exercises || []);
            SECTIONS[secIndex].exercises = [newExercise, ...existingExercises];
            // force a small rerender by toggling a loading state (safe hack)
            setLoadingExercises(prev => !prev);
            // expand the newly added exercise so it shows in expanded mode immediately
            setTimeout(() => setExpandedId(newExercise.id), 80);
        }
        else {
            console.warn('addExerciseToSection: section not found for id', sectionId);
        }
    };
    useEffect(() => {
        if (!firebaseExercises || firebaseExercises.length === 0)
            return;
        // Merge Firebase exercises into SECTIONS while preserving firebase string ids
        firebaseExercises.forEach((ex) => {
            var _a, _b, _c;
            // determine the section this exercise belongs to (try multiple possible fields)
            const sectionKey = String((_c = (_b = (_a = ex.sectionId) !== null && _a !== void 0 ? _a : ex.course) !== null && _b !== void 0 ? _b : ex.teacherId) !== null && _c !== void 0 ? _c : activeSection);
            const secIndex = SECTIONS.findIndex((s) => String(s.id) === sectionKey);
            if (secIndex < 0)
                return;
            const existing = SECTIONS[secIndex].exercises || [];
            // avoid duplicates by id (compare as strings to handle Firestore string ids)
            if (existing.some((e) => String(e.id) === String(ex.id)))
                return;
            // normalize questions shape for consistent UI usage
            const normalizeQuestions = (qs = []) => (qs || []).map((q) => {
                var _a, _b, _c, _d, _e, _f, _g;
                return ({
                    question: (_c = (_b = (_a = q === null || q === void 0 ? void 0 : q.question) !== null && _a !== void 0 ? _a : q === null || q === void 0 ? void 0 : q.prompt) !== null && _b !== void 0 ? _b : q === null || q === void 0 ? void 0 : q.text) !== null && _c !== void 0 ? _c : '',
                    options: Array.isArray(q === null || q === void 0 ? void 0 : q.options)
                        ? q.options
                        : Array.isArray(q === null || q === void 0 ? void 0 : q.choices)
                            ? q.choices
                            : [],
                    correctAnswer: String((_g = (_f = (_e = (_d = q === null || q === void 0 ? void 0 : q.correctAnswer) !== null && _d !== void 0 ? _d : q === null || q === void 0 ? void 0 : q.correct) !== null && _e !== void 0 ? _e : q === null || q === void 0 ? void 0 : q.answer) !== null && _f !== void 0 ? _f : q === null || q === void 0 ? void 0 : q.solution) !== null && _g !== void 0 ? _g : '').trim(),
                });
            });
        });
        setLoadingExercises((p) => !p);
        setTimeout(() => {
            const first = firebaseExercises[0];
            if (first)
                setExpandedId(first.id);
        }, 80);
    }, [firebaseExercises, activeSection]);
    useEffect(() => {
        const secIndex = SECTIONS.findIndex(s => s.id === activeSection);
        if (secIndex >= 0 && firebaseExercises && firebaseExercises.length > 0) {
            const existing = SECTIONS[secIndex].exercises || [];
            const exercisesForSection = firebaseExercises.filter((ex) => String(ex.sectionId) === String(activeSection) ||
                String(ex.course) === String(activeSection) ||
                String(ex.teacherId) === String(activeSection));
            const toAdd = exercisesForSection.filter((fe) => !existing.some((e) => String(e.id) === String(fe.id)));
            if (toAdd.length > 0) {
                const normalizeExercise = (ex) => {
                    var _a, _b;
                    return ({
                        id: typeof ex.id === 'number' ? ex.id : parseInt(String(ex.id)) || Date.now(),
                        title: ex.title || 'Untitled Exercise',
                        type: ex.type || 'MCQ',
                        difficulty: ex.difficulty || 'Easy',
                        duration: ex.duration || 'Unknown',
                        points: (_a = ex.points) !== null && _a !== void 0 ? _a : 0,
                        completed: !!ex.completed,
                        questions: ex.questions || [],
                        // preserve optional fields if present
                        progress: (_b = ex.progress) !== null && _b !== void 0 ? _b : 0,
                        teacherId: ex.teacherId,
                        teacherName: ex.teacherName,
                        createdAt: ex.createdAt,
                        rating: ex.rating,
                        reviews: ex.reviews,
                        studentsCount: ex.studentsCount,
                    });
                };
                const normalizedToAdd = toAdd.map(normalizeExercise);
                const normalizedExisting = existing.map((e) => normalizeExercise(e));
                const ensureShape = (ex) => {
                    var _a;
                    return ({
                        id: Number(ex.id) || Date.now(),
                        title: ex.title || 'Untitled Exercise',
                        type: ex.type || 'General',
                        difficulty: ex.difficulty || 'Easy',
                        duration: ex.duration || 'Unknown',
                        points: (_a = ex.points) !== null && _a !== void 0 ? _a : 0,
                        completed: !!ex.completed,
                        questions: (ex.questions || []).map((q) => {
                            var _a, _b, _c;
                            return ({
                                question: q.question || q.prompt || '',
                                options: q.options || q.choices || [],
                                correctAnswer: ((_c = (_b = (_a = q.correctAnswer) !== null && _a !== void 0 ? _a : q.correct) !== null && _b !== void 0 ? _b : q.answer) !== null && _c !== void 0 ? _c : '').toString(),
                            });
                        }),
                    });
                };
                const shapedToAdd = normalizedToAdd.map(ensureShape);
                const shapedExisting = normalizedExisting.map(ensureShape);
                SECTIONS[secIndex].exercises = [...shapedToAdd, ...shapedExisting];
                setLoadingExercises(prev => !prev);
                setTimeout(() => setExpandedId((shapedToAdd[0] && shapedToAdd[0].id) || Date.now()), 80);
            }
        }
    }, [activeSection, firebaseExercises]);
    const createAndShowExercise = (exerciseData, targetSectionId) => {
        addExerciseToSection(exerciseData, targetSectionId || activeSection);
    };
    const getExercisesForCourse = (course) => {
        const allExercises = [
            // section-local exercises
            ...SECTIONS.flatMap(s => s.exercises || []),
            // firebase-loaded exercises
            ...firebaseExercises,
        ];
        // match by common fields (adjust if your exercises store course/section differently)
        return allExercises.filter((ex) => String(ex.course) === String(course.id) ||
            String(ex.teacherId) === String(course.id) ||
            String(ex.sectionId) === String(activeSection) ||
            // fallback: match by title/section heuristics
            (ex.title && String(course.title || '').toLowerCase().includes(String(ex.title || '').toLowerCase())));
    };
    const loadFirebaseExercise = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoadingExercises(true);
            console.log('🔥 Starting to load Firebase exercise...');
            const exercises = yield ExercisesService.getAllExercises();
            console.log('🔥 Raw exercise from Firebase:', exercises);
            if (!exercises || exercises.length === 0) {
                console.log('🔥 No exercise found in Firebase');
                setFirebaseExercises([]);
                return;
            }
            const formattedExercises = exercises.map((exercise, index) => {
                console.log(`🔥 Processing exercise ${index + 1}:`, exercise.title);
                return {
                    id: exercise.id, // Firestore IDs are strings, use directly
                    title: exercise.title || 'Untitled Exercise',
                    type: exercise.type || 'MCQ',
                    difficulty: exercise.difficulty || 'Easy',
                    duration: exercise.duration || 'Unknown', // Keeping as string from previous context
                    points: exercise.points || 0,
                    completed: exercise.completed || false,
                    questions: exercise.questions || [],
                    teacherId: exercise.teacherId || 'unknown',
                    teacherName: exercise.teacherName || 'Unknown Teacher',
                    createdAt: exercise.createdAt, // Assuming it's a Firestore Timestamp or Date
                    rating: exercise.rating || 0,
                    reviews: exercise.reviews || 0,
                    studentsCount: exercise.studentsCount || 0,
                    progress: exercise.progress || 0,
                };
            });
            setFirebaseExercises(formattedExercises);
            console.log('🔥 Firebase Exercise loaded successfully:', formattedExercises);
            console.log('🔥 Number of Firebase Exercise:', formattedExercises.length);
        }
        catch (error) {
            console.error('🔥 Error loading courses from Firebase:', error);
            setFirebaseExercises([]);
        }
        finally {
            setLoadingExercises(false);
        }
    });
    /////////////////////////////////////////
    //////////////////////////////////////////////
    //SHARED NOTES
    ////////////////////////////////////////////////
    /////////////////////////////////////////////////
    const [selectedFile, setSelectedFile] = useState(null);
    const [notes, setNotes] = useState([]);
    const handleUpload = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        setSelectedFile(file);
        setFormData(prev => (Object.assign(Object.assign({}, prev), { attachedFile: file })));
        const localUrl = URL.createObjectURL(file);
        setFileURL(localUrl);
        const previewNote = {
            id: `local-${Date.now()}`,
            title: file.name,
            author: (userData === null || userData === void 0 ? void 0 : userData.displayName) || ((_b = user === null || user === void 0 ? void 0 : user.email) === null || _b === void 0 ? void 0 : _b.split('@')[0]) || 'You',
            uploadDate: new Date().toISOString().split('T')[0],
            profilePic: (userData === null || userData === void 0 ? void 0 : userData.photoURL) || (user === null || user === void 0 ? void 0 : user.photoURL) || '',
            course: activeSection || 'General',
            downloads: 0,
            views: 0,
            fileType: file.type || 'file',
            size: file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'Unknown',
            preview: `Attached file: ${file.name}`,
            rating: 0,
            tags: [activeSection || 'General'],
            comments: 0,
            fileUrl: localUrl, // local blob url so it can be downloaded immediately
            userId: (user === null || user === void 0 ? void 0 : user.uid) || 'local',
            description: formData.message || ''
        };
        setSharedNotes(prev => [previewNote, ...prev]);
    });
    const handleDownload = (note) => {
        const downloadUrl = (note && note.fileUrl) || fileURL;
        if (!downloadUrl) {
            alert('No file available to download.');
            return;
        }
        const a = document.createElement('a');
        a.href = downloadUrl;
        const sanitize = (s) => s.replace(/[:\\/<>?"|*]/g, '_').trim() || 'download';
        const getExtFromUrl = (url) => {
            if (!url)
                return '';
            try {
                const pathname = new URL(url, window.location.href).pathname;
                const m = pathname.match(/\.([a-z0-9]+)$/i);
                return m ? `.${m[1]}` : '';
            }
            catch (_a) {
                const m = String(url).split('?')[0].match(/\.([a-z0-9]+)$/i);
                return m ? `.${m[1]}` : '';
            }
        };
        const rawName = note.title || (selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'download');
        const extFromUrl = getExtFromUrl(downloadUrl);
        const extFromFile = selectedFile && selectedFile.name.match(/\.[^/.]+$/) ? selectedFile.name.match(/\.[^/.]+$/)[0] : '';
        const ext = extFromUrl || extFromFile || '';
        const coursePart = note.course || activeSection || '';
        const filename = `${sanitize(rawName)}${coursePart ? ' - ' + sanitize(String(coursePart)) : ''}${ext}`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // update local downloads count so UI reflects the action
        setSharedNotes(prev => prev.map(n => (n.id === note.id ? Object.assign(Object.assign({}, n), { downloads: (n.downloads || 0) + 1 }) : n)));
    };
    const loadSharedNotesFromFirebase = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const notesCollection = collection(db, 'sharedNotes');
            const notesSnapshot = yield getDocs(notesCollection);
            const notesList = [];
            notesSnapshot.forEach((doc) => {
                const data = doc.data();
                notesList.push({
                    id: doc.id,
                    title: data.title || 'Untitled',
                    author: data.author || 'Anonymous',
                    uploadDate: data.uploadDate || new Date().toISOString().split('T')[0],
                    profilePic: data.profilePic || 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg',
                    course: data.course || 'General',
                    downloads: data.downloads || 0,
                    views: data.views || 0,
                    fileType: data.fileType || 'TEXT',
                    size: data.size || 'Text only',
                    preview: data.preview || data.description || 'No preview available',
                    rating: data.rating || 0,
                    tags: data.tags || ['General'],
                    comments: data.comments || 0,
                    fileUrl: '',
                    userId: data.userId || '',
                    description: data.description || ''
                });
            });
            setSharedNotes(notesList);
        }
        catch (error) {
            console.error('Error loading notes from Firebase:', error);
        }
    });
    const saveSharedNoteToFirebase = (noteData) => __awaiter(this, void 0, void 0, function* () {
        try {
            const notesCollection = collection(db, 'sharedNotes');
            const newNoteData = Object.assign(Object.assign({}, noteData), { fileUrl: '', uploadDate: new Date().toISOString().split('T')[0], userId: (user === null || user === void 0 ? void 0 : user.uid) || 'anonymous', timestamp: new Date() });
            const docRef = yield addDoc(notesCollection, newNoteData);
            console.log('Note saved successfully with ID:', docRef.id);
            yield loadSharedNotesFromFirebase();
            return docRef.id;
        }
        catch (error) {
            console.error('Error saving note:', error);
            throw error;
        }
    });
    const handleButtonClick = () => {
        setShowForm(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => (Object.assign(Object.assign({}, prevData), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const newNote = {
                id: '',
                title: formData.title || 'Untitled Note',
                author: formData.name || (user === null || user === void 0 ? void 0 : user.displayName) || 'Anonymous',
                uploadDate: new Date().toISOString().split('T')[0],
                profilePic: (userData === null || userData === void 0 ? void 0 : userData.photoURL) || 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg',
                course: activeSection,
                downloads: 0,
                views: 0,
                fileType: 'TEXT',
                size: 'Text only',
                preview: formData.message.substring(0, 150) + '...',
                rating: 0,
                tags: [activeSection, 'Student Notes'],
                comments: 0,
                fileUrl: '',
                userId: (user === null || user === void 0 ? void 0 : user.uid) || 'anonymous',
                description: formData.message
            };
            yield saveSharedNoteToFirebase(newNote);
            setShowForm(false);
            setFormData({ name: '', email: '', title: '', category: [], message: '', attachedFile: null });
            setFile(null);
            alert('Note shared successfully!');
        }
        catch (error) {
            console.error('Error submitting form:', error);
            alert('Error sharing note. Please try again.');
        }
    });
    ///////////////////////////////////////////
    /////////////////////////////////////////// 
    // Course Overview Component
    //////////////////////////////////////////
    //////////////////////////////////////////
    const CourseOverview = ({ course }) => (_jsxs("div", { className: "crsOv_1", children: [_jsxs("nav", { className: "crsOv_2", children: [_jsxs("div", { className: "crsOv_3", children: [_jsx("button", { onClick: handleBackToCatalog, className: "crsOv_4", children: _jsx(ChevronLeft, { size: 24 }) }), _jsx("div", { className: "crsOv_5", children: "EDU" })] }), _jsxs("div", { className: "crsOv_6", children: [_jsx(BookOpen, { size: 20 }), " Course Overview"] })] }), _jsx("div", { className: "crsOv_10", children: _jsxs("div", { className: "crsOv_11", children: [_jsxs("div", { children: [_jsx("h1", { className: "crsOv_13", children: course.title }), _jsx("p", { className: "crsOv_14", children: course.description }), _jsxs("div", { className: "crsOv_15", children: [_jsxs("div", { className: "crsOv_16", children: [_jsx(Star, { fill: "gold", color: "gold", size: 20 }), _jsx("span", { className: "crsOv_17", children: course.rating }), _jsxs("span", { children: ["(", formatNumber(course.students), " students)"] })] }), _jsxs("div", { className: "crsOv_18", children: [_jsx(Clock, { size: 20 }), _jsx("span", { children: course.duration })] }), _jsxs("div", { className: "crsOv_19", children: [_jsx(User, { size: 20 }), _jsx("span", { children: course.instructor })] }), _jsxs("div", { className: "crsOv_20", children: [_jsx(Globe, { size: 20 }), _jsx("span", { children: course.level })] })] }), _jsx("button", { className: "crsOv_21", onClick: () => 
                                    // start the first lesson if available; guard against missing lessons
                                    course.lessons && course.lessons.length > 0 ? handleLessonClick(course.lessons[0]) : null, children: "Start Learning Now" })] }), _jsx("div", { children: _jsx("img", { src: course.thumbnail, alt: course.title, className: "crsOv_22" }) })] }) }), _jsxs("div", { className: "crsSec_1", children: [_jsxs("div", { children: [_jsxs("div", { className: "crsSec_2", children: [_jsx("h2", { className: "crsSec_3", children: "Course Overview" }), _jsx("p", { className: "crsSec_4", children: course.overview })] }), _jsxs("div", { className: "crsSec_5", children: [_jsx("h2", { className: "crsSec_6", children: "What You'll Learn" }), _jsx("div", { className: "crsSec_7", children: course.whatYouLearn.map((item, index) => (_jsxs("div", { className: "crsSec_8", children: [_jsx(CheckCircle, { size: 20, color: "#28a745" }), _jsx("span", { className: "crsSec_9", children: item })] }, index))) })] }), course.courseLinks && course.courseLinks.length > 0 && (_jsxs("div", { className: "crsSec_5", children: [_jsx("h2", { className: "crsSec_6", children: "Course Resources" }), _jsx("div", { className: "crsSec_7", children: course.courseLinks.map((link, index) => (_jsxs("div", { className: "crsSec_8", style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px',
                                                background: '#f8fafc',
                                                borderRadius: '8px',
                                                border: '1px solid #e2e8f0'
                                            }, children: [link.type === 'video' && _jsx(Video, { size: 20, color: "#3a25ff" }), link.type === 'document' && _jsx(File, { size: 20, color: "#3a25ff" }), link.type === 'image' && _jsx(Image, { size: 20, color: "#3a25ff" }), link.type === 'other' && _jsx(LucideLink, { size: 20, color: "#3a25ff" }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { fontWeight: '600', color: '#2d3748' }, children: link.title }), _jsx("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", style: {
                                                                color: '#3a25ff',
                                                                textDecoration: 'none',
                                                                fontSize: '14px'
                                                            }, onMouseEnter: (e) => e.currentTarget.style.textDecoration = 'underline', onMouseLeave: (e) => e.currentTarget.style.textDecoration = 'none', children: link.url })] })] }, index))) })] })), course.progress !== undefined && (_jsxs("div", { className: "crsPrg_1", children: [_jsx("h2", { className: "crsPrg_2", children: "Your Progress" }), _jsxs("div", { className: "crsPrg_3", children: [_jsxs("div", { className: "crsPrg_4", children: [_jsxs("span", { children: ["Progress: ", course.progress, "%"] }), _jsxs("span", { children: [course.lessons.filter(l => l.completed).length, "/", course.lessons.length, " lessons"] })] }), _jsx("div", { className: "crsPrg_5", children: _jsx("div", { className: "crsPrg_6", style: { width: `${course.progress}%` } }) })] }), course.progress === 100 && course.certificate && (_jsxs("div", { className: "crsPrg_7", children: [_jsx(Award, { size: 24, color: "#28a745" }), _jsx("span", { className: "crsPrg_8", children: "\uD83C\uDF89 Congratulations! You've earned a certificate." })] }))] })), _jsxs("div", { className: "unique-course-section", children: [_jsxs("h2", { className: "unique-course-title", children: ["Course Curriculum (", course.lessons.length, " lessons)"] }), _jsx("div", { className: "unique-lessons-container", children: course.lessons.map((lesson, index) => (_jsx("div", { className: `unique-lesson-card ${lesson.completed ? 'unique-lesson-completed' : ''}`, onClick: () => handleLessonClick(lesson), children: _jsxs("div", { className: "unique-lesson-top", children: [_jsxs("div", { className: "unique-lesson-info", children: [_jsx("div", { className: `unique-lesson-index ${lesson.completed ? 'unique-lesson-index-done' : ''}`, children: lesson.completed ? _jsx(CheckCircle, { size: 20 }) : index + 1 }), _jsxs("div", { children: [_jsx("h3", { className: "unique-lesson-title", children: lesson.title }), _jsx("p", { className: "unique-lesson-desc", children: lesson.description })] })] }), _jsxs("div", { className: "unique-lesson-meta", children: [_jsxs("div", { className: "unique-lesson-duration", children: [_jsx(FileVideo, { size: 16 }), _jsx("span", { children: lesson.duration })] }), _jsx(PlayCircle, { size: 24, color: "#3a25ff" })] })] }) }, lesson.id))) })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "unique-pricing-card", children: [_jsxs("div", { className: "unique-pricing-top", children: [_jsx("span", { className: "unique-price", children: course.price }), course.originalPrice && (_jsx("span", { className: "unique-original-price", children: course.originalPrice }))] }), _jsx(Toaster, { position: "top-right" }), _jsx("button", { className: "unique-enroll-btn", value: (userData === null || userData === void 0 ? void 0 : userData.coursesEnrolled) || 0, onClick: () => handleEnroll(course), disabled: isEnrolled(course), style: {
                                            opacity: isEnrolled(course) ? 0.6 : 1,
                                            cursor: isEnrolled(course) ? 'not-allowed' : 'pointer'
                                        }, children: isEnrolled(course) ? 'Already Enrolled' : 'Enroll Now' }), _jsx("button", { onClick: handleShare, className: "unique-share-btn", children: "Share Course" }), shareModal && (_jsx("div", { className: "unique-share-modal", children: "Link copied to clipboard!" })), _jsxs("div", { className: "unique-course-details", children: [_jsxs("div", { children: [_jsx("span", { children: "Duration:" }), _jsx("span", { children: course.duration })] }), _jsxs("div", { children: [_jsx("span", { children: "Lessons:" }), _jsx("span", { children: course.lessons.length })] }), _jsxs("div", { children: [_jsx("span", { children: "Level:" }), _jsx("span", { children: course.level })] }), _jsxs("div", { children: [_jsx("span", { children: "Certificate:" }), _jsx("span", { className: course.certificate ? 'yes' : 'no', children: course.certificate ? 'Yes' : 'No' })] })] })] }), _jsxs("div", { className: "unique-req-section", children: [_jsx("h3", { className: "unique-req-title", children: "Requirements" }), _jsx("div", { className: "unique-req-list", children: course.requirements.map((req, index) => (_jsxs("div", { className: "unique-req-item", children: [_jsx("div", { className: "unique-req-dot" }), _jsx("span", { className: "unique-req-text", children: req })] }, index))) })] })] })] }), showCertificate && (_jsx("div", { className: "unique-cert-overlay", children: _jsxs("div", { className: "unique-cert-modal", children: [_jsx(Award, { size: 64, color: "#28a745", style: { marginBottom: '1rem' } }), _jsx("h2", { className: "unique-cert-title", children: "\uD83C\uDF89 Certificate of Completion" }), _jsxs("p", { className: "unique-cert-text", children: ["Congratulations! You have successfully completed \"", course.title, "\"."] }), _jsx("button", { onClick: () => setShowCertificate(false), className: "unique-cert-btn", children: "Download Certificate" })] }) }))] }));
    const LessonView = ({ lesson, course }) => (_jsxs("div", { className: "lessonview-unique-wrapper", children: [_jsxs("nav", { className: "lessonview-unique-nav", children: [_jsxs("div", { className: "lessonview-unique-nav-left", children: [_jsx("button", { onClick: handleBackToCourse, className: "lessonview-unique-back-btn", children: _jsx(ChevronLeft, { size: 24 }) }), _jsxs("div", { className: "lessonview-unique-titlebox", children: [_jsx("span", { className: "lessonview-unique-course-title", children: course.title }), _jsx("span", { className: "lessonview-unique-lesson-title", children: lesson.title })] })] }), _jsx("div", { className: "lessonview-unique-nav-right", children: _jsxs("button", { onClick: () => markLessonComplete(lesson.id), className: `lessonview-unique-complete-btn ${lesson.completed ? 'lessonview-unique-complete-btn--done' : ''}`, children: [lesson.completed ? _jsx(CheckCircle, { size: 16 }) : _jsx(PlayCircle, { size: 16 }), lesson.completed ? 'Completed' : 'Mark Complete'] }) })] }), _jsx("div", { className: "lessonview-unique-video-wrapper", children: _jsx("iframe", { src: lesson.videoUrl, title: lesson.title, frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }), _jsx("div", { className: "lessonSection-x12A3", children: _jsxs("div", { className: "lessonGrid-y8B9f", children: [_jsx("div", { children: _jsxs("div", { className: "lessonCard-z4P7d", children: [_jsx("h2", { className: "lessonTitle-c3R2k", children: lesson.title }), _jsx("p", { className: "lessonDescription-b6L1m", children: lesson.description }), _jsxs("div", { className: "lessonInfoBox-p2K9x", children: [_jsxs("div", { className: "lessonInfoItem-h4N7j", children: [_jsx(Clock, { size: 20, color: "#666" }), _jsxs("span", { children: ["Duration: ", lesson.duration] })] }), _jsxs("div", { className: "lessonInfoItem-h4N7j", children: [_jsx(User, { size: 20, color: "#666" }), _jsxs("span", { children: ["Instructor: ", course.instructor] })] })] }), lesson.quiz && !quizOpen && (_jsxs("div", { className: "quizNotice-x9D3f", children: [_jsx("h3", { className: "quizNoticeTitle-k7L1p", children: "Quiz Available" }), _jsx("p", { className: "quizNoticeText-b4R2v", children: "Test your knowledge after watching this lesson." }), _jsx("button", { onClick: openQuiz, className: "quizStartBtn-j2N8m", children: "Start Quiz" })] })), quizOpen && lesson.quiz && (_jsxs("div", { className: "quizContainer-h3L7b", children: [_jsxs("h3", { className: "quizHeaderTitle-d2K5n", children: ["Quiz: ", lesson.title] }), lesson.quiz.questions.map((q, i) => (_jsxs("div", { className: "quizQuestionBlock-a8F1k", children: [_jsxs("p", { className: "quizQuestionText-r7G3s", children: [i + 1, ". ", q.question] }), q.options.map((opt, idx) => (_jsxs("label", { className: `quizOptionLabel-y4N2t ${quizAnswers[i] === idx ? 'selectedOpt-c9Q8b' : ''}`, children: [_jsx("input", { type: "radio", name: `q${i}`, value: idx, checked: quizAnswers[i] === idx, onChange: () => {
                                                                    const newAnswers = [...quizAnswers];
                                                                    newAnswers[i] = idx;
                                                                    setQuizAnswers(newAnswers);
                                                                }, className: "quizRadioInput-t5C6j" }), opt] }, idx)))] }, i))), _jsx("button", { onClick: submitQuiz, disabled: quizSubmitted, className: "quizSubmitBtn-z3L4m", children: quizSubmitted ? 'Submitted' : 'Submit Quiz' }), quizSubmitted && quizResults && (_jsxs("div", { className: `quizResultBox-p2V9n ${quizResults.correct / quizResults.total >= 0.7 ? 'quizSuccess-b6L8w' : 'quizFail-x1R2d'}`, children: [_jsx("strong", { children: "Result:" }), " ", quizResults.correct, "/", quizResults.total, " correct.", quizResults.correct / quizResults.total >= 0.7 ? (_jsx("span", { children: " \uD83C\uDF89 Lesson marked as completed!" })) : (_jsx("span", { children: " \u274C Please review the lesson and try again." }))] }))] }))] }) }), _jsx("div", { children: _jsxs("div", { className: "lessonListContainer-c7L9x", children: [_jsx("h3", { className: "lessonListTitle-x2B5n", children: "Course Lessons" }), _jsx("div", { className: "lessonListWrapper-t8R4m", children: course.lessons.map((courseLesson, index) => (_jsx("div", { className: `lessonListItem-p3K6v ${courseLesson.id === lesson.id
                                                ? 'activeLesson-b2Y8r'
                                                : courseLesson.completed
                                                    ? 'completedLesson-v1D4n'
                                                    : 'defaultLesson-m9F5t'}`, onClick: () => handleLessonClick(courseLesson), children: _jsxs("div", { className: "lessonListItemHeader-y6T3p", children: [_jsxs("div", { className: "lessonListItemInfo-a9W2k", children: [_jsx("div", { className: `lessonListStatusCircle-n7C1f ${courseLesson.completed
                                                                    ? 'circleCompleted-h5B3x'
                                                                    : courseLesson.id === lesson.id
                                                                        ? 'circleActive-q4V6m'
                                                                        : 'circleDefault-e8K2t'}`, children: courseLesson.completed ? _jsx(CheckCircle, { size: 12 }) : index + 1 }), _jsxs("div", { children: [_jsx("div", { className: `lessonListTitleText-d3P9b ${courseLesson.id === lesson.id ? 'titleActive-j2Q7l' : 'titleDefault-s5L8r'}`, children: courseLesson.title }), _jsx("div", { className: "lessonListDuration-f4T6y", children: courseLesson.duration })] })] }), courseLesson.id === lesson.id && _jsx(PlayCircle, { size: 20, color: "#3a25ff" })] }) }, courseLesson.id))) })] }) })] }) })] }));
    if (viewMode === 'courses' && selectedCourse) {
        return _jsx(CourseOverview, { course: selectedCourse });
    }
    if (viewMode === 'lessons' && currentLesson && selectedCourse) {
        return _jsx(LessonView, { lesson: currentLesson, course: selectedCourse });
    }
    const Dashboard = () => {
        // 1. Initialize State for User Data
        const [user, setUser] = useState({ name: "Student" }); // Simulating a logged-in user
        const [userData, setUserData] = useState({
            coursesEnrolled: 5, // Initial value
            // ... other data
        });
        const [dropdownOpen, setDropdownOpen] = useState(false);
        // 2. Create the Handle Click Function
        const handleEnrollClick = () => {
            // Check if user is logged in
            if (!user) {
                alert('Please log in to enroll in this course.');
                return;
            }
            // A. Increment the count in State
            setUserData(prevData => (Object.assign(Object.assign({}, prevData), { coursesEnrolled: (prevData.coursesEnrolled || 0) + 1 })));
            toast.success("Successfully enrolled in the course!");
            setDropdownOpen(true);
        };
    };
    return (_jsxs("div", { className: "min-h-screen", style: {
            backgroundColor: '#f8f7f4',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#333'
        }, children: [_jsx("style", { children: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      ` }), _jsxs("nav", { className: "navbar-container2", children: [_jsx("div", { className: "navbar-logo2", children: _jsx(NavLink, { to: "/homepage", children: _jsx("img", { src: "src/assets/img/logo2.png", className: "logo2", alt: "Logo" }) }) }), _jsxs("ul", { className: "navbar-links2", children: [_jsx("li", { children: _jsxs(NavLink, { to: "/courses", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(BookOpen, { size: 20, className: "nav-icon2" }), " Course"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/jobs", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(Briefcase, { size: 20, className: "nav-icon2" }), " Jobs"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/ai", className: ({ isActive }) => `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`, children: [_jsx(MessageSquare, { size: 20, className: "nav-icon2" }), " Chatbot AI"] }) })] }), _jsxs("div", { className: "profile-container", children: [_jsx("button", { className: "profile-btn", onClick: () => setDropdownOpen(!dropdownOpen), children: (userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-img" })) : (_jsx(FaUser, { size: 24, color: "#fff" })) }), dropdownOpen && (_jsxs("div", { className: "profile-dropdown", children: [_jsxs("div", { className: "profile-header", children: [(userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-pic" })) : (_jsx(FaUser, { size: 40, color: "#ffffffff" })), _jsxs("h4", { children: ["Welcome, ", (userData === null || userData === void 0 ? void 0 : userData.displayName) || ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || 'User', "!"] })] }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(FaBriefcase, {}), " Applied Jobs: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] }), _jsxs("li", { children: [_jsx(FaBook, {}), " Courses Taken: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.coursesEnrolled) || 0 })] }), _jsxs("li", { children: [_jsx(FaBook, {}), " Courses Created: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.coursesCreated) || 0 })] }), _jsxs("li", { children: [_jsx(FaPencilAlt, {}), " Exercises Done: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.exercisesCompleted) || 0 })] }), _jsxs("li", { children: [_jsx(FaFileDownload, {}), " Notes Downloaded: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.downloads) || 0 })] }), _jsxs("li", { children: ["Shared Notes: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.sharedNotes) || 0 })] }), _jsxs("li", { children: [_jsx(FaFileDownload, {}), " CV Uploads: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.cvUploads) || (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] })] }), (userData === null || userData === void 0 ? void 0 : userData.registeredCourses) && userData.registeredCourses.length > 0 && (_jsxs("div", { style: {
                                            marginTop: '16px',
                                            paddingTop: '16px',
                                            borderTop: '1px solid rgba(255,255,255,0.1)'
                                        }, children: [_jsxs("h5", { style: {
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    color: '#fff',
                                                    marginBottom: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }, children: [_jsx(FaBook, {}), " My Courses (", userData.registeredCourses.length, ")"] }), _jsxs("div", { style: {
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px'
                                                }, children: [userData.registeredCourses.slice(0, 3).map((course, idx) => (_jsxs("div", { style: {
                                                            background: 'rgba(255,255,255,0.1)',
                                                            padding: '8px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '12px'
                                                        }, children: [_jsx("div", { style: {
                                                                    fontWeight: 600,
                                                                    color: '#fff',
                                                                    marginBottom: '4px',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis'
                                                                }, children: course.title || 'Untitled Course' }), _jsxs("div", { style: {
                                                                    fontSize: '11px',
                                                                    color: 'rgba(255,255,255,0.7)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px'
                                                                }, children: [_jsx(Clock, { size: 10 }), " ", course.duration || 'N/A', course.progress !== undefined && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { children: [course.progress || 0, "%"] })] }))] })] }, idx))), userData.registeredCourses.length > 3 && (_jsxs("div", { style: {
                                                            textAlign: 'center',
                                                            fontSize: '11px',
                                                            color: 'rgba(255,255,255,0.7)',
                                                            padding: '8px'
                                                        }, children: ["+", userData.registeredCourses.length - 3, " more courses"] }))] })] })), _jsxs("div", { className: "profile-actions", children: [_jsx(Link, { to: "/profile", className: "profile-link", children: "View Profile" }), _jsxs("button", { className: "logout-btn", onClick: () => auth.signOut(), children: [_jsx(FaSignOutAlt, {}), " Sign Out"] })] })] }))] }), _jsx("div", { className: "divider2" }), _jsx("div", { className: "navbar-actions", children: _jsx("button", { className: "signOut-button", children: _jsx(Link, { to: "/signin", children: "Sign Out" }) }) })] }), _jsxs("main", { style: {
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '90px', width: '100%', paddingLeft: '50px', minHeight: '70vh'
                }, children: [_jsxs("div", { style: { flex: 1, maxWidth: '500px', paddingRight: '150px' }, children: [_jsx("h1", { className: 'title-courses', children: "Discover Courses That Empower Your Next Chapter" }), _jsx("p", { className: 'para-courses', children: "New School is an Aggregator Multimedia education Materials from around the world." })] }), _jsxs("div", { className: "landing-right-panel", children: [_jsx("div", { className: "deco-circle circle-1" }), _jsx("div", { className: "deco-circle circle-2" }), _jsx("div", { className: "deco-circle circle-3" }), _jsx("div", { className: "deco-circle circle-4" }), _jsx("div", { className: "deco-circle circle-5" }), _jsx("div", { className: "deco-circle circle-6" }), _jsx("div", { className: "deco-circle circle-7" }), _jsxs("div", { className: "student-image-grid", children: [_jsx("div", { className: "student-card card-1", children: _jsx("img", { src: 'https://i.pinimg.com/736x/3e/58/8d/3e588df028341b0e3962727a7e9f196c.jpg', alt: "Student 1" }) }), _jsx("div", { className: "student-card card-2", children: _jsx("img", { src: 'https://i.pinimg.com/736x/e6/31/e0/e631e0915e5a6e48ab5fd5ccaa1ea241.jpg', alt: "Student 2" }) }), _jsx("div", { className: "student-card card-3", children: _jsx("img", { src: 'https://i.pinimg.com/736x/60/a1/71/60a1719d559469dbb6bfa1b6d0890e5e.jpg', alt: "Student 3" }) }), _jsx("div", { className: "student-card card-4", children: _jsx("img", { src: 'https://i.pinimg.com/736x/b7/e1/89/b7e1890a31f2565cadb80779c7386c2d.jpg', alt: "Student 4" }) })] })] })] }), _jsx("h2", { className: 'categories-title', children: "Our Categories" }), _jsx("p", { className: 'section-subtitle', children: "Explore our wide range of categories to meet all your needs." }), _jsx("nav", { style: {
                    display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap'
                }, children: SECTIONS.map((sec) => (_jsxs("button", { style: {
                        display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '50px', border: activeSection === sec.id ? '1px solid #3a25ff' : '1px solid #ddd', background: activeSection === sec.id ? 'linear-gradient(135deg, #3a25ff, #5a4bff)' : '#fff', color: activeSection === sec.id ? '#fff' : '#333', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', boxShadow: activeSection === sec.id ? '0 4px 15px rgba(58, 37, 255, 0.3)' : 'none'
                    }, onClick: () => setActiveSection(sec.id), children: [_jsx("span", { style: { fontSize: '1.1rem' }, children: React.isValidElement(sec.icon) ? sec.icon : null }), " ", sec.title] }, sec.id))) }), (userData === null || userData === void 0 ? void 0 : userData.role) === 'teacher' && (_jsx("div", { style: {
                    textAlign: 'center',
                    marginBottom: '24px',
                    padding: '0 50px'
                } })), (userData === null || userData === void 0 ? void 0 : userData.role) === 'teacher' && (_jsx("div", { style: {
                    textAlign: 'center',
                    marginBottom: '24px',
                    padding: '0 20px'
                } })), _jsx("div", { style: {
                    backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid #e8e9ea'
                }, children: updatedCurrentSection && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "tab-buttons", children: [_jsxs("button", { className: `tab-button ${activeTab === 'courses' ? 'active' : ''}`, onClick: () => setActiveTab('courses'), children: [_jsx(BookOpen, { size: 20 }), "Courses"] }), _jsxs("button", { className: `tab-button ${activeTab === 'exercises' ? 'active' : ''}`, onClick: () => setActiveTab('exercises'), children: [_jsx(Award, { size: 20 }), "Exercises"] }), _jsxs("button", { className: `tab-button ${activeTab === 'sharedNotes' ? 'active' : ''}`, onClick: () => setActiveTab('sharedNotes'), children: [_jsx(Users, { size: 20 }), "Shared Notes"] })] }), activeTab === 'courses' && (_jsxs("div", { style: { padding: '20px' }, children: [" ", _jsxs("button", { onClick: () => navigate('/add-course'), style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto', // Centers the button
                                        marginBottom: '30px', // ADDED: Space between the button and the grid below
                                        // LIGHT GREY BASE: Very soft, almost white-grey
                                        backgroundColor: '#f8f9fa',
                                        color: '#343a40',
                                        // Modern Shape and Shadow
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #dee2e6',
                                        padding: '12px 30px',
                                        borderRadius: '16px',
                                        fontSize: '17px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        // Smoother, professional transition
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        width: '240px',
                                        height: '60px',
                                        gap: '10px',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                    }, onMouseEnter: (e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                                        e.currentTarget.style.backgroundColor = '#e9ecef';
                                        // Keeping the hover glow from the previous trendy suggestion
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(58, 37, 255, 0.15)';
                                    }, onMouseLeave: (e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    }, children: [_jsx(Plus, { size: 20 }), "Add New Course"] }), _jsx("div", { className: "courseGrid-x8R1m", children: loadingCourses ? (_jsxs("div", { style: {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '40px',
                                            flexDirection: 'column',
                                            gap: '16px'
                                        }, children: [_jsx("div", { style: {
                                                    width: '40px',
                                                    height: '40px',
                                                    border: '4px solid #e2e8f0',
                                                    borderTop: '4px solid #3a25ff',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite'
                                                } }), _jsx("p", { style: { color: '#718096', fontSize: '16px' }, children: "Loading courses..." })] })) : updatedCurrentSection && updatedCurrentSection.courses.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '20px',
                                                    padding: '16px',
                                                    background: 'linear-gradient(135deg, #f8fafc, #edf2f7)',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e2e8f0'
                                                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx(BookOpen, { size: 24, color: "#3a25ff" }), _jsxs("h3", { style: { margin: 0, color: '#2d3748', fontSize: '18px' }, children: ["Available Courses (", updatedCurrentSection.courses.length, ")"] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', color: '#718096' }, children: [_jsx(Users, { size: 16 }), _jsxs("span", { children: [firebaseCourses.length, " from Firebase"] }), loadingCourses && (_jsxs("div", { style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px',
                                                                    color: '#3a25ff',
                                                                    fontSize: '12px'
                                                                }, children: [_jsx("div", { style: {
                                                                            width: '12px',
                                                                            height: '12px',
                                                                            border: '2px solid #3a25ff',
                                                                            borderTop: '2px solid transparent',
                                                                            borderRadius: '50%',
                                                                            animation: 'spin 1s linear infinite'
                                                                        } }), "Loading..."] })), !loadingCourses && firebaseCourses.length === 0 && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("span", { style: { color: '#e53e3e', fontSize: '12px' }, children: "No Firebase courses found" }), _jsx("button", { onClick: loadFirebaseCourses, style: {
                                                                            background: '#3a25ff',
                                                                            color: 'white',
                                                                            border: 'none',
                                                                            borderRadius: '6px',
                                                                            padding: '4px 8px',
                                                                            fontSize: '10px',
                                                                            cursor: 'pointer',
                                                                            fontWeight: '600'
                                                                        }, children: "\uD83D\uDD04 Reload" })] }))] })] }), updatedCurrentSection.courses.map((course) => (_jsxs("div", { className: "courseCard-k4L9b", onClick: () => handleCourseClick(course), children: [_jsxs("div", { className: "courseThumbnailContainer-b7C2v", children: [_jsx("img", { src: course.thumbnail, alt: course.title, className: "courseThumbnailImage-n6Q5t" }), _jsx("div", { className: "courseOverlay-f5T8n", children: _jsx("button", { title: "btn", className: "coursePlayBtn-d9K3y", children: _jsx(Play, { size: 24, fill: "#3a25ff", color: "#3a25ff" }) }) }), course.certificate && (_jsxs("div", { className: "courseCertificateBadge-h2P7w", children: [_jsx(Award, { size: 16 }), " Certificate"] }))] }), _jsxs("div", { className: "courseContent-v3M6q", children: [_jsxs("div", { className: "courseHeader-r9X2s", children: [_jsx("h3", { className: "courseTitle-y8D4l", children: course.title }), firebaseCourses.some(fc => fc.id === course.id) && (_jsx("div", { style: {
                                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                            color: 'white',
                                                                            padding: '4px 8px',
                                                                            borderRadius: '12px',
                                                                            fontSize: '10px',
                                                                            fontWeight: '600',
                                                                            textTransform: 'uppercase',
                                                                            letterSpacing: '0.5px',
                                                                            marginLeft: '8px'
                                                                        }, children: "\uD83D\uDD25 Firebase" })), _jsxs("div", { className: "courseRatingBox-p1B7f", children: [_jsx(Star, { size: 16, fill: "#ffc107", color: "#ffc107" }), _jsx("span", { className: "courseRatingValue-f3N1k", children: course.rating }), _jsxs("span", { className: "courseStudentCount-t6L8r", children: ["(", formatNumber(course.students), ")"] })] })] }), _jsx("p", { className: "courseDescription-n2W4z", children: course.description }), _jsxs("div", { className: "courseInstructorBox-c7F1m", children: [_jsx("span", { className: "courseInstructorLabel-d3R5x", children: "Instructor:" }), _jsx("span", { className: "courseInstructorName-h4N9p", children: course.instructor })] }), _jsxs("div", { className: "courseInfoGroup-s5B8k", children: [_jsxs("div", { className: "courseInfoItem-j2T3r", children: [_jsx(Clock, { size: 14 }), " ", _jsx("span", { children: course.duration })] }), _jsxs("div", { className: "courseInfoItem-j2T3r", children: [_jsx(BookOpen, { size: 14 }), ' ', _jsxs("span", { children: [course.lessons.length, " lessons"] })] }), _jsxs("div", { className: "courseInfoItem-j2T3r", children: [_jsx(Users, { size: 14 }), ' ', _jsxs("span", { children: [formatNumber(course.students), " students"] })] })] }), _jsx("div", { className: "courseLevelBox-q9V5e", children: _jsx("span", { className: "courseLevelLabel-m6L1a", style: { backgroundColor: getLevelColor(course.level) }, children: course.level }) }), _jsxs("div", { className: "courseFooter-t8W7l", children: [_jsx("div", { className: "coursePriceBox-p6C3n", children: _jsx("span", { className: "coursePrice-r4A2j", children: course.price }) }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [user && user.uid === course.teacherId && (_jsx("button", { className: 'editcourse2', onClick: (e) => {
                                                                                    navigate('/add-course');
                                                                                    e.stopPropagation();
                                                                                    handleEditClick(course.id);
                                                                                }, style: {
                                                                                    background: 'transparent', // Transparent for "bordered" look
                                                                                    color: '#3a25ff',
                                                                                    border: '1.5px solid #3a25ff', // Visible border
                                                                                    borderRadius: '8px',
                                                                                    padding: '6px 14px',
                                                                                    fontSize: '13px',
                                                                                    fontWeight: '700',
                                                                                    cursor: 'pointer',
                                                                                    width: '100px',
                                                                                    height: '40px',
                                                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                                    letterSpacing: '0.3px',
                                                                                }, onMouseEnter: (e) => {
                                                                                    e.currentTarget.style.background = '#3a25ff'; // Fills color on hover
                                                                                    e.currentTarget.style.color = 'white';
                                                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 37, 255, 0.25)'; // Glow effect
                                                                                }, onMouseLeave: (e) => {
                                                                                    e.currentTarget.style.background = 'transparent';
                                                                                    e.currentTarget.style.color = '#3a25ff';
                                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                                }, children: "Edit" })), _jsx("button", { className: "courseViewBtn-f7B9q", children: "View Course" })] })] })] })] }, course.id))), " "] })) : (_jsxs("div", { className: "noCoursesBox-c9K4t", children: [_jsx(BookOpen, { size: 48, color: "#ccc" }), _jsx("h3", { className: "noCoursesTitle-x3L1p", children: "No courses available" }), _jsx("p", { className: "noCoursesText-v2N6m", children: "Check back soon for new courses in this category." })] })) })] })), activeTab === "exercises" && (_jsxs("div", { className: "exercisesContainer_a92hL", children: [_jsxs("button", { onClick: () => navigate('/addExercises'), style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto',
                                        // LIGHT GREY BASE: Very soft, almost white-grey
                                        backgroundColor: '#f8f9fa', // Bootstrap's $gray-100
                                        color: '#343a40', // Dark text for readability on light background
                                        // Modern Shape and Shadow
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft, subtle initial shadow
                                        border: '1px solid #dee2e6', // Add a thin, light border for definition
                                        padding: '12px 30px',
                                        borderRadius: '16px', // Soft, modern 'squircle' shape
                                        fontSize: '17px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        // Smoother, professional transition
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        width: '240px',
                                        height: '60px',
                                        gap: '10px',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                    }, onMouseEnter: (e) => {
                                        // Trendy Hover Effect: Lift and subtle scale
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                                        // Subtle darker grey background for immediate feedback
                                        e.currentTarget.style.backgroundColor = '#e9ecef';
                                    }, onMouseLeave: (e) => {
                                        // Return to initial state
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    }, children: [_jsx(Plus, { size: 20 }), "Add New Exercise"] }), loadingExercises ? (_jsx("div", { style: { padding: '20px', textAlign: 'center', color: '#666' }, children: "Loading exercises..." })) : (
                                // Once loading is complete, combine and display exercises
                                (() => {
                                    // Combine exercises from updatedCurrentSection (courseData) and Firebase
                                    const allExercises = [
                                        ...((updatedCurrentSection === null || updatedCurrentSection === void 0 ? void 0 : updatedCurrentSection.exercises) || []), // Safely add exercises from course data
                                        ...(firebaseExercises || []) // Safely add exercises from Firebase
                                    ];
                                    if (allExercises.length === 0) {
                                        // If no exercises from any source are available after loading
                                        return (_jsxs("div", { className: "noExercisesContainer_b2hPq", children: [_jsx("h3", { className: "noExercisesTitle_z3kWf", children: "No exercises available" }), _jsx("p", { className: "noExercisesText_c7rNs", children: "Check back soon for new exercises in this category." }), !loadingExercise && firebaseExercises.length === 0 && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }, children: [_jsx("span", { style: { color: '#e53e3e', fontSize: '12px' }, children: "No Firebase exercise found" }), _jsx("button", { onClick: loadFirebaseExercise, style: {
                                                                background: '#3a25ff',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                padding: '4px 8px',
                                                                fontSize: '10px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600'
                                                            }, children: "\uD83D\uDD04 Reload Firebase" })] }))] }));
                                    }
                                    // If exercises are available, map and render them
                                    return (_jsxs(_Fragment, { children: [!loadingExercise && firebaseExercises.length === 0 && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }, children: [_jsx("span", { style: { color: '#e53e3e', fontSize: '12px' }, children: "No Firebase exercise found" }), _jsx("button", { onClick: loadFirebaseExercise, style: {
                                                            background: '#3a25ff',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            padding: '4px 8px',
                                                            fontSize: '10px',
                                                            cursor: 'pointer',
                                                            fontWeight: '600'
                                                        }, children: "\uD83D\uDD04 Reload" })] })), allExercises.map((exercise) => ( // Explicit type for exercise
                                            _jsxs("div", { className: "exerciseCard_s73Kx", children: [_jsxs("div", { className: "exerciseTop_xb7Lp", children: [_jsx("div", { className: `exerciseIcon_wf5Rt ${exercise.completed ? "completed" : "notCompleted"}`, children: exercise.completed ? "🏆" : "▶️" }), _jsxs("div", { className: "exerciseContent_i9rTb", children: [_jsxs("div", { className: "exerciseHeader_d4mQp", children: [_jsx("h3", { className: "exerciseTitle_o8rVz", children: exercise.title }), firebaseExercises.some(fc => fc.id === exercise.id) && ( // Simplified check
                                                                            _jsx("div", { style: {
                                                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                                    color: 'white',
                                                                                    padding: '4px 8px',
                                                                                    borderRadius: '12px',
                                                                                    fontSize: '10px',
                                                                                    fontWeight: '600',
                                                                                    textTransform: 'uppercase',
                                                                                    letterSpacing: '0.5px',
                                                                                    marginLeft: '8px'
                                                                                }, children: "\uD83D\uDD25 Firebase" })), _jsx("span", { className: `exerciseDifficulty_w8nLo ${exercise.difficulty}`, style: {
                                                                                    backgroundColor: getDifficultyColor(exercise.difficulty),
                                                                                }, children: exercise.difficulty })] }), _jsxs("div", { className: "exerciseDetails_n6yQr", children: [_jsx("span", { className: "exerciseType_m3pDs", children: exercise.type }), _jsxs("div", { className: "exerciseStats_c2eHr", children: [_jsxs("div", { className: "exerciseStat_g5kLp", children: ["\u23F1\uFE0F ", exercise.duration] }), _jsxs("div", { className: "exerciseStat_g5kLp", children: ["\u2B50 ", exercise.points, " pts"] })] })] })] }), _jsx("button", { onClick: () => toggleExpand(exercise.id), className: `exerciseButton_v4tLs ${exercise.completed ? "completedBtn" : ""}`, children: exercise.completed
                                                                    ? "Completed"
                                                                    : expandedId === exercise.id
                                                                        ? "Hide"
                                                                        : "Start Now" })] }), expandedId === exercise.id && exercise.questions && (_jsxs("div", { className: "exerciseExpandArea_a7pFt", children: [exercise.questions.map((q, idx) => (_jsxs("div", { className: "exerciseQuestion_r2bKp", children: [_jsxs("div", { className: "exerciseQuestionText_g1nQo", children: [idx + 1, ". ", q.question] }), q.options.map((option) => {
                                                                        var _a;
                                                                        return (_jsxs("label", { className: "exerciseOption_b3xYn", children: [_jsx("input", { type: "radio", name: `exercise-${exercise.id}-q${idx}`, value: option, 
                                                                                    // **CRUCIAL FIX: Added checked and onChange for radio buttons**
                                                                                    checked: ((_a = exerciseAnswers[exercise.id]) === null || _a === void 0 ? void 0 : _a[idx]) === option, onChange: (e) => {
                                                                                        const newAnswers = [...(exerciseAnswers[exercise.id] || [])];
                                                                                        newAnswers[idx] = e.target.value;
                                                                                        setExerciseAnswers((prev) => (Object.assign(Object.assign({}, prev), { [exercise.id]: newAnswers })));
                                                                                    } }), option] }, option));
                                                                    })] }, idx))), _jsx("button", { className: "exerciseSubmit_k7sUi", onClick: () => {
                                                                    var _a;
                                                                    const answers = exerciseAnswers[exercise.id] || []; // Explicit type
                                                                    let correctCount = 0;
                                                                    if ((_a = exercise.questions) === null || _a === void 0 ? void 0 : _a.length) {
                                                                        exercise.questions.forEach((q, idx) => {
                                                                            const selected = String(answers[idx] || "").trim().toLowerCase();
                                                                            const correct = String(q.correctAnswer || "").trim().toLowerCase();
                                                                            if (selected === correct) {
                                                                                correctCount++;
                                                                            }
                                                                        });
                                                                        setExerciseAnswers((prev) => {
                                                                            var _a;
                                                                            return (Object.assign(Object.assign({}, prev), { [`${exercise.id}_result`]: `You got ${correctCount} out of ${((_a = exercise.questions) === null || _a === void 0 ? void 0 : _a.length) || 0} correct!` }));
                                                                        });
                                                                    }
                                                                    else {
                                                                        setExerciseAnswers((prev) => (Object.assign(Object.assign({}, prev), { [`${exercise.id}_result`]: "No questions to check." })));
                                                                    }
                                                                }, children: "Submit" }), exerciseAnswers[`${exercise.id}_result`] && (_jsx("div", { className: "exerciseResult_j9uQo", children: exerciseAnswers[`${exercise.id}_result`] }))] }))] }, exercise.id)))] }));
                                })())] })), activeTab === 'sharedNotes' && (_jsxs("div", { className: "sharedNotesWrapper_x91", children: [_jsxs("h2", { className: "sharedNotesTitle_x91", children: [_jsx(Users, { size: 40, style: { marginRight: '1rem', color: '#1201b1ff' } }), "Collaborative Learning Board"] }), _jsx("p", { className: "sharedNotesDesc_x91", children: "Welcome to the Study Materials Exchange! Here, students upload, download, and rate collective notes. Let's learn together!" }), _jsx("div", { className: "sharedNotesBtnWrap_x91", children: _jsxs("button", { onClick: handleButtonClick, className: "sharedNotesButton_x91", children: [_jsx(FileText, { size: 20, style: { marginRight: '8px' } }), "Share Your Notes"] }) }), _jsx("div", { className: "sharedNotesGrid_x92", children: updatedCurrentSection && updatedCurrentSection.sharedNotes && updatedCurrentSection.sharedNotes.length > 0 ? (updatedCurrentSection.sharedNotes.map((note) => (_jsxs("div", { className: "noteCard_x92", children: [_jsx("div", { className: "noteTape_x92" }), _jsx("div", { children: _jsxs("div", { className: "noteHeader_x92", children: [_jsxs("div", { className: "noteAuthorBox_x92", children: [_jsx("img", { src: (userData === null || userData === void 0 ? void 0 : userData.photoURL) || 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg', alt: note.author || 'Anonymous', className: "noteAuthorImg_x92" }), _jsxs("span", { className: "noteAuthorName_x92", children: ["by ", note.author || 'Unknown'] })] }), _jsxs("div", { className: "noteCardFileType_x93", children: [_jsx(FileText, { size: 16 }), note.fileType || 'Doc'] }), _jsx("h3", { className: "noteCardTitle_x93", children: note.title || 'Untitled Note' }), _jsxs("div", { className: "noteCardStats_x93", children: [_jsxs("div", { className: "noteCardStatsStars_x93", children: [Array.from({ length: 5 }, (_, i) => (_jsx(Star, { size: 18, fill: i < Math.floor(note.rating || 0) ? '#3a25ff' : 'none', stroke: i < Math.floor(note.rating || 0) ? '#3a25ff' : '#d2d2d2' }, i))), _jsxs("span", { children: ["(", (note.rating || 0).toFixed(1), ")"] })] }), _jsxs("div", { className: "noteCardStatsNumbers_x93", children: [_jsx(Download, { size: 17 }), formatNumber(note.downloads)] }), _jsxs("div", { className: "noteCardStatsNumbers_x93", children: [_jsx(Eye, { size: 17 }), formatNumber(note.views)] })] }), _jsx("p", { className: "notePreview_f7g", children: note.preview || 'No preview available for this note. Download to view full content.' }), _jsxs("div", { className: "noteAdditional_f7g", children: [_jsxs("div", { className: "noteFeatureLeft_f7g", children: [_jsxs("div", { className: "noteFeatureItem_f7g", children: [_jsx(Calendar, { size: 16 }), _jsxs("span", { children: ["Uploaded: ", note.uploadDate || 'N/A'] })] }), _jsxs("div", { className: "noteFeatureItem_f7g", children: [_jsx(Tag, { size: 16 }), _jsxs("span", { children: ["Tags: ", (note.tags && note.tags.join(', ')) || 'General'] })] })] }), _jsxs("div", { className: "noteFeatureRight_f7g", children: [_jsxs("div", { className: "noteFeatureRightItem_f7g", children: [_jsx(FileText, { size: 16 }), note.size || 'Unknown Size'] }), _jsxs("div", { className: "noteFeatureRightItem_f7g", children: [_jsx(MessageSquare, { size: 16 }), _jsxs("span", { children: [formatNumber(note.comments || 0), " Comments"] })] })] })] }), _jsx("button", { className: "noteDownloadButton_f9x", children: (note.fileUrl || fileURL) ? (_jsxs("button", { className: "noteDownloadButton_f9x", type: "button", onClick: (e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    const downloadUrl = note.fileUrl || fileURL;
                                                                    if (!downloadUrl) {
                                                                        alert('No file available to download.');
                                                                        return;
                                                                    }
                                                                    // Try to trigger a download for blob/data/remote urls
                                                                    try {
                                                                        const a = document.createElement('a');
                                                                        a.href = downloadUrl;
                                                                        const safeName = (note.title && note.title.replace(/[:\\/<>?"|*]/g, '_')) || `download-${note.id}`;
                                                                        a.download = safeName;
                                                                        document.body.appendChild(a);
                                                                        a.click();
                                                                        a.remove();
                                                                        // update local downloads count so UI reflects the action
                                                                        setSharedNotes(prev => prev.map(n => (n.id === note.id ? Object.assign(Object.assign({}, n), { downloads: (n.downloads || 0) + 1 }) : n)));
                                                                    }
                                                                    catch (err) {
                                                                        console.error('Download failed:', err);
                                                                        // fallback to existing handler if any side-effects are needed
                                                                        handleDownload(note);
                                                                    }
                                                                }, children: [_jsx(Download, { size: 18, style: { marginRight: '8px' } }), " Download"] })) : (_jsxs("button", { className: "noteDownloadButton_f9x", type: "button", disabled: true, title: "No file uploaded", children: [_jsx(Download, { size: 18, style: { marginRight: '8px' } }), " Download"] })) })] }) })] }, note.id)))) : (_jsxs("div", { className: "notesEmptyMessage_f9x", children: [_jsx(Users, { size: 60, color: "#c5d9e5", className: "notesEmptyMessageIcon_f9x" }), _jsx("h3", { className: "notesEmptyMessageTitle_f9x", children: "No notes on the board yet!" }), _jsx("p", { className: "notesEmptyMessageText_f9x", children: "Be the first to upload your study materials or check back soon for notes shared by the community." })] })) })] })), showForm && (_jsx("div", { className: "notesFormOverlay_f9x", children: _jsxs("form", { onSubmit: handleSubmit, className: "notesFormContainer_f9x", children: [_jsx("h3", { className: "notesFormTitle_f9x", children: "Share Your Study Notes" }), _jsx("input", { type: "text", name: "name", placeholder: "Your Name", value: formData.name, onChange: handleInputChange, required: true, className: "notesFormInput_f9x" }), _jsx("input", { type: "email", name: "email", placeholder: "Your Email", value: formData.email, onChange: handleInputChange, required: true, className: "notesFormInput_f9x" }), _jsxs("div", { children: [_jsx("input", { type: "text", name: "noteTitle", placeholder: "Title of your note/course", value: formData.title, onChange: (e) => setFormData((prev) => (Object.assign(Object.assign({}, prev), { title: e.target.value }))), required: true, className: "notesFormInput_f9x" }), _jsx("label", { htmlFor: "noteCategory", style: { display: 'block', marginTop: '8px', marginBottom: '6px', fontSize: '13px', color: '#444' }, children: "Choose Category" }), _jsx("select", { id: "noteCategory", name: "course", value: formData.course || activeSection, onChange: (e) => {
                                                    const val = e.target.value;
                                                    // persist chosen category into formData so submit handler uses it
                                                    setFormData((prev) => (Object.assign(Object.assign({}, prev), { course: val })));
                                                    // reflect selection in UI so shared note shows under chosen category immediately
                                                    setActiveSection(val);
                                                }, required: true, className: "notesFormInput_f9x", style: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px' }, children: SECTIONS.map((sec) => (_jsx("option", { value: sec.id, children: sec.title }, sec.id))) })] }), _jsx("textarea", { name: "message", placeholder: "Describe your notes or add details...", value: formData.message, onChange: handleInputChange, rows: 5, required: true, className: "notesFormTextarea_f9x", style: {
                                            overflowY: 'auto', // Adds the vertical scrollbar when needed
                                            resize: 'none' // Optional: Prevents the user from resizing the box manually
                                        } }), _jsx("input", { type: "file", onChange: handleUpload }), _jsxs("div", { className: "notesFormActions_f9x", children: [_jsx("button", { type: "button", onClick: () => setShowForm(false), className: "notesFormCancelButton_f9x", children: "Cancel" }), _jsx("button", { type: "submit", className: "notesFormSubmitButton_f9x", children: "Share Notes" })] })] }) }))] })) })] }));
}
export default Courses;
