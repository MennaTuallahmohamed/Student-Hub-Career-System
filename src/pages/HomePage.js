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
// ana 3adlt f code da bsar7ha w katbtlk comment fa rakzy feh 3lshan cont adef profile  page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Briefcase, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaUser, FaBriefcase, FaBook, FaFileDownload, FaPencilAlt, FaSignOutAlt, } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { UserService } from '../firebase/src/firebaseServices';
const cards = [
    {
        title: 'Why Choose StudyHub?',
        description: 'Master new skills with AI-curated courses and a personalized learning experience tailored just for you.',
    },
    {
        title: 'Student Career Launchpad',
        description: 'Connect with top internships and entry-level jobs with AI recommendations suited to your strengths.',
    },
    {
        title: 'All-in-One Dashboard',
        description: 'Track your learning, job applications, and career growth — all in one unified interface.',
    },
    {
        title: 'Real-Time Progress Tracking',
        description: 'Visualize your upskilling journey with live analytics and smart reminders.',
    },
    {
        title: 'Tailored Career Paths',
        description: 'AI suggests career paths based on your learning patterns, goals, and market trends.',
    },
    {
        title: 'Built for Students, Powered by AI',
        description: 'The perfect synergy of learning and employment, designed for modern learners.',
    },
];
function HomePage() {
    var _a;
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        const fetchUserData = () => __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const data = yield UserService.getUserData(user.uid);
                setUserData(data);
            }
        });
        fetchUserData();
    }, [user]);
    return (_jsxs("div", { className: "homepage", children: [_jsxs("nav", { className: "navbar-container2", children: [_jsx("div", { className: "navbar-logo2", children: _jsx(NavLink, { to: "/homepage", children: _jsx("img", { src: "src/assets/img/logo2.png", className: "logo2", alt: "Logo" }) }) }), _jsxs("ul", { className: "navbar-links2", children: [_jsx("li", { children: _jsxs(NavLink, { to: "/courses", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(BookOpen, { size: 20, className: "nav-icon2" }), " Course"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/jobs", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(Briefcase, { size: 20, className: "nav-icon2" }), " Jobs"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/ai", className: ({ isActive }) => `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`, children: [_jsx(MessageSquare, { size: 20, className: "nav-icon2" }), " Chatbot AI"] }) })] }), _jsxs("div", { className: "profile-container", children: [_jsx("button", { className: "profile-btn", onClick: () => setDropdownOpen(!dropdownOpen), children: (userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-img" })) : (_jsx(FaUser, { size: 24, color: "#fff" })) }), dropdownOpen && (_jsxs("div", { className: "profile-dropdown", children: [_jsxs("div", { className: "profile-header", children: [(userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-pic" })) : (_jsx(FaUser, { size: 40, color: "#ffffffff" })), _jsxs("h4", { children: ["Welcome, ", (userData === null || userData === void 0 ? void 0 : userData.displayName) || ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || 'User', "!"] })] }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(FaBriefcase, {}), " Applied Jobs: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] }), _jsxs("li", { children: [_jsx(FaBook, {}), " Courses Taken: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.coursesEnrolled) || 0 })] }), _jsxs("li", { children: [_jsx(FaPencilAlt, {}), " Exercises Done: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.exercisesCompleted) || 0 })] }), _jsxs("li", { children: [_jsx(FaFileDownload, {}), " Notes Downloaded: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.downloads) || 0 })] }), _jsxs("li", { children: ["Shared Notes: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.sharedNotes) || 0 })] }), _jsxs("li", { children: [_jsx(FaFileDownload, {}), " CV Uploads: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.cvUploads) || (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] })] }), (userData === null || userData === void 0 ? void 0 : userData.registeredCourses) && userData.registeredCourses.length > 0 && (_jsxs("div", { style: {
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
                                                        }, children: ["+", userData.registeredCourses.length - 3, " more courses"] }))] })] })), _jsxs("div", { className: "profile-actions", children: [_jsx(Link, { to: "/profile", className: "profile-link", children: "View Profile" }), _jsxs("button", { className: "logout-btn", onClick: () => auth.signOut(), children: [_jsx(FaSignOutAlt, {}), " Sign Out"] })] })] }))] }), _jsx("div", { className: "divider2" }), _jsxs("div", { className: "navbar-actions", children: [_jsx("button", { className: "login-button", children: _jsx(Link, { to: "./signIn", children: "Log In" }) }), _jsx("button", { className: "signup-button", children: _jsx(Link, { to: "./Register", children: "Sign Up" }) })] })] }), _jsxs("h1", { className: "head1", children: ["What\u2019s Your Goal Today ", _jsx("br", {}), _jsx("span", { className: "highlight", children: "Study Smarter" }), " or Find Your", _jsx("span", { className: "highlight2", children: " Next Job?" })] }), _jsxs("h3", { className: "head3", children: ["Choose what fits you best in a smart,", _jsx("br", {}), " simple and personal way."] }), _jsxs("div", { className: "stats-container", children: [_jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: "15,2K" }), _jsx("div", { className: "stat-label", children: "courses" })] }), _jsx("div", { className: "divider" }), _jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: "4,5K" }), _jsx("div", { className: "stat-label", children: "jobs" })] }), _jsx("div", { className: "divider" }), _jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: _jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }) }), _jsx("div", { className: "stat-label", children: "chatbot" })] })] }), _jsx("div", { className: "photo-hover", children: _jsxs("section", { className: "people-hoverr", children: [_jsx("div", { className: "hoverr student", children: _jsx("div", { className: "card-info", children: _jsxs("h3", { children: [" ", _jsx(Link, { to: "/courses", className: 'styled-link', children: "Courses" })] }) }) }), _jsx("div", { className: "hoverr man", children: _jsx("div", { className: "card-info", children: _jsxs("h3", { children: ["      ", _jsx(Link, { to: "/jobs", className: "styled-link", children: "Job Search" })] }) }) }), _jsx("div", { className: "hoverr ai", children: _jsx("div", { className: "card-info", children: _jsxs("h3", { children: ["      ", _jsx(Link, { to: "/ai", className: "styled-link", children: "AI Chatbot" }), " "] }) }) })] }) }), _jsx("h2", { className: "choose", children: "Why Choose StudyHub & StudentCareer?" }), _jsx("div", { className: "loop-slider-container", children: _jsx("div", { className: "loop-track", children: [...cards, ...cards].map((card, index) => (_jsxs("div", { className: "loop-card", children: [_jsx("h3", { children: card.title }), _jsx("p", { children: card.description })] }, index))) }) }), _jsxs("div", { className: "background", children: [_jsxs("h1", { className: "learning-style", children: ["Finding work\u2019s hard!", _jsx("hr", { className: "learn" })] }), _jsx("p", { className: "challenge", children: "Every application is a step toward your future career." }), _jsx("p", { children: _jsx(Link, { to: "/jobs", className: "borderword", children: "Take This Step Now!" }) }), _jsxs("div", { className: "card-container", children: [_jsx("h2", { children: "85%" }), _jsx("p", { children: "of Users Found a Job Faster" }), _jsxs("div", { className: "progress-bar", children: [_jsx("div", { className: "progress green" }), _jsx("div", { className: "progress yellow" }), _jsx("div", { className: "progress red" })] })] }), _jsxs("div", { className: "cards-container", children: [_jsxs("div", { className: "card3 yellow-card", children: [_jsx("h2", { children: "30%" }), _jsx("p", { children: "Faster Hiring Process" }), _jsxs("div", { className: "bar-visual", children: [_jsx("div", { className: "bar yellow1" }), _jsx("div", { className: "bar green1" }), _jsx("div", { className: "bar blue" })] })] }), _jsxs("div", { className: "card3 purple-card", children: [_jsx("h2", { children: "92%" }), _jsx("p", { children: "Offer Acceptance Rate" }), _jsx("div", { className: "semi-circle" })] })] }), _jsxs("h1", { className: "work", children: ["Learning takes time!", _jsx("hr", { className: "works" })] }), _jsx("p", { className: "appp", children: "Every challenge in learning is a step toward success." }), _jsx("button", { children: _jsx(Link, { to: "/courses", className: "coursess", children: "Take This Step Now!      " }) }), _jsx("img", { src: "src/assets/img/webdevelopment.png", alt: "", className: "webjob" }), _jsx("h1", { className: "AITitle", children: "Get Ready with Your AI Support" }), _jsxs("p", { className: "AIparagraph", children: [_jsx("span", { className: "percant", children: "82%" }), " of students showed improved performance with personalized feedback."] }), _jsx("p", { className: "AIparagraph2", children: "AI Support: accurately grades essays, quizzes, tracks your learning, and answers personally to any question." }), _jsx("img", { src: "src/assets/img/robot.png", alt: "", className: "robot" })] }), _jsxs("div", { className: "footer-container", children: [_jsxs("div", { className: "subscribe-section", children: [_jsx("h2", { children: "Subscribe to Get Special Price" }), _jsxs("div", { className: "subscribe-input", children: [_jsx("input", { type: "email", placeholder: "Email address" }), _jsx("button", { children: "Subscribe" })] })] }), _jsxs("div", { className: "footer-bottom", children: [_jsxs("div", { className: "footer-left", children: [_jsx("h3", { children: "StudyHub & StudentCareer" }), _jsx("p", { children: "One of the best websites that offers courses and job search with AI assistant." }), _jsxs("div", { className: "social-icons", children: [_jsx(FaInstagram, {}), _jsx(FaFacebookF, {}), _jsx(FaTwitter, {}), _jsx(FaYoutube, {})] }), _jsxs("p", { className: "copyright", children: ["\u00A9 2025 ", _jsx("strong", { children: "StudyHub & StudentCareer" }), ". All Rights Reserved."] })] }), _jsxs("div", { className: "footer-links", children: [_jsxs("div", { children: [_jsx("h4", { children: "ON OUR SITE" }), _jsx("p", { children: "About" }), _jsx("p", { children: "Features" }), _jsx("p", { children: "Support" })] }), _jsxs("div", { children: [_jsx("h4", { children: "Services" }), _jsx("p", { children: "Career" }), _jsx("p", { children: "Courses" }), _jsx("p", { children: "AI" })] }), _jsxs("div", { children: [_jsx("h4", { children: "CONTACT" }), _jsx("p", { children: "StudyHubStudentCareer@gmail.com" }), _jsx("p", { children: "+961 70 793 988" }), _jsx("p", { children: "Beirut, Lebanon" })] })] })] })] })] }));
}
export default HomePage;
