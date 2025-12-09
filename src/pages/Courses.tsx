import { MessageSquare, BookOpen, Briefcase, Users, FileText, Award, Star, Clock, Play, Download, Eye, ThumbsUp, Calendar, ChevronLeft, CheckCircle, PlayCircle, FileVideo, User, Globe, Scroll, Book, FlaskConical, Languages } from 'lucide-react';
import React, { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Courses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDownload, faEye, faUpload, faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService, CourseService, ExercisesService } from '../firebase/src/firebaseServices';
import toast, { Toaster } from 'react-hot-toast';
import {
  FaUser,
  FaBriefcase,
  FaBook,
  FaFileDownload,
  FaPencilAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { FaPaintBrush, FaShieldAlt, FaChartLine, FaCode, FaMobileAlt } from 'react-icons/fa';
import { Tag, Bookmark } from 'lucide-react';
import { SECTIONS } from './CoursesData';
import { Video, Link as LucideLink, Image } from 'lucide-react';
import { File, Plus } from 'lucide-react';

const faPaintBrush = <FaPaintBrush />;
const faShieldAlt = <FaShieldAlt />;
const faChartLine = <FaChartLine />;
const faCode = <FaCode />;
const faMobileAlt = <FaMobileAlt />;

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: string;
  originalPrice?: string;
  modules: number;
  certificate: boolean;
  lessons: Lesson[];
  overview: string;
  requirements: string[];
  whatYouLearn: string[];
  progress?: number;
  courseLinks?: {
    type: 'video' | 'document' | 'image' | 'other';
    title: string;
    url: string;
  }[];
  reviews?: {
    student: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  teacherId?: string; // ✅ مهم جدًا للتحقق من الملكية
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  description: string;
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correct: number;
    }[];
  };
}

interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Exercise {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  duration: string;
  points: number;
  completed?: boolean;
  questions?: ExerciseQuestion[];
  // optional fields used elsewhere
  progress?: number;
  teacherId?: string;
  teacherName?: string;
  createdAt?: any;
  rating?: number;
  reviews?: number;
  studentsCount?: number;
}

interface SharedNote {
  id: string;
  title: string;
  author: string;
  uploadDate: string;
  profilePic: string;
  course: string;
  downloads: number;
  views: number;
  fileType: string;
  size: string;
  preview: string;
  rating: number;
  tags: string[];
  comments: number;
  fileUrl: string;
  userId: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  title: string;
  category: string[];
  message: string;
  attachedFile: File | null;
}

interface SectionType {
  id: string;
  title: string;
  icon: React.ReactNode;
  courses: Course[];
  exercises: Exercise[];
  sharedNotes: SharedNote[];
}

interface ExercisesProps {
  currentSection: SectionType;
  activeTab: string;
}

