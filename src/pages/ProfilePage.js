var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { User, Briefcase, GraduationCap, Camera, Edit3, Share2, Plus, CheckCircle, Clock, X, Award, Users, Mail, MapPin, Phone, TrendingUp, BookOpen, Save, AlertCircle, Eye, BarChart3, Upload, Copy } from 'lucide-react';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService } from '../firebase/src/firebaseServices';
import { FaUser, } from 'react-icons/fa';
const formatDate = (date) => {
    if (!date)
        return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const LoadingSpinner = () => (_jsxs("div", { style: styles.loadingContainer, children: [_jsxs("div", { style: styles.spinnerWrapper, children: [_jsx("div", { style: styles.spinner }), _jsx("div", { style: styles.spinnerInner })] }), _jsx("p", { style: styles.loadingText, children: "Loading your profile..." })] }));
const StatCard = ({ icon, title, value, change, color }) => (_jsxs("div", { style: Object.assign(Object.assign({}, styles.statCard), { boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }), children: [_jsxs("div", { style: styles.statContent, children: [_jsx("h3", { style: styles.statTitle, children: title }), _jsx("p", { style: styles.statValue, children: value.toLocaleString() }), change && (_jsxs("div", { style: styles.change, children: [_jsx(TrendingUp, { size: 14, style: { color: '#10b981' } }), _jsxs("span", { style: styles.changeText, children: ["+", change, "%"] })] }))] }), _jsx("div", { style: Object.assign(Object.assign({}, styles.iconBox), { background: color || '#3b82f6' }), children: icon })] }));
const SkillTag = ({ skill, level, onRemove, isEditing }) => (_jsx("div", { style: styles.skillTagWrapper, children: _jsxs("span", { style: Object.assign(Object.assign({}, styles.skillTag), { background: level === 'Expert' ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                level === 'Advanced' ? 'linear-gradient(90deg, #10b981, #059669)' :
                    level === 'Intermediate' ? 'linear-gradient(90deg, #3b82f6, #2563eb)' :
                        'linear-gradient(90deg, #6b7280, #4b5563)' }), children: [skill, _jsx("span", { style: styles.skillLevel, children: level }), isEditing && onRemove && (_jsx("button", { onClick: (e) => { e.stopPropagation(); onRemove(); }, style: styles.removeBtn, title: 'btn', children: _jsx(X, { size: 12 }) }))] }) }));
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { style: styles.modalOverlay, children: _jsxs("div", { style: Object.assign(Object.assign({}, styles.modal), { width: size === 'lg' ? '90%' : size === 'sm' ? '60%' : '75%', maxWidth: size === 'lg' ? 800 : size === 'sm' ? 400 : 600 }), children: [_jsxs("div", { style: styles.modalHeader, children: [_jsx("h3", { style: styles.modalTitle, children: title }), _jsx("button", { onClick: onClose, style: styles.closeBtn, title: 'btn', children: _jsx(X, { size: 24 }) })] }), _jsx("div", { style: styles.modalBody, children: children })] }) }));
};
const ProfileStrengthIndicator = ({ strength }) => (_jsxs("div", { style: styles.strengthContainer, children: [_jsxs("div", { style: styles.strengthHeader, children: [_jsx("span", { style: styles.strengthLabel, children: "Profile Strength" }), _jsxs("span", { style: styles.strengthValue, children: [strength, "%"] })] }), _jsx("div", { style: styles.strengthBar, children: _jsx("div", { style: Object.assign(Object.assign({}, styles.strengthFill), { width: `${strength}%`, background: strength >= 80 ? '#10b981' : strength >= 60 ? '#f59e0b' : '#ef4444' }) }) }), _jsx("p", { style: styles.strengthTip, children: strength < 60 ? 'Add more skills and experience to improve your profile' :
                strength < 80 ? 'Great! Add certifications to reach 100%' :
                    'Excellent profile! You\'re all set' })] }));
