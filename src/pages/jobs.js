var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Briefcase, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import "./jobs.css";
import { FaUser, FaBriefcase, FaBook, FaFileDownload, FaPencilAlt, FaSignOutAlt, } from 'react-icons/fa';
import { FaSearch, FaMapMarkerAlt, FaPen, FaMoneyBillWave, FaLaptopCode, } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { UserService } from '../firebase/src/firebaseServices';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
function HomePage() {
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
}
function Jobs() {
    var _a;
    const [jobsData, setJobsData] = useState([]);
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [applicantsCounts, setApplicantsCounts] = useState({});
    const [hireData, setHireData] = useState({
        company: "",
        title: "",
        location: "",
        remote: "",
        salary: "",
        tech: "",
        type: "",
    });
    const [filters, setFilters] = useState({
        title: "",
        location: "",
        remote: "",
        salary: "",
        tech: "",
        type: "",
    });
    useEffect(() => {
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobsList = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            setJobsData(jobsList);
        });
        return () => unsubscribe();
    }, []);
    // live applicants count per job
    useEffect(() => {
        const appsRef = collection(db, 'applications');
        const unsubscribe = onSnapshot(appsRef, (snapshot) => {
            const counts = {};
            snapshot.docs.forEach((d) => {
                const data = d.data();
                const jobId = data.jobId;
                if (jobId) {
                    counts[jobId] = (counts[jobId] || 0) + 1;
                }
            });
            setApplicantsCounts(counts);
        });
        return () => unsubscribe();
    }, []);
    const handleFilterChange = (e) => {
        setFilters(Object.assign(Object.assign({}, filters), { [e.target.name]: e.target.value }));
    };
    const handleHireChange = (e) => {
        setHireData(Object.assign(Object.assign({}, hireData), { [e.target.name]: e.target.value }));
    };
    const handleSearch = () => {
        console.log("Search Filters:", filters);
    };
    const handlePostJob = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        try {
            yield addDoc(collection(db, 'jobs'), Object.assign(Object.assign({}, hireData), { posterId: (user === null || user === void 0 ? void 0 : user.uid) || null, posterName: (userData === null || userData === void 0 ? void 0 : userData.displayName) || ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || 'user', timestamp: new Date() }));
            alert('done! Job posted successfully.');
            setHireData({
                company: "",
                title: "",
                location: "",
                remote: "",
                salary: "",
                tech: "",
                type: "",
            });
        }
        catch (error) {
            console.error("Error posting job: ", error);
            alert(" fail to post job. Please try again.");
        }
    });
    const searchTerms = [
        'designer', 'Writer', 'Team leader', 'Fullstack', 'web developer',
        'Senior', 'Financial Analyst', 'Software', 'Web', 'Techno'
    ];
    return (_jsx("div", { className: "jobsearch", children: _jsxs("div", { className: "Jobs", children: [_jsxs("nav", { className: "navbar-container2", children: [_jsx("div", { className: "navbar-logo2", children: _jsx(NavLink, { to: "/homepage", children: _jsx("img", { src: "src/assets/img/logo2.png", className: "logo2", alt: "Logo" }) }) }), _jsxs("ul", { className: "navbar-links2", children: [_jsx("li", { children: _jsxs(NavLink, { to: "/courses", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(BookOpen, { size: 20, className: "nav-icon2" }), " Course"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/jobs", className: ({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`, children: [_jsx(Briefcase, { size: 20, className: "nav-icon2" }), " Jobs"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/ai", className: ({ isActive }) => `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`, children: [_jsx(MessageSquare, { size: 20, className: "nav-icon2" }), " Chatbot AI"] }) })] }), _jsxs("div", { className: "profile-container", children: [_jsx("button", { className: "profile-btn", onClick: () => setDropdownOpen(!dropdownOpen), children: (userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-img" })) : (_jsx(FaUser, { size: 24, color: "#fff" })) }), dropdownOpen && (_jsxs("div", { className: "profile-dropdown", children: [_jsxs("div", { className: "profile-header", children: [(userData === null || userData === void 0 ? void 0 : userData.photoURL) ? (_jsx("img", { src: userData.photoURL, alt: "Profile", className: "profile-pic" })) : (_jsx(FaUser, { size: 40, color: "#ffffffff" })), _jsxs("h4", { children: ["Welcome, ", (userData === null || userData === void 0 ? void 0 : userData.displayName) || ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || 'User', "!"] })] }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(FaBriefcase, {}), " Applied Jobs: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] }), _jsxs("li", { children: [_jsx(FaBook, {}), " Courses Taken: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.coursesEnrolled) || 0 })] }), _jsxs("li", { children: [_jsx(FaPencilAlt, {}), " Exercises Done: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.exercisesCompleted) || 0 })] }), _jsxs("li", { children: [_jsx(FaFileDownload, {}), " Notes Downloaded: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.downloads) || 0 })] }), _jsxs("li", { children: ["Shared Notes: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.sharedNotes) || 0 })] }), _jsxs("li", { children: ["CV Uploads: ", _jsx("span", { children: (userData === null || userData === void 0 ? void 0 : userData.cvUploads) || (userData === null || userData === void 0 ? void 0 : userData.appliedJobs) || 0 })] })] }), _jsxs("div", { className: "profile-actions", children: [_jsx(Link, { to: "/profile", className: "profile-link", children: "View Profile" }), _jsxs("button", { className: "logout-btn", onClick: () => auth.signOut(), children: [_jsx(FaSignOutAlt, {}), " Sign Out"] })] })] }))] }), _jsx("div", { className: "divider2" }), _jsxs("div", { className: "navbar-actions", children: [_jsx("button", { className: "login-button", children: _jsx(Link, { to: "./signIn", children: "Log In" }) }), _jsx("button", { className: "signup-button", children: _jsx(Link, { to: "./Register", children: "Sign Up" }) })] })] }), _jsx("img", { src: "https://i.pinimg.com/1200x/42/ac/3d/42ac3da633954a5dd14666ce3f3acc21.jpg", alt: "", className: "backgroundimg" }), _jsxs("div", { className: "hero-content1", children: [_jsxs("h1", { className: "titleJob1", children: ["Ready for Your Next Job? ", _jsx("br", {}), "Let\u2019s Get ", _jsx("span", { className: "highlight3", children: "You Hired!" })] }), _jsxs("div", { className: "button-group1", children: [_jsx("div", { className: "search2", children: "Choose the one that best fits the tone and space you have! Take on new opportunities, grow, and make a meaningful impact in any organization you join" }), _jsxs("div", { className: "popular-searches-container", children: [_jsx("h2", { className: "popular-searches-title", children: "Popular Titles:" }), _jsx("div", { className: "tags-container", children: searchTerms.map((term, index) => (_jsx("button", { className: "tag", children: term }, index))) })] })] })] }), _jsxs("div", { className: "filter-container", children: [_jsx("h1", { className: "filter-title", children: "Find Your Dream Job" }), _jsxs("p", { className: "filter-paragraph", children: ["Browse ", _jsx("span", { children: "exciting job openings" }), ", explore ", _jsx("span", { children: "new career paths" }), ", and apply ", _jsx("span", { children: "instantly" }), " with just a few clicks."] }), _jsxs("div", { className: "Filter-bar", children: [_jsxs("div", { className: "filter-input", children: [_jsx(FaPen, { className: "filter-icon" }), _jsx("input", { type: "text", name: "title", placeholder: "Job Title", value: filters.title, onChange: handleFilterChange })] }), _jsxs("div", { className: "filter-input", children: [_jsx(FaMapMarkerAlt, { className: "filter-icon" }), _jsx("input", { type: "text", name: "location", placeholder: "Location", value: filters.location, onChange: handleFilterChange })] }), _jsxs("div", { className: "filter-input", children: [_jsx(FaBriefcase, { className: "filter-icon" }), _jsxs("select", { name: "type", value: filters.type, onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "Job Type" }), _jsx("option", { value: "full-time", children: "Full-time" }), _jsx("option", { value: "part-time", children: "Part-time" }), _jsx("option", { value: "contract", children: "Contract" })] })] }), _jsxs("div", { className: "filter-input", children: [_jsx(FaLaptopCode, { className: "filter-icon" }), _jsx("input", { type: "text", name: "tech", placeholder: "Tech Stack", value: filters.tech, onChange: handleFilterChange })] }), _jsxs("div", { className: "filter-input", children: [_jsx(FaMoneyBillWave, { className: "filter-icon" }), _jsx("input", { type: "text", name: "salary", placeholder: "Salary Range", value: filters.salary, onChange: handleFilterChange })] }), _jsx("div", { className: "filter-input", children: _jsxs("select", { name: "remote", value: filters.remote, onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "Remote or On-site" }), _jsx("option", { value: "remote", children: "Remote" }), _jsx("option", { value: "on-site", children: "On-site" })] }) }), _jsxs("button", { className: "filter-button", onClick: handleSearch, children: [_jsx(FaSearch, {}), " Search"] })] }), _jsx("div", { className: "filter-card", children: jobsData.map((job, index) => (_jsxs("div", { className: `job-card ${index === 0 ? "blue" : index === 1 ? "pink" : "yellow"}`, children: [_jsxs("div", { className: "job-header", children: [_jsx("span", { className: "job-type", children: job.type }), _jsx("span", { className: "job-time", children: job.remote })] }), _jsx("h3", { className: "job-title", children: job.title }), _jsxs("p", { className: "job-salary", children: ["\u20AC ", job.salary, " / Yearly"] }), _jsxs("div", { className: "job-footer", children: [_jsxs("p", { children: [_jsx(FaMapMarkerAlt, {}), " ", job.location] }), _jsxs("p", { children: [_jsx(FaBriefcase, {}), " ", job.tech] }), _jsxs("p", { children: [_jsx(FaMoneyBillWave, {}), " ", job.salary] })] }), _jsxs("div", { style: { display: 'flex', gap: '10px', alignItems: 'center' }, children: [_jsx(Link, { to: `/apply/${job.id}`, className: "apply-button", children: "Apply Now" }), user && job.posterId === user.uid && (_jsxs(Link, { to: `/applicants?jobId=${job.id}`, title: "View applicants", style: {
                                                    padding: '8px 12px',
                                                    background: '#0ea5e9',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    textDecoration: 'none'
                                                }, children: [_jsx(Users, { size: 16 }), "Applicants", _jsx("span", { style: { background: '#fff', color: '#0ea5e9', borderRadius: '999px', padding: '2px 8px', fontWeight: 700 }, children: applicantsCounts[job.id] || 0 })] }))] })] }, job.id))) })] }), _jsxs("div", { className: "hirring", children: [_jsx("img", { src: "https://i.pinimg.com/originals/a4/8e/33/a48e33a09335b257fe221c0943e4e1ea.gif", className: "hirreimage", alt: "" }), _jsx("h1", { className: "hire-head", children: "Discover Your Perfect Team Member Quickly" }), _jsx("p", { className: "hire-paragraph", children: "Find your perfect worker in the fastest time possible. Connect with skilled professionals quickly and efficiently to get the right fit for your team." })] }), _jsxs("div", { className: "body-form", children: [_jsx("h1", { className: "form-title-hire", children: "Hire the Best Talent" }), _jsx("p", { className: "form-para-hire", children: "Post a job and get candidates quickly." }), _jsx("h2", { className: "hire-title", children: "Enter Job Details" }), _jsxs("form", { className: "hire-bar", onSubmit: handlePostJob, children: [_jsx("input", { type: "text", name: "company", placeholder: "Company Name", value: hireData.company, onChange: handleHireChange, required: true }), _jsx("input", { type: "text", name: "title", placeholder: "Job Title", value: hireData.title, onChange: handleHireChange, required: true }), _jsx("input", { type: "text", name: "location", placeholder: "Location", value: hireData.location, onChange: handleHireChange, required: true }), _jsxs("select", { name: "type", value: hireData.type, onChange: handleHireChange, required: true, children: [_jsx("option", { value: "", children: "Job Type" }), _jsx("option", { value: "full-time", children: "Full-time" }), _jsx("option", { value: "part-time", children: "Part-time" }), _jsx("option", { value: "contract", children: "Contract" })] }), _jsx("input", { type: "text", name: "tech", placeholder: "Tech Stack (e.g. React, Node.js)", value: hireData.tech, onChange: handleHireChange, required: true }), _jsx("input", { type: "text", name: "salary", placeholder: "Salary Offered", value: hireData.salary, onChange: handleHireChange, required: true }), _jsxs("select", { name: "remote", value: hireData.remote, onChange: handleHireChange, required: true, children: [_jsx("option", { value: "", children: "Remote or On-site" }), _jsx("option", { value: "remote", children: "Remote" }), _jsx("option", { value: "on-site", children: "On-site" })] }), _jsx("button", { type: "submit", className: "hire-button", children: "Post Job" })] })] })] }) }));
}
export default Jobs;