function Courses() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [activeTab, setActiveTab] = useState<'courses' | 'exercises' | 'sharedNotes'>('courses');
  const [viewMode, setViewMode] = useState<'courses' | 'lessons' | 'catalog'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [viewModeE, setViewModeE] = useState<'catalog' | 'exercises' | 'exercise'>('catalog');
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(string | number)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<{ correct: number; total: number } | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loadingExercise, setLoadingExercise] = useState(false);
  const [currentCourseSection, setCurrentCourseSection] = useState({
    id: '',
    title: '',
    icon: <></>,
    courses: [],
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<string | null>(null);
  const [mcqExpanded, setMcqExpanded] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<(string | null)[]>([]);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState<number | null>(null);
  const [exerciseAnswers, setExerciseAnswers] = useState<{ [key: string]: any }>({});
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    title: '',
    category: [],
    message: '',
    attachedFile: null,
  });
  const navigate = useNavigate();
  const [sharedNotes, setSharedNotes] = useState<SharedNote[]>([]);
  const prevSharedNotesCount = useRef<number>(0);
  const [firebaseCourses, setFirebaseCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const currentSection = SECTIONS.find(sec => sec.id === activeSection);

  // ✅ Single source of truth for exercises
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [allCourses, setAllCourses] = useState<(Course | Exercise)[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true); // Start true
  const [updatedCurrentSections, setUpdatedCurrentSection] = useState<Exercise | null>(null);
  const [firebaseExercises, setFirebaseExercises] = useState<Exercise[]>([]);
  const [currentSectionC, setCurrentSection] = useState<any>(null);


  ////////////////////////////////////////
  //////////////////////////////////////
  //COURSES LECTURES
  /////////////////////////////////////
  ///////////////////////////////////////


  const handleCourseClick = (course: any) => {
    const fullCourse: Course = {
      ...course,
      courseLinks: course.courseLinks || [],
      lessons: course.lessons || [],
      requirements: course.requirements || [],
      whatYouLearn: course.whatYouLearn || [],
      reviews: course.reviews || []
    };
    setSelectedCourse(fullCourse);
    setViewMode('courses');
    setCurrentLesson(null);
    setQuizOpen(false);
    setQuizAnswers([]);
    setQuizSubmitted(false);
    setQuizResults(null);
  };

  const handleLessonClick = (lesson: Lesson) => {
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

  const markLessonComplete = (lessonId: number) => {
    if (!selectedCourse) return;
    const updatedLessons = selectedCourse.lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    );
    const completedCount = updatedLessons.filter((l) => l.completed).length;
    const progress = Math.round((completedCount / updatedLessons.length) * 100);
    setSelectedCourse({
      ...selectedCourse,
      lessons: updatedLessons,
      progress,
    });
    if (currentLesson && currentLesson.id === lessonId) {
      setCurrentLesson({ ...currentLesson, completed: true });
    }
  };
  const loadFirebaseCourses = async () => {
    try {
      setLoadingCourses(true);
      console.log('🔥 Starting to load Firebase courses...');
      const courses = await CourseService.getAllCourses();
      console.log('🔥 Raw courses from Firebase:', courses);
      if (!courses || courses.length === 0) {
        console.log('🔥 No courses found in Firebase');
        setFirebaseCourses([]);
        return;
      }
      const formattedCourses: Course[] = courses.map((course: any, index: number) => {
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
    } catch (error) {
      console.error('🔥 Error loading courses from Firebase:', error);
      setFirebaseCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await UserService.getUserData(user.uid);
        setUserData(data);
      }
    };
    fetchUserData();
  }, [user]);

  // ✅ دالة التسجيل في الكورس
  const handleEnroll = async (course: Course) => {
    if (!user) {
      alert('Please log in to enroll in this course.');
      return;
    }

    try {
      
      let courseId: string;
      if (typeof course.id === 'string') {
        courseId = course.id;
      } else if (typeof course.id === 'number') {
        courseId = course.id.toString();
      } else {
        
        courseId = `course-${Date.now()}`;
      }

      const courseData: any = {
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

      await CourseService.enrollCourse(courseId, user.uid, courseData);


      const updatedData = await UserService.getUserData(user.uid);
      setUserData(updatedData);

      toast.success('Successfully enrolled in the course! 🎉');
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      toast.error(error.message || 'An error occurred while enrolling in the course');
    }
  };


  const isEnrolled = (course: Course): boolean => {
    if (!userData?.registeredCourses || course.id === undefined) return false;
    const courseId = typeof course.id === 'string' ? course.id : course.id.toString();
    return userData.registeredCourses.some((c: any) =>
      String(c.id) === courseId || String(c.courseId) === courseId
    );
  };

  useEffect(() => {
    loadSharedNotesFromFirebase();
    loadFirebaseCourses();
    loadFirebaseExercise();
  }, []);

  const formatNumber = (num: number) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#28a745';
      case 'intermediate': return '#ffc107';
      case 'advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCurrentSectionWithFirebaseNotes = () => {
    if (!currentSection) return null;
    const allCourses = [
      ...currentSection.courses.map((course: any) => ({
        ...course,
        courseLinks: (course as any).courseLinks || []
      })),
      ...firebaseCourses.map((course: any) => {
        console.log('🔥 Adding Firebase course to mix:', course.title);
        return {
          ...course,
          courseLinks: (course as any).courseLinks || []
        };
      })
    ];
    console.log('🔥 All courses combined:', allCourses.length);
    console.log('🔥 Firebase courses in mix:', firebaseCourses.length);
    const localExercises = Array.isArray(currentSection.exercises) ? currentSection.exercises : [];
    const firebaseExercisesForSection = (firebaseExercises || []).filter((ex: any) =>
      String(ex.sectionId) === String(activeSection) ||
      String(ex.course) === String(activeSection) ||
      String(ex.teacherId) === String(activeSection)
    );
    const normalize = (ex: any) => ({
      id: ex.id,
      title: ex.title || 'Untitled Exercise',
      type: ex.type || 'General',
      difficulty: ex.difficulty || 'Easy',
      duration: ex.duration || 'Unknown',
      points: ex.points ?? 0,
      completed: !!ex.completed,
      questions: ex.questions || [],
      progress: ex.progress ?? 0,
      teacherId: ex.teacherId,
      teacherName: ex.teacherName,
      createdAt: ex.createdAt,
      rating: ex.rating,
      reviews: ex.reviews,
      studentsCount: ex.studentsCount,
    });
    const normalizedFirebaseExercises = firebaseExercisesForSection.map(normalize);
    // dedupe by id (string/number)
    const existingIds = new Set(localExercises.map((e: any) => String(e.id)));
    const mergedExercises = [
      ...localExercises,
      ...normalizedFirebaseExercises.filter((e: any) => !existingIds.has(String(e.id)))
    ];
    return {
      ...currentSection,
      sharedNotes: sharedNotes.filter(note =>
        note.course === activeSection || note.course === 'General'
      ),
      courses: allCourses,
      exercises: mergedExercises,
    };
  };

  const updatedCurrentSection = getCurrentSectionWithFirebaseNotes();

  const firebaseForSection = (firebaseCourses || []).filter((course: any) => {
    const courseCategory = String(course.category || course.section || course.sectionId || '').toLowerCase().trim();
    const activeKey = String(activeSection || '').toLowerCase().trim();
    return courseCategory && courseCategory === activeKey;
  });

  const courses = [
    ...currentCourseSection.courses.map((course: any) => ({
      ...course,
      courseLinks: (course as any).courseLinks || []
    })),
    ...firebaseForSection.map((course: any) => ({
      ...course,
      courseLinks: (course as any).courseLinks || []
    }))
  ];

  /////////////////////////////////////////
  //////////////////////////////////////
  //COURSES Edit
  /////////////////////////////////////
  /////////////////////////////////////
  const handleEditClick = (courseId: string) => {
    if (!user) return;
    navigate(`/edit-course?id=${courseId}`);
  };



  /////////////////////////////////////////
  //////////////////////////////////////
  //COURSES Exercise
  /////////////////////////////////////
  //////////////////////////////////////



  useEffect(() => {
    const fetchAllExerciseData = async () => {
      setLoadingExercises(true);
      try {

        setCurrentSection(userData.currentSection);
        const firebaseData = await ExercisesService.getAllExercises();
        // تحويل البيانات من Firebase إلى Exercise[]
        const exercisesData = (firebaseData || []).map((ex: any) => ({
          id: ex.id || Date.now(),
          title: ex.title || 'Exercise',
          type: ex.type || 'quiz',
          difficulty: ex.difficulty || 'medium',
          duration: ex.duration || '10 min',
          points: ex.points || 10,
          ...ex,
        })) as Exercise[];
        setFirebaseExercises(exercisesData);
      } catch (error) {
        console.error("Error loading exercises:", error);
      } finally {
        setLoadingExercises(false);
      }
    };
    if (activeTab === "exercises") {
      fetchAllExerciseData();
    }
  }, [activeTab]);

  // Rerun when activeTab changes
  useEffect(() => {
    console.log("🔥 All exercises loaded:", exercises.length);
  }, [exercises]);

  // ✅ Simple expand toggle for a modern clean UI interaction
  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getLevelColor = (level: string): string => {
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
  const handleExerciseClick = (exercise: any) => {
    const fullExercise: Exercise = {
      ...exercise,
      questions: exercise.questions || [],
    };
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
    if (!currentExercise || !currentExercise.questions) return;
    let correct = 0;
    currentExercise.questions.forEach((q, i) => {
      // support different possible question shapes (correctAnswer or correct)
      const correctAns = (q as any).correctAnswer ?? (q as any).correct;
      if (quizAnswers[i] === correctAns) correct++;
    });
    setQuizSubmitted(true);
    setQuizResults({ correct, total: currentExercise.questions.length });
    if (currentExercise.questions.length > 0 && correct / currentExercise.questions.length >= 0.7) {
      markExerciseComplete(currentExercise.id);
    }
  };

  const markExerciseComplete = (exerciseId: number) => {
    if (!selectedExercise) return;
    // Safely mark the exercise as completed without assuming questions exist
    setSelectedExercise({
      ...selectedExercise,
      completed: true,
      progress: 100,
    } as any);
    if (currentExercise && currentExercise.id === exerciseId) {
      setCurrentExercise({ ...currentExercise, completed: true } as any);
    }
  };

  const addExerciseToSection = (exercisePartial: Partial<Exercise>, sectionId: string = activeSection) => {
    const newExercise: Exercise = {
      id: Date.now(), // simple unique id for local usage
      title: exercisePartial.title || 'Untitled Exercise',
      type: (exercisePartial as any).type || 'MCQ',
      difficulty: (exercisePartial.difficulty as string) || 'Beginner',
      duration: (exercisePartial.duration as string) || 'Unknown',
      points: exercisePartial.points ?? 0,
      completed: false,
      questions: (exercisePartial.questions as any) || [],
      progress: 0,
    };
    const secIndex = SECTIONS.findIndex(s => s.id === sectionId);
    if (secIndex >= 0) {
      // ensure we merge with a consistent typed array to avoid union types where 'completed' becomes optional
      const existingExercises = (SECTIONS[secIndex].exercises || []) as any[];
      SECTIONS[secIndex].exercises = [newExercise, ...existingExercises];
      // force a small rerender by toggling a loading state (safe hack)
      setLoadingExercises(prev => !prev);
      // expand the newly added exercise so it shows in expanded mode immediately
      setTimeout(() => setExpandedId(newExercise.id), 80);
    } else {
      console.warn('addExerciseToSection: section not found for id', sectionId);
    }
  };

  useEffect(() => {
    if (!firebaseExercises || firebaseExercises.length === 0) return;
    // Merge Firebase exercises into SECTIONS while preserving firebase string ids
    firebaseExercises.forEach((ex: any) => {
      // determine the section this exercise belongs to (try multiple possible fields)
      const sectionKey = String(ex.sectionId ?? ex.course ?? ex.teacherId ?? activeSection);
      const secIndex = SECTIONS.findIndex((s) => String(s.id) === sectionKey);
      if (secIndex < 0) return;
      const existing = SECTIONS[secIndex].exercises || [];
      // avoid duplicates by id (compare as strings to handle Firestore string ids)
      if (existing.some((e: any) => String(e.id) === String(ex.id))) return;
      // normalize questions shape for consistent UI usage
      const normalizeQuestions = (qs: any[] = []) =>
        (qs || []).map((q: any) => ({
          question: q?.question ?? q?.prompt ?? q?.text ?? '',
          options: Array.isArray(q?.options)
            ? q.options
            : Array.isArray(q?.choices)
              ? q.choices
              : [],
          correctAnswer: String(
            q?.correctAnswer ?? q?.correct ?? q?.answer ?? q?.solution ?? ''
          ).trim(),
        }));
    });
    setLoadingExercises((p) => !p);
    setTimeout(() => {
      const first = firebaseExercises[0];
      if (first) setExpandedId(first.id as any);
    }, 80);
  }, [firebaseExercises, activeSection]);

  useEffect(() => {
    const secIndex = SECTIONS.findIndex(s => s.id === activeSection);
    if (secIndex >= 0 && firebaseExercises && firebaseExercises.length > 0) {
      const existing = SECTIONS[secIndex].exercises || [];
      const exercisesForSection = firebaseExercises.filter((ex: any) =>
        String(ex.sectionId) === String(activeSection) ||
        String(ex.course) === String(activeSection) ||
        String(ex.teacherId) === String(activeSection)
      );
      const toAdd = exercisesForSection.filter((fe: any) =>
        !existing.some((e: any) => String(e.id) === String(fe.id))
      );
      if (toAdd.length > 0) {
        const normalizeExercise = (ex: any): Exercise => ({
          id: typeof ex.id === 'number' ? ex.id : parseInt(String(ex.id)) || Date.now(),
          title: ex.title || 'Untitled Exercise',
          type: ex.type || 'MCQ',
          difficulty: ex.difficulty || 'Easy',
          duration: ex.duration || 'Unknown',
          points: ex.points ?? 0,
          completed: !!ex.completed,
          questions: ex.questions || [],
          // preserve optional fields if present
          progress: ex.progress ?? 0,
          teacherId: ex.teacherId,
          teacherName: ex.teacherName,
          createdAt: ex.createdAt,
          rating: ex.rating,
          reviews: ex.reviews,
          studentsCount: ex.studentsCount,
        });
        const normalizedToAdd = toAdd.map(normalizeExercise);
        const normalizedExisting = existing.map((e: any) => normalizeExercise(e));
        const ensureShape = (ex: any) => ({
          id: Number(ex.id) || Date.now(),
          title: ex.title || 'Untitled Exercise',
          type: ex.type || 'General',
          difficulty: ex.difficulty || 'Easy',
          duration: ex.duration || 'Unknown',
          points: ex.points ?? 0,
          completed: !!ex.completed,
          questions: (ex.questions || []).map((q: any) => ({
            question: q.question || q.prompt || '',
            options: q.options || q.choices || [],
            correctAnswer: (q.correctAnswer ?? q.correct ?? q.answer ?? '').toString(),
          })),
        });
        const shapedToAdd = normalizedToAdd.map(ensureShape);
        const shapedExisting = normalizedExisting.map(ensureShape);
        SECTIONS[secIndex].exercises = [...(shapedToAdd as any), ...(shapedExisting as any)];
        setLoadingExercises(prev => !prev);
        setTimeout(() => setExpandedId((shapedToAdd[0] && shapedToAdd[0].id) || Date.now()), 80);
      }
    }
  }, [activeSection, firebaseExercises]);

  const createAndShowExercise = (exerciseData: Partial<Exercise>, targetSectionId?: string) => {
    addExerciseToSection(exerciseData, targetSectionId || activeSection);
  };

  const getExercisesForCourse = (course: Course) => {
    const allExercises = [
      // section-local exercises
      ...SECTIONS.flatMap(s => s.exercises || []),
      // firebase-loaded exercises
      ...firebaseExercises,
    ];
    // match by common fields (adjust if your exercises store course/section differently)
    return allExercises.filter((ex: any) =>
      String(ex.course) === String(course.id) ||
      String(ex.teacherId) === String(course.id) ||
      String(ex.sectionId) === String(activeSection) ||
      // fallback: match by title/section heuristics
      (ex.title && String(course.title || '').toLowerCase().includes(String(ex.title || '').toLowerCase()))
    );
  };

  const loadFirebaseExercise = async () => {
    try {
      setLoadingExercises(true);
      console.log('🔥 Starting to load Firebase exercise...');
      const exercises = await ExercisesService.getAllExercises();
      console.log('🔥 Raw exercise from Firebase:', exercises);
      if (!exercises || exercises.length === 0) {
        console.log('🔥 No exercise found in Firebase');
        setFirebaseExercises([]);
        return;
      }
      const formattedExercises: Exercise[] = exercises.map((exercise: any, index: number) => {
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
    } catch (error) {
      console.error('🔥 Error loading courses from Firebase:', error);
      setFirebaseExercises([]);
    } finally {
      setLoadingExercises(false);
    }
  };



  /////////////////////////////////////////
  //////////////////////////////////////////////
  //SHARED NOTES
  ////////////////////////////////////////////////
  /////////////////////////////////////////////////



  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFormData(prev => ({ ...prev, attachedFile: file }));
    const localUrl = URL.createObjectURL(file);
    setFileURL(localUrl);

    const previewNote: SharedNote = {
      id: `local-${Date.now()}`,
      title: file.name,
      author: userData?.displayName || user?.email?.split('@')[0] || 'You',
      uploadDate: new Date().toISOString().split('T')[0],
      profilePic: userData?.photoURL || user?.photoURL || '',
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
      userId: user?.uid || 'local',
      description: formData.message || ''
    };
    setSharedNotes(prev => [previewNote, ...prev]);
  };

  const handleDownload = (note: SharedNote) => {
    const downloadUrl = (note && note.fileUrl) || fileURL;
    if (!downloadUrl) {
      alert('No file available to download.');
      return;
    }
    const a = document.createElement('a');
    a.href = downloadUrl;
    const sanitize = (s: string) => s.replace(/[:\\/<>?"|*]/g, '_').trim() || 'download';

    const getExtFromUrl = (url?: string) => {
      if (!url) return '';
      try {
        const pathname = new URL(url, window.location.href).pathname;
        const m = pathname.match(/\.([a-z0-9]+)$/i);
        return m ? `.${m[1]}` : '';
      } catch {
        const m = String(url).split('?')[0].match(/\.([a-z0-9]+)$/i);
        return m ? `.${m[1]}` : '';
      }
    };

    const rawName = note.title || (selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'download');
    const extFromUrl = getExtFromUrl(downloadUrl);
    const extFromFile = selectedFile && selectedFile.name.match(/\.[^/.]+$/) ? selectedFile.name.match(/\.[^/.]+$/)![0] : '';
    const ext = extFromUrl || extFromFile || '';

    const coursePart = note.course || activeSection || '';
    const filename = `${sanitize(rawName)}${coursePart ? ' - ' + sanitize(String(coursePart)) : ''}${ext}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // update local downloads count so UI reflects the action
    setSharedNotes(prev =>
      prev.map(n => (n.id === note.id ? { ...n, downloads: (n.downloads || 0) + 1 } : n))
    );
  };
  const loadSharedNotesFromFirebase = async () => {
    try {
      const notesCollection = collection(db, 'sharedNotes');
      const notesSnapshot = await getDocs(notesCollection);
      const notesList: SharedNote[] = [];
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
    } catch (error) {
      console.error('Error loading notes from Firebase:', error);
    }
  };


  const saveSharedNoteToFirebase = async (noteData: SharedNote) => {
    try {
      const notesCollection = collection(db, 'sharedNotes');
      const newNoteData = {
        ...noteData,
        fileUrl: '',
        uploadDate: new Date().toISOString().split('T')[0],
        userId: user?.uid || 'anonymous',
        timestamp: new Date()
      };
      const docRef = await addDoc(notesCollection, newNoteData);
      console.log('Note saved successfully with ID:', docRef.id);
      await loadSharedNotesFromFirebase();
      return docRef.id;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newNote: SharedNote = {
        id: '',
        title: formData.title || 'Untitled Note',
        author: formData.name || user?.displayName || 'Anonymous',
        uploadDate: new Date().toISOString().split('T')[0],
        profilePic: userData?.photoURL || 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg',
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
        userId: user?.uid || 'anonymous',
        description: formData.message
      };
      await saveSharedNoteToFirebase(newNote);
      setShowForm(false);
      setFormData({ name: '', email: '', title: '', category: [], message: '', attachedFile: null });
      setFile(null);
      alert('Note shared successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sharing note. Please try again.');
    }
  };


  ///////////////////////////////////////////
  /////////////////////////////////////////// 
  // Course Overview Component
  //////////////////////////////////////////
  //////////////////////////////////////////



  const CourseOverview = ({ course }: { course: Course }) => (
    <div className="crsOv_1">
      <nav className="crsOv_2">
        <div className="crsOv_3">
          <button onClick={handleBackToCatalog} className="crsOv_4">
            <ChevronLeft size={24} />
          </button>
          <div className="crsOv_5">EDU</div>
        </div>
        <div className="crsOv_6">
          <BookOpen size={20} /> Course Overview
        </div>
      </nav>
      <div className="crsOv_10">
        <div className="crsOv_11">
          <div>
            <h1 className="crsOv_13">{course.title}</h1>
            <p className="crsOv_14">{course.description}</p>
            <div className="crsOv_15">
              <div className="crsOv_16">
                <Star fill="gold" color="gold" size={20} />
                <span className="crsOv_17">{course.rating}</span>
                <span>({formatNumber(course.students)} students)</span>
              </div>
              <div className="crsOv_18">
                <Clock size={20} />
                <span>{course.duration}</span>
              </div>
              <div className="crsOv_19">
                <User size={20} />
                <span>{course.instructor}</span>
              </div>
              <div className="crsOv_20">
                <Globe size={20} />
                <span>{course.level}</span>
              </div>
            </div>
            <button
              className="crsOv_21"
              onClick={() =>
                // start the first lesson if available; guard against missing lessons
                course.lessons && course.lessons.length > 0 ? handleLessonClick(course.lessons[0]) : null
              }
            >
              Start Learning Now
            </button>
          </div>
          <div>
            <img src={course.thumbnail} alt={course.title} className="crsOv_22" />
          </div>
        </div>
      </div>
      <div className="crsSec_1">
        <div>
          <div className="crsSec_2">
            <h2 className="crsSec_3">Course Overview</h2>
            <p className="crsSec_4">{course.overview}</p>
          </div>
          <div className="crsSec_5">
            <h2 className="crsSec_6">What You'll Learn</h2>
            <div className="crsSec_7">
              {course.whatYouLearn.map((item, index) => (
                <div key={index} className="crsSec_8">
                  <CheckCircle size={20} color="#28a745" />
                  <span className="crsSec_9">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Course Links Section */}
          {(course as any).courseLinks && (course as any).courseLinks.length > 0 && (
            <div className="crsSec_5">
              <h2 className="crsSec_6">Course Resources</h2>
              <div className="crsSec_7">
                {(course as any).courseLinks.map((link: any, index: number) => (
                  <div key={index} className="crsSec_8" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {link.type === 'video' && <Video size={20} color="#3a25ff" />}
                    {link.type === 'document' && <File size={20} color="#3a25ff" />}
                    {link.type === 'image' && <Image size={20} color="#3a25ff" />}
                    {link.type === 'other' && <LucideLink size={20} color="#3a25ff" />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#2d3748' }}>{link.title}</div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3a25ff',
                          textDecoration: 'none',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {course.progress !== undefined && (
            <div className="crsPrg_1">
              <h2 className="crsPrg_2">Your Progress</h2>
              <div className="crsPrg_3">
                <div className="crsPrg_4">
                  <span>Progress: {course.progress}%</span>
                  <span>
                    {course.lessons.filter(l => l.completed).length}/{course.lessons.length} lessons
                  </span>
                </div>
                <div className="crsPrg_5">
                  <div
                    className="crsPrg_6"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              {course.progress === 100 && course.certificate && (
                <div className="crsPrg_7">
                  <Award size={24} color="#28a745" />
                  <span className="crsPrg_8">
                    🎉 Congratulations! You've earned a certificate.
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="unique-course-section">
            <h2 className="unique-course-title">
              Course Curriculum ({course.lessons.length} lessons)
            </h2>
            <div className="unique-lessons-container">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`unique-lesson-card ${lesson.completed ? 'unique-lesson-completed' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="unique-lesson-top">
                    <div className="unique-lesson-info">
                      <div
                        className={`unique-lesson-index ${lesson.completed ? 'unique-lesson-index-done' : ''}`}
                      >
                        {lesson.completed ? <CheckCircle size={20} /> : index + 1}
                      </div>
                      <div>
                        <h3 className="unique-lesson-title">{lesson.title}</h3>
                        <p className="unique-lesson-desc">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="unique-lesson-meta">
                      <div className="unique-lesson-duration">
                        <FileVideo size={16} />
                        <span>{lesson.duration}</span>
                      </div>
                      <PlayCircle size={24} color="#3a25ff" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="unique-pricing-card">
            <div className="unique-pricing-top">
              <span className="unique-price">{course.price}</span>
              {course.originalPrice && (
                <span className="unique-original-price">{course.originalPrice}</span>
              )}
            </div>
            <Toaster position="top-right" />

            <button
              className="unique-enroll-btn"
              value={userData?.coursesEnrolled || 0}
              onClick={() => handleEnroll(course)}
              disabled={isEnrolled(course)}
              style={{
                opacity: isEnrolled(course) ? 0.6 : 1,
                cursor: isEnrolled(course) ? 'not-allowed' : 'pointer'
              }}
            >
              {isEnrolled(course) ? 'Already Enrolled' : 'Enroll Now'}
            </button>
            <button onClick={handleShare} className="unique-share-btn">
              Share Course
            </button>
            {shareModal && (
              <div className="unique-share-modal">Link copied to clipboard!</div>
            )}
            <div className="unique-course-details">
              <div>
                <span>Duration:</span>
                <span>{course.duration}</span>
              </div>
              <div>
                <span>Lessons:</span>
                <span>{course.lessons.length}</span>
              </div>
              <div>
                <span>Level:</span>
                <span>{course.level}</span>
              </div>
              <div>
                <span>Certificate:</span>
                <span className={course.certificate ? 'yes' : 'no'}>
                  {course.certificate ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          <div className="unique-req-section">
            <h3 className="unique-req-title">Requirements</h3>
            <div className="unique-req-list">
              {course.requirements.map((req, index) => (
                <div key={index} className="unique-req-item">
                  <div className="unique-req-dot"></div>
                  <span className="unique-req-text">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCertificate && (
        <div className="unique-cert-overlay">
          <div className="unique-cert-modal">
            <Award size={64} color="#28a745" style={{ marginBottom: '1rem' }} />
            <h2 className="unique-cert-title">🎉 Certificate of Completion</h2>
            <p className="unique-cert-text">
              Congratulations! You have successfully completed "{course.title}".
            </p>
            <button
              onClick={() => setShowCertificate(false)}
              className="unique-cert-btn"
            >
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const LessonView = ({ lesson, course }: { lesson: Lesson, course: Course }) => (
    <div className="lessonview-unique-wrapper">
      <nav className="lessonview-unique-nav">
        <div className="lessonview-unique-nav-left">
          <button onClick={handleBackToCourse} className="lessonview-unique-back-btn">
            <ChevronLeft size={24} />
          </button>
          <div className="lessonview-unique-titlebox">
            <span className="lessonview-unique-course-title">{course.title}</span>
            <span className="lessonview-unique-lesson-title">{lesson.title}</span>
          </div>
        </div>
        <div className="lessonview-unique-nav-right">
          <button
            onClick={() => markLessonComplete(lesson.id)}
            className={`lessonview-unique-complete-btn ${lesson.completed ? 'lessonview-unique-complete-btn--done' : ''}`}
          >
            {lesson.completed ? <CheckCircle size={16} /> : <PlayCircle size={16} />}
            {lesson.completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </nav>
      <div className="lessonview-unique-video-wrapper">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="lessonSection-x12A3">
        <div className="lessonGrid-y8B9f">
          <div>
            <div className="lessonCard-z4P7d">
              <h2 className="lessonTitle-c3R2k">{lesson.title}</h2>
              <p className="lessonDescription-b6L1m">{lesson.description}</p>
              <div className="lessonInfoBox-p2K9x">
                <div className="lessonInfoItem-h4N7j">
                  <Clock size={20} color="#666" />
                  <span>Duration: {lesson.duration}</span>
                </div>
                <div className="lessonInfoItem-h4N7j">
                  <User size={20} color="#666" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>
              {lesson.quiz && !quizOpen && (
                <div className="quizNotice-x9D3f">
                  <h3 className="quizNoticeTitle-k7L1p">Quiz Available</h3>
                  <p className="quizNoticeText-b4R2v">Test your knowledge after watching this lesson.</p>
                  <button onClick={openQuiz} className="quizStartBtn-j2N8m">Start Quiz</button>
                </div>
              )}
              {quizOpen && lesson.quiz && (
                <div className="quizContainer-h3L7b">
                  <h3 className="quizHeaderTitle-d2K5n">Quiz: {lesson.title}</h3>
                  {lesson.quiz.questions.map((q, i) => (
                    <div key={i} className="quizQuestionBlock-a8F1k">
                      <p className="quizQuestionText-r7G3s">{i + 1}. {q.question}</p>
                      {q.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`quizOptionLabel-y4N2t ${quizAnswers[i] === idx ? 'selectedOpt-c9Q8b' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            value={idx}
                            checked={quizAnswers[i] === idx}
                            onChange={() => {
                              const newAnswers = [...quizAnswers];
                              newAnswers[i] = idx;
                              setQuizAnswers(newAnswers);
                            }}
                            className="quizRadioInput-t5C6j"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  ))}
                  <button onClick={submitQuiz} disabled={quizSubmitted} className="quizSubmitBtn-z3L4m">
                    {quizSubmitted ? 'Submitted' : 'Submit Quiz'}
                  </button>
                  {quizSubmitted && quizResults && (
                    <div
                      className={`quizResultBox-p2V9n ${quizResults.correct / quizResults.total >= 0.7 ? 'quizSuccess-b6L8w' : 'quizFail-x1R2d'
                        }`}
                    >
                      <strong>Result:</strong> {quizResults.correct}/{quizResults.total} correct.
                      {quizResults.correct / quizResults.total >= 0.7 ? (
                        <span> 🎉 Lesson marked as completed!</span>
                      ) : (
                        <span> ❌ Please review the lesson and try again.</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="lessonListContainer-c7L9x">
              <h3 className="lessonListTitle-x2B5n">Course Lessons</h3>
              <div className="lessonListWrapper-t8R4m">
                {course.lessons.map((courseLesson, index) => (
                  <div
                    key={courseLesson.id}
                    className={`lessonListItem-p3K6v ${courseLesson.id === lesson.id
                        ? 'activeLesson-b2Y8r'
                        : courseLesson.completed
                          ? 'completedLesson-v1D4n'
                          : 'defaultLesson-m9F5t'
                      }`}
                    onClick={() => handleLessonClick(courseLesson)}
                  >
                    <div className="lessonListItemHeader-y6T3p">
                      <div className="lessonListItemInfo-a9W2k">
                        <div
                          className={`lessonListStatusCircle-n7C1f ${courseLesson.completed
                              ? 'circleCompleted-h5B3x'
                              : courseLesson.id === lesson.id
                                ? 'circleActive-q4V6m'
                                : 'circleDefault-e8K2t'
                            }`}
                        >
                          {courseLesson.completed ? <CheckCircle size={12} /> : index + 1}
                        </div>
                        <div>
                          <div
                            className={`lessonListTitleText-d3P9b ${courseLesson.id === lesson.id ? 'titleActive-j2Q7l' : 'titleDefault-s5L8r'
                              }`}
                          >
                            {courseLesson.title}
                          </div>
                          <div className="lessonListDuration-f4T6y">{courseLesson.duration}</div>
                        </div>
                      </div>
                      {courseLesson.id === lesson.id && <PlayCircle size={20} color="#3a25ff" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (viewMode === 'courses' && selectedCourse) {
    return <CourseOverview course={selectedCourse} />;
  }
  if (viewMode === 'lessons' && currentLesson && selectedCourse) {
    return <LessonView lesson={currentLesson} course={selectedCourse} />;
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
      setUserData(prevData => ({
        ...prevData,
        coursesEnrolled: (prevData.coursesEnrolled || 0) + 1
      }));

      toast.success("Successfully enrolled in the course!");

      setDropdownOpen(true);
    };
  };

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#f8f7f4',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <nav className="navbar-container2">
        <div className="navbar-logo2">
          <NavLink to="/homepage">
            <img src="src/assets/img/logo2.png" className="logo2" alt="Logo" />
          </NavLink>
        </div>
        <ul className="navbar-links2">
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={20} className="nav-icon2" /> Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`}
            >
              <Briefcase size={20} className="nav-icon2" /> Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ai"
              className={({ isActive }) =>
                `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`
              }
            >
              <MessageSquare size={20} className="nav-icon2" /> Chatbot AI
            </NavLink>
          </li>
        </ul>
        <div className="profile-container">
          <button
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userData?.photoURL ? (
              <img src={userData.photoURL} alt="Profile" className="profile-img" />
            ) : (
              <FaUser size={24} color="#fff" />
            )}
          </button>
          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                {userData?.photoURL ? (
                  <img src={userData.photoURL} alt="Profile" className="profile-pic" />
                ) : (
                  <FaUser size={40} color="#ffffffff" />
                )}
                <h4>Welcome, {userData?.displayName || user?.email?.split('@')[0] || 'User'}!</h4>
              </div>
              <ul>
                <li>
                  <FaBriefcase /> Applied Jobs: <span>{userData?.appliedJobs || 0}</span>
                </li>
                <li>
                  <FaBook /> Courses Taken: <span>{userData?.coursesEnrolled || 0}</span>
                </li>
                <li>
                  <FaBook /> Courses Created: <span>{userData?.coursesCreated || 0}</span>
                </li>
                <li>
                  <FaPencilAlt /> Exercises Done: <span>{userData?.exercisesCompleted || 0}</span>
                </li>
                <li>
                  <FaFileDownload /> Notes Downloaded: <span>{userData?.downloads || 0}</span>
                </li>
                <li>Shared Notes: <span>{userData?.sharedNotes || 0}</span></li>
                <li>
                  <FaFileDownload /> CV Uploads: <span>{(userData as any)?.cvUploads || userData?.appliedJobs || 0}</span>
                </li>
              </ul>
              {userData?.registeredCourses && userData.registeredCourses.length > 0 && (
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h5 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaBook /> My Courses ({userData.registeredCourses.length})
                  </h5>
                  <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {userData.registeredCourses.slice(0, 3).map((course: any, idx: number) => (
                      <div key={idx} style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}>
                        <div style={{
                          fontWeight: 600,
                          color: '#fff',
                          marginBottom: '4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {course.title || 'Untitled Course'}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Clock size={10} /> {course.duration || 'N/A'}
                          {course.progress !== undefined && (
                            <>
                              <span>•</span>
                              <span>{course.progress || 0}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    {userData.registeredCourses.length > 3 && (
                      <div style={{
                        textAlign: 'center',
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.7)',
                        padding: '8px'
                      }}>
                        +{userData.registeredCourses.length - 3} more courses
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="profile-actions">
                <Link to="/profile" className="profile-link">
                  View Profile
                </Link>
                <button className="logout-btn" onClick={() => auth.signOut()}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="divider2"></div>
        <div className="navbar-actions">
          <button className="signOut-button">

            <Link to="/signin">Sign Out</Link>
          </button>
        </div>
      </nav>
      {/* Main Hero Section */}
      <main style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '90px', width: '100%', paddingLeft: '50px', minHeight: '70vh'
      }}>
        <div style={{ flex: 1, maxWidth: '500px', paddingRight: '150px' }}>
          <h1 className='title-courses'>
            Discover Courses That Empower Your Next Chapter
          </h1>
          <p className='para-courses'>
            New School is an Aggregator Multimedia education Materials from around the world.
          </p>
        </div>
        <div className="landing-right-panel">
          <div className="deco-circle circle-1"></div>
          <div className="deco-circle circle-2"></div>
          <div className="deco-circle circle-3"></div>
          <div className="deco-circle circle-4"></div>
          <div className="deco-circle circle-5"></div>
          <div className="deco-circle circle-6"></div>
          <div className="deco-circle circle-7"></div>
          <div className="student-image-grid">
            <div className="student-card card-1">
              <img src='https://i.pinimg.com/736x/3e/58/8d/3e588df028341b0e3962727a7e9f196c.jpg' alt="Student 1" />
            </div>
            <div className="student-card card-2">
              <img src='https://i.pinimg.com/736x/e6/31/e0/e631e0915e5a6e48ab5fd5ccaa1ea241.jpg' alt="Student 2" />
            </div>
            <div className="student-card card-3">
              <img src='https://i.pinimg.com/736x/60/a1/71/60a1719d559469dbb6bfa1b6d0890e5e.jpg' alt="Student 3" />
            </div>
            <div className="student-card card-4">
              <img src='https://i.pinimg.com/736x/b7/e1/89/b7e1890a31f2565cadb80779c7386c2d.jpg' alt="Student 4" />
            </div>
          </div>
        </div>
      </main>
      <h2 className='categories-title'>Our Categories</h2>
      <p className='section-subtitle'>Explore our wide range of categories to meet all your needs.</p>
      <nav style={{
        display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap'
      }}>
        {SECTIONS.map((sec) => (
          <button key={sec.id} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '50px', border: activeSection === sec.id ? '1px solid #3a25ff' : '1px solid #ddd', background: activeSection === sec.id ? 'linear-gradient(135deg, #3a25ff, #5a4bff)' : '#fff', color: activeSection === sec.id ? '#fff' : '#333', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', boxShadow: activeSection === sec.id ? '0 4px 15px rgba(58, 37, 255, 0.3)' : 'none'
          }} onClick={() => setActiveSection(sec.id)}>
            <span style={{ fontSize: '1.1rem' }}>{React.isValidElement(sec.icon) ? sec.icon : null}</span> {sec.title}
          </button>
        ))}
      </nav>
      {userData?.role === 'teacher' && (
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '0 50px'
        }}>

        </div>
      )}
      {userData?.role === 'teacher' && (
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '0 20px'
        }}>

        </div>
      )}
      <div style={{
        backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid #e8e9ea'
      }}>
        {updatedCurrentSection && (
          <>
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                <BookOpen size={20} />
                Courses
              </button>
              <button
                className={`tab-button ${activeTab === 'exercises' ? 'active' : ''}`}
                onClick={() => setActiveTab('exercises')}
              >
                <Award size={20} />
                Exercises
              </button>
              <button
                className={`tab-button ${activeTab === 'sharedNotes' ? 'active' : ''}`}
                onClick={() => setActiveTab('sharedNotes')}
              >
                <Users size={20} />
                Shared Notes
              </button>

            </div>
            {activeTab === 'courses' && (

              <div style={{ padding: '20px' }}> {/* Optional: A main container with padding for the entire page content */}

                <button
                  onClick={() => navigate('/add-course')}
                  style={{
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
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                    // Keeping the hover glow from the previous trendy suggestion
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(58, 37, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <Plus size={20} />
                  Add New Course
                </button>
                <div className="courseGrid-x8R1m">

                  {loadingCourses ? (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '40px',
                      flexDirection: 'column',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #e2e8f0',
                        borderTop: '4px solid #3a25ff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <p style={{ color: '#718096', fontSize: '16px' }}>Loading courses...</p>

                    </div>
                  ) : updatedCurrentSection && updatedCurrentSection.courses.length > 0 ? (
                    <>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #f8fafc, #edf2f7)',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <BookOpen size={24} color="#3a25ff" />
                          <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px' }}>
                            Available Courses ({updatedCurrentSection.courses.length})
                          </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096' }}>
                          <Users size={16} />
                          <span>{firebaseCourses.length} from Firebase</span>
                          {loadingCourses && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#3a25ff',
                              fontSize: '12px'
                            }}>
                              <div style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid #3a25ff',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }}></div>
                              Loading...
                            </div>
                          )}
                          {!loadingCourses && firebaseCourses.length === 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#e53e3e', fontSize: '12px' }}>
                                No Firebase courses found
                              </span>
                              <button
                                onClick={loadFirebaseCourses}
                                style={{
                                  background: '#3a25ff',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '10px',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                🔄 Reload
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {updatedCurrentSection.courses.map((course) => (
                        <div
                          key={course.id}
                          className="courseCard-k4L9b"
                          onClick={() => handleCourseClick(course as any)}
                        >
                          <div className="courseThumbnailContainer-b7C2v">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="courseThumbnailImage-n6Q5t"
                            />
                            <div className="courseOverlay-f5T8n">
                              <button title="btn" className="coursePlayBtn-d9K3y">
                                <Play size={24} fill="#3a25ff" color="#3a25ff" />
                              </button>
                            </div>
                            {course.certificate && (
                              <div className="courseCertificateBadge-h2P7w">
                                <Award size={16} /> Certificate
                              </div>
                            )}
                          </div>
                          <div className="courseContent-v3M6q">
                            <div className="courseHeader-r9X2s">
                              <h3 className="courseTitle-y8D4l">{course.title}</h3>
                              {/* Firebase Course Indicator */}
                              {firebaseCourses.some(fc => fc.id === course.id) && (
                                <div style={{
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  color: 'white',
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: '10px',
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  marginLeft: '8px'
                                }}>
                                  🔥 Firebase
                                </div>
                              )}
                              <div className="courseRatingBox-p1B7f">
                                <Star size={16} fill="#ffc107" color="#ffc107" />
                                <span className="courseRatingValue-f3N1k">{course.rating}</span>
                                <span className="courseStudentCount-t6L8r">
                                  ({formatNumber(course.students)})
                                </span>
                              </div>
                            </div>
                            <p className="courseDescription-n2W4z">{course.description}</p>
                            <div className="courseInstructorBox-c7F1m">
                              <span className="courseInstructorLabel-d3R5x">Instructor:</span>
                              <span className="courseInstructorName-h4N9p">
                                {course.instructor}
                              </span>
                            </div>
                            <div className="courseInfoGroup-s5B8k">
                              <div className="courseInfoItem-j2T3r">
                                <Clock size={14} /> <span>{course.duration}</span>
                              </div>
                              <div className="courseInfoItem-j2T3r">
                                <BookOpen size={14} />{' '}
                                <span>{course.lessons.length} lessons</span>
                              </div>
                              <div className="courseInfoItem-j2T3r">
                                <Users size={14} />{' '}
                                <span>{formatNumber(course.students)} students</span>
                              </div>
                            </div>
                            <div className="courseLevelBox-q9V5e">
                              <span
                                className="courseLevelLabel-m6L1a"
                                style={{ backgroundColor: getLevelColor(course.level) }}
                              >
                                {course.level}
                              </span>
                            </div>
                            <div className="courseFooter-t8W7l">
                              <div className="coursePriceBox-p6C3n">
                                <span className="coursePrice-r4A2j">{course.price}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                                {user && user.uid === course.teacherId && (
                                  <button
                                    className='editcourse2'
                                    onClick={(e) => {
                                      navigate('/add-course')
                                      e.stopPropagation(); 
                                      handleEditClick(course.id);

                                    }}
                                    style={{
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
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#3a25ff'; // Fills color on hover
                                      e.currentTarget.style.color = 'white';
                                      e.currentTarget.style.transform = 'translateY(-2px)';
                                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 37, 255, 0.25)'; // Glow effect
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent';
                                      e.currentTarget.style.color = '#3a25ff';
                                      e.currentTarget.style.transform = 'translateY(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                  >
                                    Edit
                                  </button>
                                )}
                                <button className="courseViewBtn-f7B9q">View Course</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      } </>
                  ) : (
                    <div className="noCoursesBox-c9K4t">
                      <BookOpen size={48} color="#ccc" />
                      <h3 className="noCoursesTitle-x3L1p">No courses available</h3>
                      <p className="noCoursesText-v2N6m">
                        Check back soon for new courses in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === "exercises" && (
              <div className="exercisesContainer_a92hL">
                <button
                  onClick={() => navigate('/addExercises')}
                  style={{
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
                  }}
                  onMouseEnter={(e) => {
                    // Trendy Hover Effect: Lift and subtle scale
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';

                    // Subtle darker grey background for immediate feedback
                    e.currentTarget.style.backgroundColor = '#e9ecef';

                  }}
                  onMouseLeave={(e) => {
                    // Return to initial state
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <Plus size={20} />
                  Add New Exercise
                </button>
                {loadingExercises ? (

                  <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    Loading exercises...
                  </div>
                ) : (
                  // Once loading is complete, combine and display exercises
                  (() => { // Using an IIFE for local variable creation and clearer logic
                    // Combine exercises from updatedCurrentSection (courseData) and Firebase
                    const allExercises: Exercise[] = [
                      ...(updatedCurrentSection?.exercises || []), // Safely add exercises from course data
                      ...(firebaseExercises || [])                // Safely add exercises from Firebase
                    ];
                    if (allExercises.length === 0) {
                      // If no exercises from any source are available after loading
                      return (
                        <div className="noExercisesContainer_b2hPq">

                          <h3 className="noExercisesTitle_z3kWf">No exercises available</h3>
                          <p className="noExercisesText_c7rNs">
                            Check back soon for new exercises in this category.
                          </p>
                          {/* This specific "No Firebase exercise found" prompt is for when the *combined* list is empty
                              AND Firebase was expected but not found */}
                          {!loadingExercise && firebaseExercises.length === 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                              <span style={{ color: '#e53e3e', fontSize: '12px' }}>
                                No Firebase exercise found
                              </span>
                              <button
                                onClick={loadFirebaseExercise}
                                style={{
                                  background: '#3a25ff',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '10px',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                🔄 Reload Firebase
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }
                    // If exercises are available, map and render them
                    return (
                      <>
                        {/* This "No Firebase exercise found" message is for when Firebase exercises are missing
                            BUT other exercises from courseData might still be present.
                            If you only want this message when *all* exercises are missing, remove this block. */}
                        {!loadingExercise && firebaseExercises.length === 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                            <span style={{ color: '#e53e3e', fontSize: '12px' }}>
                              No Firebase exercise found
                            </span>
                            <button
                              onClick={loadFirebaseExercise}
                              style={{
                                background: '#3a25ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '4px 8px',
                                fontSize: '10px',
                                cursor: 'pointer',
                                fontWeight: '600'
                              }}
                            >
                              🔄 Reload
                            </button>
                          </div>
                        )}
                        {/* Map over the combined list of all exercises */}
                        {allExercises.map((exercise: Exercise) => ( // Explicit type for exercise
                          <div key={exercise.id} className="exerciseCard_s73Kx">
                            <div className="exerciseTop_xb7Lp">
                              <div
                                className={`exerciseIcon_wf5Rt ${exercise.completed ? "completed" : "notCompleted"
                                  }`}
                              >
                                {exercise.completed ? "🏆" : "▶️"}
                              </div>
                              <div className="exerciseContent_i9rTb">
                                <div className="exerciseHeader_d4mQp">
                                  <h3 className="exerciseTitle_o8rVz">{exercise.title}</h3>
                                  {firebaseExercises.some(fc => fc.id === exercise.id) && ( // Simplified check
                                    <div style={{
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                      color: 'white',
                                      padding: '4px 8px',
                                      borderRadius: '12px',
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                      marginLeft: '8px'
                                    }}>
                                      🔥 Firebase
                                    </div>
                                  )}
                                  <span
                                    className={`exerciseDifficulty_w8nLo ${exercise.difficulty}`}
                                    style={{
                                      backgroundColor: getDifficultyColor(exercise.difficulty),
                                    }}
                                  >
                                    {exercise.difficulty}
                                  </span>
                                </div>
                                <div className="exerciseDetails_n6yQr">
                                  <span className="exerciseType_m3pDs">{exercise.type}</span>
                                  <div className="exerciseStats_c2eHr">
                                    <div className="exerciseStat_g5kLp">⏱️ {exercise.duration}</div>
                                    <div className="exerciseStat_g5kLp">⭐ {exercise.points} pts</div>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleExpand(exercise.id)}
                                className={`exerciseButton_v4tLs ${exercise.completed ? "completedBtn" : ""
                                  }`}
                              >
                                {exercise.completed
                                  ? "Completed"
                                  : expandedId === exercise.id
                                    ? "Hide"
                                    : "Start Now"}
                              </button>
                            </div>
                            {expandedId === exercise.id && exercise.questions && (
                              <div className="exerciseExpandArea_a7pFt">
                                {exercise.questions.map((q: ExerciseQuestion, idx: number) => (
                                  <div key={idx} className="exerciseQuestion_r2bKp">
                                    <div className="exerciseQuestionText_g1nQo">
                                      {idx + 1}. {q.question}
                                    </div>
                                    {q.options.map((option: string) => (
                                      <label key={option} className="exerciseOption_b3xYn">
                                        <input
                                          type="radio"
                                          name={`exercise-${exercise.id}-q${idx}`}
                                          value={option}
                                          // **CRUCIAL FIX: Added checked and onChange for radio buttons**
                                          checked={
                                            exerciseAnswers[exercise.id]?.[idx] === option
                                          }
                                          onChange={(e) => {
                                            const newAnswers = [...(exerciseAnswers[exercise.id] || [])];
                                            newAnswers[idx] = e.target.value;
                                            setExerciseAnswers((prev) => ({
                                              ...prev,
                                              [exercise.id]: newAnswers,
                                            }));
                                          }}
                                        />
                                        {option}
                                      </label>
                                    ))}
                                  </div>
                                ))}
                                <button
                                  className="exerciseSubmit_k7sUi"
                                  onClick={() => {
                                    const answers: string[] = exerciseAnswers[exercise.id] || []; // Explicit type
                                    let correctCount = 0;
                                    if (exercise.questions?.length) {
                                      exercise.questions.forEach((q: ExerciseQuestion, idx: number) => {
                                        const selected = String(answers[idx] || "").trim().toLowerCase();
                                        const correct = String(q.correctAnswer || "").trim().toLowerCase();
                                        if (selected === correct) {
                                          correctCount++;
                                        }
                                      });
                                      setExerciseAnswers((prev) => ({
                                        ...prev,
                                        [`${exercise.id}_result`]: `You got ${correctCount} out of ${exercise.questions?.length || 0} correct!`,
                                      }));
                                    } else {
                                      setExerciseAnswers((prev) => ({
                                        ...prev,
                                        [`${exercise.id}_result`]: "No questions to check.",
                                      }));
                                    }
                                  }}
                                >
                                  Submit
                                </button>
                                {exerciseAnswers[`${exercise.id}_result`] && (
                                  <div className="exerciseResult_j9uQo">
                                    {exerciseAnswers[`${exercise.id}_result`]}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    );
                  })()
                )}
              </div>
            )}
            {activeTab === 'sharedNotes' && (
              <div className="sharedNotesWrapper_x91">
                <h2 className="sharedNotesTitle_x91">
                  <Users size={40} style={{ marginRight: '1rem', color: '#1201b1ff' }} />
                  Collaborative Learning Board
                </h2>
                <p className="sharedNotesDesc_x91">
                  Welcome to the Study Materials Exchange! Here, students upload, download, and rate collective notes. Let's learn together!
                </p>
                <div className="sharedNotesBtnWrap_x91">
                  <button onClick={handleButtonClick} className="sharedNotesButton_x91">
                    <FileText size={20} style={{ marginRight: '8px' }} />
                    Share Your Notes
                  </button>
                </div>
                <div className="sharedNotesGrid_x92">
                  {updatedCurrentSection && updatedCurrentSection.sharedNotes && updatedCurrentSection.sharedNotes.length > 0 ? (
                    updatedCurrentSection.sharedNotes.map((note) => (
                      <div key={note.id} className="noteCard_x92">
                        <div className="noteTape_x92"></div>
                        <div>
                          <div className="noteHeader_x92">
                            <div className="noteAuthorBox_x92">
                              <img
                                src={userData?.photoURL || 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg'}
                                alt={note.author || 'Anonymous'}
                                className="noteAuthorImg_x92"
                              />
                              <span className="noteAuthorName_x92">by {note.author || 'Unknown'}</span>
                            </div>
                            <div className="noteCardFileType_x93">
                              <FileText size={16} />
                              {note.fileType || 'Doc'}
                            </div>
                            <h3 className="noteCardTitle_x93">
                              {note.title || 'Untitled Note'}
                            </h3>

                            <div className="noteCardStats_x93">
                              <div className="noteCardStatsStars_x93">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    size={18}
                                    fill={i < Math.floor(note.rating || 0) ? '#3a25ff' : 'none'}
                                    stroke={i < Math.floor(note.rating || 0) ? '#3a25ff' : '#d2d2d2'}
                                  />
                                ))}
                                <span>({(note.rating || 0).toFixed(1)})</span>
                              </div>
                              <div className="noteCardStatsNumbers_x93">
                                <Download size={17} />
                                {formatNumber(note.downloads)}
                              </div>
                              <div className="noteCardStatsNumbers_x93">
                                <Eye size={17} />
                                {formatNumber(note.views)}
                              </div>
                            </div>
                            <p className="notePreview_f7g">
                              {note.preview || 'No preview available for this note. Download to view full content.'}
                            </p>
                            <div className="noteAdditional_f7g">
                              <div className="noteFeatureLeft_f7g">
                                <div className="noteFeatureItem_f7g">
                                  <Calendar size={16} />
                                  <span>Uploaded: {note.uploadDate || 'N/A'}</span>
                                </div>
                                <div className="noteFeatureItem_f7g">
                                  <Tag size={16} />
                                  <span>Tags: {(note.tags && note.tags.join(', ')) || 'General'}</span>
                                </div>
                              </div>
                              <div className="noteFeatureRight_f7g">
                                <div className="noteFeatureRightItem_f7g">
                                  <FileText size={16} />
                                  {note.size || 'Unknown Size'}
                                </div>
                                <div className="noteFeatureRightItem_f7g">
                                  <MessageSquare size={16} />
                                  <span>{formatNumber(note.comments || 0)} Comments</span>
                                </div>
                              </div>
                            </div>

                            <button className="noteDownloadButton_f9x">
                              {(note.fileUrl || fileURL) ? (
                                <button
                                  className="noteDownloadButton_f9x"
                                  type="button"
                                  onClick={(e) => {
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
                                      setSharedNotes(prev =>
                                        prev.map(n => (n.id === note.id ? { ...n, downloads: (n.downloads || 0) + 1 } : n))
                                      );
                                    } catch (err) {
                                      console.error('Download failed:', err);
                                      // fallback to existing handler if any side-effects are needed
                                      handleDownload(note);
                                    }
                                  }}
                                >
                                  <Download size={18} style={{ marginRight: '8px' }} /> Download
                                </button>
                              ) : (
                                <button
                                  className="noteDownloadButton_f9x"
                                  type="button"
                                  disabled
                                  title="No file uploaded"
                                >
                                  <Download size={18} style={{ marginRight: '8px' }} /> Download
                                </button>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notesEmptyMessage_f9x">
                      <Users size={60} color="#c5d9e5" className="notesEmptyMessageIcon_f9x" />
                      <h3 className="notesEmptyMessageTitle_f9x">No notes on the board yet!</h3>
                      <p className="notesEmptyMessageText_f9x">
                        Be the first to upload your study materials or check back soon for notes shared by the community.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {showForm && (
              <div className="notesFormOverlay_f9x">
                <form onSubmit={handleSubmit} className="notesFormContainer_f9x">
                  <h3 className="notesFormTitle_f9x">Share Your Study Notes</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="notesFormInput_f9x"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="notesFormInput_f9x"
                  />
                  <div>
                    <input
                      type="text"
                      name="noteTitle"
                      placeholder="Title of your note/course"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...(prev as any), title: e.target.value }))
                      }
                      required
                      className="notesFormInput_f9x"
                    />

                    <label htmlFor="noteCategory" style={{ display: 'block', marginTop: '8px', marginBottom: '6px', fontSize: '13px', color: '#444' }}>
                      Choose Category
                    </label>
                    <select
                      id="noteCategory"
                      name="course"
                      value={(formData as any).course || activeSection}
                      onChange={(e) => {
                        const val = e.target.value;
                        // persist chosen category into formData so submit handler uses it
                        setFormData((prev) => ({ ...(prev as any), course: val }));
                        // reflect selection in UI so shared note shows under chosen category immediately
                        setActiveSection(val);
                      }}
                      required
                      className="notesFormInput_f9x"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px' }}
                    >
                      {SECTIONS.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {sec.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    name="message"
                    placeholder="Describe your notes or add details..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="notesFormTextarea_f9x"
                    style={{
                      overflowY: 'auto',  // Adds the vertical scrollbar when needed
                      resize: 'none'      // Optional: Prevents the user from resizing the box manually
                    }}
                  />
                  <input type="file" onChange={handleUpload} />
                  <div className="notesFormActions_f9x">
                    <button type="button" onClick={() => setShowForm(false)} className="notesFormCancelButton_f9x">
                      Cancel
                    </button>
                    <button type="submit" className="notesFormSubmitButton_f9x">
                      Share Notes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Courses;