function ProfilePage() {
    var _a;
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editData, setEditData] = useState({});
    const [showAddSkillModal, setShowAddSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [skillLevel, setSkillLevel] = useState('Beginner');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [user] = useAuthState(auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        const loadUserData = () => __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                setUserData(null);
                setEnrolledCourses([]);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // ✅ تحديث الإحصائيات بناءً على البيانات الحقيقية
                yield UserService.updateUserStats(user.uid);
                const userRef = doc(db, 'users', user.uid);
                const userSnap = yield getDoc(userRef);
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setUserData(Object.assign(Object.assign({}, data), { uid: user.uid }));
                    setEditData(Object.assign({}, data));
                    // تحميل الكورسات المسجلة
                    setEnrolledCourses(data.registeredCourses || []);
                    setError(null);
                }
                else {
                    setError("User not found");
                }
            }
            catch (err) {
                console.error("Error loading profile:", err);
                setError("Failed to load profile");
            }
            finally {
                setLoading(false);
            }
        });
        loadUserData();
    }, [user]);
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        if (!userData || !editData)
            return;
        try {
            const userRef = doc(db, 'users', userData.uid);
            yield updateDoc(userRef, editData);
            setUserData(Object.assign(Object.assign({}, userData), editData));
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(null), 3000);
        }
        catch (err) {
            setError('Failed to save changes');
        }
    });
    const handleImageUpload = (file) => __awaiter(this, void 0, void 0, function* () {
        const reader = new FileReader();
        reader.onload = () => {
            setUserData(prev => prev ? Object.assign(Object.assign({}, prev), { photoURL: reader.result }) : null);
            setShowUploadModal(false);
            setSuccess('Profile picture updated!');
            setTimeout(() => setSuccess(null), 3000);
        };
        reader.readAsDataURL(file);
    });
    const handleAddSkill = () => {
        if (!userData || !newSkill.trim())
            return;
        const updatedSkills = [...(userData.skills || []), newSkill.trim()];
        setUserData(Object.assign(Object.assign({}, userData), { skills: updatedSkills }));
        setNewSkill('');
        setShowAddSkillModal(false);
        setSuccess('Skill added successfully!');
        setTimeout(() => setSuccess(null), 3000);
    };
    const handleRemoveSkill = (skill) => {
        var _a;
        const updatedSkills = ((_a = userData === null || userData === void 0 ? void 0 : userData.skills) === null || _a === void 0 ? void 0 : _a.filter(s => s !== skill)) || [];
        setUserData(Object.assign(Object.assign({}, userData), { skills: updatedSkills }));
        setSuccess('Skill removed!');
        setTimeout(() => setSuccess(null), 3000);
    };
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setSuccess('Profile link copied to clipboard!');
        setTimeout(() => setSuccess(null), 3000);
        setShowShareModal(false);
    };
    const [appliedJobsList, setAppliedJobsList] = useState([]);
    useEffect(() => {
        if (!userData || !user)
            return;
        const fetchAppliedJobs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // ✅ جلب الطلبات الحقيقية التي قدم عليها المستخدم
                const applicationsQuery = query(collection(db, 'applications'), where('userId', '==', user.uid));
                const applicationsSnapshot = yield getDocs(applicationsQuery);
                if (applicationsSnapshot.empty) {
                    setAppliedJobsList([]);
                    return;
                }
                // ✅ جلب معلومات الوظائف من collection jobs
                const jobIds = applicationsSnapshot.docs.map(doc => doc.data().jobId).filter(Boolean);
                const jobsData = [];
                for (const jobId of jobIds) {
                    try {
                        const jobDoc = yield getDoc(doc(db, 'jobs', jobId));
                        if (jobDoc.exists()) {
                            const jobData = jobDoc.data();
                            const application = applicationsSnapshot.docs.find(app => app.data().jobId === jobId);
                            const appliedAt = application === null || application === void 0 ? void 0 : application.data().appliedAt;
                            jobsData.push({
                                id: jobDoc.id,
                                title: jobData.title || 'Unknown Job',
                                company: jobData.company || jobData.posterName || 'Unknown Company',
                                location: jobData.location || 'Not specified',
                                salary: jobData.salary || 'Not specified',
                                tech: jobData.tech || '',
                                type: jobData.type || 'full-time',
                                remote: jobData.remote || 'No',
                                timestamp: appliedAt || new Date(),
                            });
                        }
                    }
                    catch (error) {
                        console.error(`Error fetching job ${jobId}:`, error);
                    }
                }
                jobsData.sort((a, b) => {
                    var _a, _b;
                    const dateA = ((_a = a.timestamp) === null || _a === void 0 ? void 0 : _a.toDate) ? a.timestamp.toDate() : new Date(a.timestamp);
                    const dateB = ((_b = b.timestamp) === null || _b === void 0 ? void 0 : _b.toDate) ? b.timestamp.toDate() : new Date(b.timestamp);
                    return dateB.getTime() - dateA.getTime();
                });
                setAppliedJobsList(jobsData);
            }
            catch (error) {
                console.error('Error fetching applied jobs:', error);
                setAppliedJobsList([]);
            }
        });
        fetchAppliedJobs();
    }, [userData, user]);
    if (loading)
        return _jsx(LoadingSpinner, {});
    if (!user) {
        return (_jsx("div", { style: styles.container, children: _jsxs("div", { style: styles.center, children: [_jsx("h2", { children: "Please log in to view profile" }), _jsx("p", { children: "You need to be logged in to access your profile page." }), _jsx(Link, { to: "/signin", style: {
                            display: 'inline-block',
                            marginTop: '20px',
                            padding: '12px 24px',
                            background: '#3a25ff',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 600
                        }, children: "Go to Sign In" })] }) }));
    }
    if (!userData) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { style: styles.container, children: [_jsxs("nav", { className: "navbar-container2", children: [_jsx("div", { className: "navbar-logo2", children: _jsx("img", { src: "src/assets/img/logo2.png", className: "logo2", alt: "Logo" }) }), _jsxs("ul", { className: "navbar-links2", children: [_jsx("li", { children: _jsxs(NavLink, { to: "/courses", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(BookOpen, { size: 20, className: "nav-icon2" }), " Course"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/jobs", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(Briefcase, { size: 20, className: "nav-icon2" }), " Jobs"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/ai", className: ({ isActive }) => `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`, children: [_jsx(MessageSquare, { size: 20, className: "nav-icon2" }), " Chatbot AI"] }) })] }), _jsx("div", { className: "profile-container", children: _jsx("button", { className: "profile-btn", onClick: () => setDropdownOpen(!dropdownOpen), children: (userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-img" })) : (_jsx(FaUser, { size: 24, color: "#fff" })) }) }), _jsx("div", { className: "divider2" }), _jsxs("div", { className: "navbar-actions", children: [_jsx("button", { className: "login-button", children: "Log In" }), _jsx("button", { className: "signup-button", children: "Sign Up" })] })] }), success && (_jsxs("div", { style: Object.assign(Object.assign({}, styles.alert), { background: '#10b981' }), children: [_jsx(CheckCircle, { size: 16 }), " ", success] })), error && (_jsxs("div", { style: Object.assign(Object.assign({}, styles.alert), { background: '#ef4444' }), children: [_jsx(AlertCircle, { size: 16 }), " ", error] })), _jsx("div", { style: styles.hero, children: _jsx("div", { style: styles.heroContent, children: _jsxs("div", { style: styles.profileHeader, children: [_jsxs("div", { style: styles.profileImageWrapper, children: [_jsx("img", { src: userData.photoURL || 'https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg', alt: "Profile", style: styles.profileImage }), _jsx("button", { onClick: () => setShowUploadModal(true), style: styles.cameraBtn, title: 'btn', children: _jsx(Camera, { size: 16 }) })] }), _jsx("div", { style: styles.profileInfo, children: _jsxs("div", { style: styles.nameSection, children: [_jsx("h1", { style: styles.name, children: (userData === null || userData === void 0 ? void 0 : userData.displayName) || 'User' }), _jsx("p", { style: styles.title, children: (userData === null || userData === void 0 ? void 0 : userData.company) || '' }), _jsxs("div", { style: styles.stats, children: [_jsxs("span", { children: [_jsx(Users, { size: 14 }), " ", userData.connections || 0, " connections"] }), _jsxs("span", { children: [_jsx(Eye, { size: 14 }), " ", appliedJobsList.length || userData.appliedJobs || 0, " applications"] })] }), _jsx(ProfileStrengthIndicator, { strength: appliedJobsList.length > 0 ? Math.min(100, appliedJobsList.length * 10) : ((userData === null || userData === void 0 ? void 0 : userData.appliedJobs) ? Math.min(100, userData.appliedJobs * 5) : 0) })] }) }), _jsx("div", { style: styles.actions, children: _jsx("div", { style: styles.primaryActions, children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: handleSave, style: styles.saveBtn, children: [_jsx(Save, { size: 16 }), " Save Changes"] }), _jsxs("button", { onClick: () => setIsEditing(false), style: styles.cancelBtn, children: [_jsx(X, { size: 16 }), " Cancel"] })] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => setIsEditing(true), style: styles.editBtn, children: [_jsx(Edit3, { size: 16 }), " Edit Profile"] }), _jsxs("button", { onClick: () => setShowShareModal(true), style: styles.shareBtn, children: [_jsx(Share2, { size: 16 }), " Share"] })] })) }) })] }) }) }), _jsxs("div", { style: styles.main, children: [_jsxs("div", { style: styles.statsGrid, children: [_jsx(StatCard, { icon: _jsx(Briefcase, { size: 32, color: "white" }), title: "Applications", value: appliedJobsList.length, change: appliedJobsList.length > 0 ? "100" : "0", color: " #3b82f6" }), _jsx(StatCard, { icon: _jsx(GraduationCap, { size: 32, color: "white" }), title: "Courses Enrolled", value: userData.coursesEnrolled || enrolledCourses.length || 0, change: enrolledCourses.length > 0 ? "100" : "0", color: "#10b981" }), _jsx(StatCard, { icon: _jsx(CheckCircle, { size: 32, color: "white" }), title: "CV Uploads", value: (userData === null || userData === void 0 ? void 0 : userData.cvUploads) || appliedJobsList.length || 0, change: (userData === null || userData === void 0 ? void 0 : userData.cvUploads) || appliedJobsList.length ? "100" : "0", color: " #8b5cf6" })] }), _jsx("div", { style: styles.tabsContainer, children: _jsx("div", { style: styles.tabs, children: [
                                { key: 'overview', label: 'Overview', icon: _jsx(User, { size: 16 }) },
                                { key: 'courses', label: 'My Courses', icon: _jsx(BookOpen, { size: 16 }) },
                                { key: 'jobs', label: 'Jobs', icon: _jsx(Briefcase, { size: 16 }) },
                                { key: 'skills', label: 'Skills', icon: _jsx(Award, { size: 16 }) },
                            ].map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.key), style: Object.assign(Object.assign({}, styles.tab), (activeTab === tab.key ? styles.activeTab : styles.inactiveTab)), children: [tab.icon, " ", tab.label] }, tab.key))) }) }), _jsxs("div", { style: styles.tabContent, children: [activeTab === 'overview' && (_jsxs("div", { style: styles.overviewGrid, children: [_jsxs("div", { style: styles.overviewLeft, children: [_jsxs("div", { style: styles.contactSection, children: [_jsx("h2", { style: styles.sectionTitle, children: "Contact Information" }), _jsxs("div", { style: styles.contactGrid, children: [_jsxs("div", { style: styles.contactItem, children: [_jsx(Mail, { size: 20, style: { color: '#3b82f6' } }), _jsxs("div", { children: [_jsx("span", { style: styles.contactLabel, children: "Email" }), _jsx("span", { style: styles.contactValue, children: userData.email })] })] }), _jsxs("div", { style: styles.contactItem, children: [_jsx(Phone, { size: 20, style: { color: '#10b981' } }), _jsxs("div", { children: [_jsx("span", { style: styles.contactLabel, children: "Phone" }), _jsx("span", { style: styles.contactValue, children: userData.phone || 'Not available' })] })] })] })] }), _jsxs("div", { style: styles.bioSection, children: [_jsx("h3", { style: styles.sectionTitle, children: "About Me" }), isEditing ? (_jsx("textarea", { value: editData.bio || '', onChange: (e) => setEditData(Object.assign(Object.assign({}, editData), { bio: e.target.value })), style: styles.textarea, placeholder: "Tell us about yourself..." })) : (_jsx("p", { style: styles.bioText, children: userData.bio || 'No bio added yet.' }))] })] }), _jsx("div", { style: styles.overviewRight, children: _jsx("div", { style: styles.quickStats, children: _jsx("div", { style: styles.quickStatsGrid, children: _jsxs("div", { style: styles.quickStat, children: [_jsx("h3", { style: styles.sectionTitle, children: "Quick Stats" }), _jsx(BarChart3, { size: 24, color: "#3b82f6" }), _jsxs("div", { children: [_jsx("p", { style: styles.quickStatValue, children: appliedJobsList.length }), _jsx("p", { style: styles.quickStatLabel, children: "Applications" })] })] }) }) }) })] })), activeTab === 'courses' && (_jsxs("div", { children: [_jsxs("div", { style: styles.sectionHeader, children: [_jsx("h2", { style: styles.sectionTitle, children: "My Enrolled Courses" }), _jsx("p", { style: styles.sectionSubtitle, children: "Continue your learning journey" })] }), enrolledCourses.length > 0 ? (_jsx("div", { style: styles.coursesGrid, children: enrolledCourses.map((course, i) => (_jsxs("div", { style: styles.courseCard, children: [_jsxs("div", { style: styles.courseImageWrapper, children: [_jsx("img", { src: course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center', alt: course.title, style: styles.courseImage }), course.certificate && (_jsxs("div", { style: styles.certificateBadge, children: [_jsx(Award, { size: 12 }), " Certificate"] }))] }), _jsxs("div", { style: styles.courseContent, children: [_jsx("h3", { style: styles.courseTitle, children: course.title }), _jsxs("div", { style: styles.courseMeta, children: [_jsxs("div", { style: styles.courseMetaItem, children: [_jsx(Clock, { size: 12 }), _jsx("span", { children: course.duration || 'N/A' })] }), _jsxs("div", { style: styles.courseMetaItem, children: [_jsx(User, { size: 12 }), _jsx("span", { style: { fontSize: '12px' }, children: course.instructor || 'Unknown' })] }), _jsx("div", { style: styles.courseMetaItem, children: _jsx("span", { style: Object.assign(Object.assign({}, styles.levelBadge), { background: course.level === 'Beginner' ? '#28a745' :
                                                                                course.level === 'Intermediate' ? '#ffc107' :
                                                                                    course.level === 'Advanced' ? '#dc3545' : '#6c757d', fontSize: '10px', padding: '3px 8px' }), children: course.level || 'Beginner' }) })] }), _jsxs("div", { style: styles.courseFooter, children: [_jsx("span", { style: styles.coursePrice, children: course.price || 'Free' }), _jsx(Link, { to: `/courses`, style: styles.viewCourseBtn, children: "View" })] }), course.progress !== undefined && course.progress > 0 && (_jsxs("div", { style: styles.progressBar, children: [_jsx("div", { style: styles.progressLabel, children: _jsxs("span", { style: { fontSize: '11px' }, children: ["Progress: ", course.progress || 0, "%"] }) }), _jsx("div", { style: styles.progressBarBg, children: _jsx("div", { style: Object.assign(Object.assign({}, styles.progressBarFill), { width: `${course.progress || 0}%` }) }) })] }))] })] }, i))) })) : (_jsxs("div", { style: styles.emptyState, children: [_jsx(BookOpen, { size: 48, color: "#d1d5db" }), _jsx("h3", { style: styles.emptyTitle, children: "No enrolled courses yet" }), _jsx("p", { style: styles.emptyDescription, children: "Start learning by enrolling in courses from the Courses page" }), _jsx(Link, { to: "/courses", style: styles.browseCoursesBtn, children: "Browse Courses" })] }))] })), activeTab === 'jobs' && (_jsxs("div", { children: [_jsxs("div", { style: styles.sectionHeader, children: [_jsx("h2", { style: styles.sectionTitle, children: "Job Applications" }), _jsx("p", { style: styles.sectionSubtitle, children: "Track your career opportunities" })] }), appliedJobsList.length > 0 ? (_jsx("div", { style: styles.jobsGrid, children: appliedJobsList.map((job, i) => (_jsxs("div", { style: styles.jobCard, children: [_jsxs("div", { style: styles.jobHeader, children: [_jsxs("div", { style: styles.jobInfo, children: [_jsx("h3", { style: styles.jobTitle, children: job.title }), _jsx("p", { style: styles.jobCompany, children: job.company }), _jsxs("p", { style: styles.jobLocation, children: [_jsx(MapPin, { size: 14 }), " ", job.location] })] }), _jsxs("div", { style: styles.jobMeta, children: [_jsx("span", { style: styles.jobSalary, children: job.salary }), _jsx("span", { style: styles.jobType, children: job.type })] })] }), _jsxs("div", { style: styles.jobFooter, children: [_jsx("span", { style: styles.jobStatus, children: "Applied" }), _jsxs("span", { style: styles.jobDate, children: ["Applied ", formatDate(job.timestamp)] })] })] }, i))) })) : (_jsxs("div", { style: styles.emptyState, children: [_jsx(Briefcase, { size: 48, color: "#d1d5db" }), _jsx("h3", { style: styles.emptyTitle, children: "No jobs found" })] }))] })), activeTab === 'skills' && (_jsxs("div", { children: [_jsxs("div", { style: styles.sectionHeader, children: [_jsx("h2", { style: styles.sectionTitle, children: "Skills & Expertise" }), _jsx("p", { style: styles.sectionSubtitle, children: "Showcase your technical abilities" }), _jsxs("button", { onClick: () => setShowAddSkillModal(true), style: styles.addBtn, children: [_jsx(Plus, { size: 16 }), " Add Skill"] })] }), _jsx("div", { style: styles.skillsGrid, children: _jsx("div", { style: styles.skillsContainer, children: (_a = userData.skills) === null || _a === void 0 ? void 0 : _a.map((skill, i) => (_jsx(SkillTag, { skill: skill, level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)], onRemove: () => handleRemoveSkill(skill), isEditing: isEditing }, i))) }) })] }))] })] }), _jsx(Modal, { isOpen: showUploadModal, onClose: () => setShowUploadModal(false), title: "Update Profile Picture", children: _jsxs("div", { style: styles.uploadArea, children: [_jsx("div", { style: styles.uploadIcon, children: _jsx(Upload, { size: 48, color: "#3b82f6" }) }), _jsx("p", { style: styles.uploadText, children: "Choose a new profile picture" }), _jsx("input", { title: 'inpt', type: "file", accept: "image/*", onChange: (e) => {
                                var _a;
                                const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (file)
                                    handleImageUpload(file);
                            }, style: styles.fileInput })] }) }), _jsx(Modal, { isOpen: showShareModal, onClose: () => setShowShareModal(false), title: "Share Profile", children: _jsxs("div", { style: styles.shareContent, children: [_jsx("p", { style: styles.shareText, children: "Share your profile with others" }), _jsxs("div", { style: styles.shareUrl, children: [_jsx("input", { type: "text", value: window.location.href, readOnly: true, style: styles.shareInput }), _jsxs("button", { onClick: handleShare, style: styles.copyBtn, children: [_jsx(Copy, { size: 16 }), " Copy"] })] })] }) }), _jsx(Modal, { isOpen: showAddSkillModal, onClose: () => setShowAddSkillModal(false), title: "Add New Skill", children: _jsxs("div", { style: styles.addSkillForm, children: [_jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.formLabel, children: "Skill Name" }), _jsx("input", { type: "text", placeholder: "e.g., React, Python", value: newSkill, onChange: (e) => setNewSkill(e.target.value), style: styles.formInput })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.formLabel, children: "Proficiency Level" }), _jsxs("select", { value: skillLevel, onChange: (e) => setSkillLevel(e.target.value), style: styles.formSelect, children: [_jsx("option", { value: "Beginner", children: "Beginner" }), _jsx("option", { value: "Intermediate", children: "Intermediate" }), _jsx("option", { value: "Advanced", children: "Advanced" }), _jsx("option", { value: "Expert", children: "Expert" })] })] }), _jsxs("div", { style: styles.modalActions, children: [_jsx("button", { onClick: () => setShowAddSkillModal(false), style: styles.cancelBtn, children: "Cancel" }), _jsxs("button", { onClick: handleAddSkill, style: styles.saveBtn, children: [_jsx(Plus, { size: 16 }), " Add Skill"] })] })] }) })] }));
}
export default ProfilePage;
// Styles
const styles = {
    container: {
        fontFamily: "'Inter', sans-serif",
        background: 'white',
        minHeight: '100vh',
        position: 'relative'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #fbfbfbff, #ffffffff)'
    },
    spinnerWrapper: {
        position: 'relative',
        width: 60,
        height: 60
    },
    spinner: {
        width: 60,
        height: 60,
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3a25ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        position: 'absolute'
    },
    spinnerInner: {
        width: 40,
        height: 40,
        border: '3px solid transparent',
        borderTop: '3px solid #3a25ff',
        borderRadius: '50%',
        animation: 'spin 1.5s linear infinite reverse',
        position: 'absolute',
        top: 10,
        left: 10
    },
    loadingText: {
        marginTop: 80,
        color: '#4b5563',
        fontWeight: 600,
        fontSize: 18
    },
    center: {
        textAlign: 'center',
        padding: 60,
        color: '#6b7280',
        fontSize: 18,
        fontWeight: 500
    },
    alert: {
        position: 'fixed',
        top: 20,
        right: 20,
        padding: '16px 24px',
        color: 'white',
        borderRadius: 12,
        zIndex: 1000,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.25)',
    },
    hero: {
        background: 'linear-gradient(135deg, #f3f4f9ff 0%, #ffffffff 30%, #ffffffff 70%, #ffffffff 100%)',
        color: 'black',
        top: '100px',
        padding: '80px 20px',
        borderRadius: '0 0 40px 40px',
        position: 'relative',
        overflow: 'hidden'
    },
    heroContent: {
        maxWidth: 1400,
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
    },
    profileHeader: {
        display: 'flex',
        gap: 30,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    profileImageWrapper: {
        position: 'relative',
        flexShrink: 0,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid #fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15), 0 0 0 6px rgba(255,255,255,0.5)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    profileImageHover: {
        transform: "scale(1.03)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25), 0 0 0 8px rgba(59,130,246,0.25)",
    },
    cameraBtn: {
        position: "absolute",
        bottom: 8,
        right: 8,
        background: "linear-gradient(135deg, #3a25ff, #3a25ff)",
        color: "white",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "3px solid white",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    },
    cameraBtnHover: {
        transform: "scale(1.1)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
    },
    profileInfo: {
        flex: 1,
        minWidth: 300,
        padding: "0.5rem",
    },
    nameSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    name: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: "2.7rem",
        fontWeight: 700,
        color: "#2d2e32",
        letterSpacing: "0.5px",
        lineHeight: 1.3,
        margin: 0,
    },
    subtitle: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: "1rem",
        fontWeight: 500,
        color: "#6b7280",
        marginTop: 4,
    },
    status: {
        fontSize: 14,
        fontWeight: 500,
        color: "#22c55e", // green like "Premium User"
        marginTop: 2,
    },
    statsRow: {
        display: "flex",
        gap: 20,
        marginTop: 12,
        fontSize: 14,
        color: "#374151",
    },
    statItem: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(255,255,255,0.6)",
        padding: "6px 12px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        backdropFilter: "blur(6px)",
        transition: "transform 0.2s ease",
    },
    statItemHover: {
        transform: "translateY(-2px)",
    },
    title: {
        fontSize: 20,
        opacity: 0.95,
        margin: '8px 0',
        fontWeight: 600
    },
    stats: {
        display: 'flex',
        gap: 24,
        marginBottom: 20,
        fontSize: 14,
        flexWrap: 'wrap'
    },
    strengthContainer: {
        background: 'rgba(228, 228, 228, 0.15)',
        padding: 16,
        borderRadius: 12,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
    },
    strengthHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    strengthLabel: {
        fontSize: 14,
        opacity: 0.9
    },
    strengthValue: {
        fontSize: 18,
        fontWeight: 700
    },
    strengthBar: {
        height: 8,
        background: 'rgba(181, 176, 176, 0.2)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
        boxShadow: "0 0px 2px rgba(0,0,0,0.08)",
    },
    strengthFill: {
        height: '100%',
        borderRadius: 4,
        transition: 'width 0.5s ease'
    },
    strengthTip: {
        fontSize: 12,
        opacity: 0.8,
        margin: 0
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-end'
    },
    primaryActions: {
        display: 'flex',
        gap: 12
    },
    editBtn: {
        padding: '15px 24px',
        background: '#3a25ff', // filled color
        color: 'white', // text color
        border: '2px solid #f5f6f9ff', // border matches background
        borderRadius: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        transition: 'all 0.3s ease',
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
    },
    shareBtn: {
        padding: '12px 24px',
        background: 'white',
        color: '#3a25ff',
        border: '2px solid #3a25ff',
        borderRadius: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    saveBtn: {
        padding: '12px 24px',
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(184, 185, 184, 0.3)'
    },
    cancelBtn: {
        padding: '15px 24px',
        background: 'white',
        color: '#0c0c0cff',
        border: '2px solid #010101ff',
        borderRadius: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    main: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 20px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        marginBottom: 60
    },
    statCard: {
        background: 'white',
        borderRadius: 20,
        padding: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #f1f5f9'
    },
    statContent: {
        flex: 1
    },
    statHeader: {
        marginBottom: 12
    },
    statTitle: {
        fontSize: 13,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: 0,
        fontWeight: 600
    },
    statValue: {
        fontSize: 32,
        fontWeight: 800,
        color: '#0f172a',
        margin: '0 0 8px 0',
        lineHeight: 1
    },
    change: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13
    },
    changeText: {
        color: '#10b981',
        fontWeight: 600
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3b82f6',
    },
    tabsContainer: {
        width: "100%",
        background: "#f6f6f6bf",
        padding: 20,
        display: "flex",
        justifyContent: "center",
        borderRadius: 15,
    },
    tabs: {
        display: "flex",
        gap: 12,
        backgroundColor: "#ffffff8f",
        padding: 6,
        borderRadius: 16,
        position: "relative",
        width: "fit-content",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    tab: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 16px",
        borderRadius: 12,
        fontWeight: 500,
        fontSize: 14,
        border: "none",
        cursor: "pointer",
        background: "transparent",
        color: "black",
        position: "relative",
        zIndex: 1,
        transition: "color 0.2s ease",
    },
    activeTab: {
        color: "#3a25ff",
    },
    underline: {
        position: "absolute",
        height: 4,
        borderRadius: 2,
        backgroundColor: "#4f46e5",
        bottom: 0,
        transition: "all 0.3s ease",
    },
    tabContent: {
        marginTop: 20,
    },
    overviewGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
    },
    overviewLeft: {
        flex: 1
    },
    contactSection: {
        margin: '9px 0 0 0',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 30,
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        cursor: 'default',
    },
    contactItemHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    },
    contactLabel: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: 500,
        minWidth: 80,
    },
    contactValue: {
        fontSize: 16,
        color: '#0f172a',
        fontWeight: 600,
    },
    bioSection: {
        marginBottom: 32,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    textarea: {
        width: '100%',
        padding: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 16,
        resize: 'vertical',
        minHeight: 100,
        transition: 'border-color 0.2s ease',
    },
    textareaFocus: {
        borderColor: '#4f46e5',
        outline: 'none',
    },
    bioText: {
        fontSize: 16,
        lineHeight: 1.6,
        color: '#1e293b',
    },
    overviewRight: {
        flex: 1,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    quickStats: {
        marginBottom: 42,
    },
    quickStatsGrid: {
        display: "inline",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
    },
    quickStat: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        cursor: "default",
        gap: 12,
    },
    sectionTitle: {
        fontSize: 23,
        fontWeight: 700,
        color: "#000000",
        borderRadius: 12,
        padding: "4px 12px",
        marginBottom: 12,
        textAlign: "left",
    },
    quickStatIcon: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbeafe",
        borderRadius: "50%",
    },
    quickStatValue: {
        fontSize: 20,
        fontWeight: 700,
        color: "#0f172a",
        margin: 0,
    },
    quickStatLabel: {
        fontSize: 14,
        color: "#64748b",
        margin: 0,
    },
    recentActivity: {
        marginBottom: 32
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
    },
    activityIcon: {
        width: 32,
        height: 32,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f5f9'
    },
    activityText: {
        fontSize: 14,
        fontWeight: 600,
        color: '#0f172a'
    },
    activityTime: {
        fontSize: 12,
        color: '#64748b'
    },
    sectionHeader: {
        marginBottom: 32
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#64748b',
        margin: '11px 0 0 0',
    },
    addBtn: {
        padding: '15px 24px',
        background: '#3a25ff',
        margin: '11px 0 0 0',
        color: 'white',
        border: 'none',
        borderRadius: 12,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    jobsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20
    },
    jobCard: {
        background: 'white',
        borderRadius: 12,
        padding: 20,
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    jobHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    jobInfo: {
        flex: 1
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 700,
        margin: 0,
        color: '#0f172a'
    },
    jobCompany: {
        fontSize: 14,
        color: '#64748b',
        margin: '4px 0 0 0'
    },
    jobLocation: {
        fontSize: 12,
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: 4
    },
    jobMeta: {
        display: 'flex',
        gap: 12,
        fontSize: 12,
        color: '#64748b'
    },
    jobSalary: {
        background: '#dbeafe',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600
    },
    jobType: {
        background: '#f1f5f9',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600
    },
    jobFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
        color: '#64748b'
    },
    jobStatus: {
        background: '#dcfce7',
        color: '#166534',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600
    },
    jobDate: {
        fontWeight: 500
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        textAlign: 'center',
        color: '#6b7280'
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 600,
        margin: '0 0 12px 0'
    },
    emptyDescription: {
        fontSize: 14
    },
    skillsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 32
    },
    skillsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12
    },
    skillTagWrapper: {
        display: 'inline-block'
    },
    skillTag: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 20,
        color: 'white',
        fontSize: 14,
        fontWeight: 600,
        transition: 'transform 0.2s ease'
    },
    skillLevel: {
        fontSize: 10,
        fontWeight: 400,
        background: 'rgba(255,255,255,0.2)',
        padding: '2px 6px',
        borderRadius: 4,
        marginLeft: 8
    },
    removeBtn: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: 4,
        transition: 'transform 0.2s ease'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        background: 'white',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 700,
        margin: 0
    },
    closeBtn: {
        background: 'transparent',
        border: 'none',
        color: '#6b7280',
        cursor: 'pointer',
        fontSize: 24
    },
    modalBody: {
        padding: 20
    },
    uploadArea: {
        textAlign: 'center',
        padding: 40
    },
    uploadIcon: {
        marginBottom: 20
    },
    uploadText: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 20
    },
    fileInput: {
        display: 'block',
        margin: '0 auto',
        padding: 12,
        background: '#f1f5f9',
        border: '2px dashed #3b82f6',
        borderRadius: 12,
        cursor: 'pointer',
        width: '100%'
    },
    shareContent: {
        textAlign: 'center'
    },
    shareText: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 20
    },
    shareUrl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20
    },
    shareInput: {
        flex: 1,
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 14
    },
    copyBtn: {
        padding: '12px 24px',
        background: '#3a25ff',
        color: 'white',
        border: 'none',
        borderRadius: 12,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8
    },
    socialShare: {
        textAlign: 'center'
    },
    socialButtons: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        marginTop: 16
    },
    socialBtn: {
        padding: '8px 16px',
        background: '#f1f5f9',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    addSkillForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
    },
    formLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: '#64748b'
    },
    formInput: {
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 14
    },
    formSelect: {
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 14
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 20
    },
    coursesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16
    },
    courseCard: {
        background: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    courseImageWrapper: {
        position: 'relative',
        width: '100%',
        height: 120,
        overflow: 'hidden'
    },
    courseImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    certificateBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        background: 'rgba(40, 167, 69, 0.9)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: 12,
        fontSize: 10,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 3
    },
    courseContent: {
        padding: 12
    },
    courseTitle: {
        fontSize: 15,
        fontWeight: 700,
        color: '#0f172a',
        margin: '0 0 8px 0',
        lineHeight: 1.3,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    },
    courseDescription: {
        display: 'none'
    },
    courseMeta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    courseMetaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        color: '#64748b'
    },
    levelBadge: {
        padding: '3px 8px',
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 600,
        color: 'white'
    },
    courseFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTop: '1px solid #f1f5f9'
    },
    coursePrice: {
        fontSize: 14,
        fontWeight: 700,
        color: '#28a745'
    },
    viewCourseBtn: {
        padding: '6px 12px',
        background: '#3a25ff',
        color: 'white',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'all 0.2s ease'
    },
    progressBar: {
        marginTop: 10
    },
    progressLabel: {
        fontSize: 10,
        color: '#64748b',
        marginBottom: 4,
        fontWeight: 600
    },
    progressBarBg: {
        height: 6,
        background: '#f1f5f9',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #3a25ff, #5a4bff)',
        borderRadius: 3,
        transition: 'width 0.3s ease'
    },
    browseCoursesBtn: {
        display: 'inline-block',
        marginTop: 16,
        padding: '12px 24px',
        background: '#3a25ff',
        color: 'white',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'all 0.2s ease'
    }
};
