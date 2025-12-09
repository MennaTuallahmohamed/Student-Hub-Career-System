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
// 3ndi 7amas w katbtlk comment 3lshan tafhmi b3d kda fkdt al sha8f fa ma kameltsh
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin, Briefcase, Globe, DollarSign, Cpu, Home, Search, Clock, Mail, BarChart3, Users, FileCheck, TrendingUp, Calendar, Building2 } from 'lucide-react';
// تأكد من مسار الملف الصحيح
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import './ConfirmationPage.css';
import { db } from '../firebase/firebaseConfig';
function ConfirmationPage() {
    var _a, _b;
    const location = useLocation();
    const state = location.state;
    const [stats, setStats] = useState({
        totalApplications: 0,
        todayApplications: 0,
        thisWeekApplications: 0,
        thisMonthApplications: 0,
        jobApplicationCount: 0,
        userTotalApplications: 0,
        companyApplications: 0,
        averageResponseTime: '3-5 days',
        todayChange: '+0%',
        weekChange: '+0%',
        monthChange: '+0%'
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    // Generate a random application ID if not provided
    const applicationId = (state === null || state === void 0 ? void 0 : state.applicationId) || `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    // Fetch real statistics from Firebase
    useEffect(() => {
        const fetchApplicationStats = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            setIsLoadingStats(true);
            try {
                const applicationsRef = collection(db, 'applications');
                // Get total applications
                const totalSnapshot = yield getDocs(applicationsRef);
                const totalApplications = totalSnapshot.size;
                // Get today's applications
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(today)));
                const todaySnapshot = yield getDocs(todayQuery);
                const todayApplications = todaySnapshot.size;
                // Get yesterday's applications for comparison
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(yesterday)), where('createdAt', '<', Timestamp.fromDate(today)));
                const yesterdaySnapshot = yield getDocs(yesterdayQuery);
                const yesterdayApplications = yesterdaySnapshot.size;
                // Get this week's applications
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                weekStart.setHours(0, 0, 0, 0);
                const weekQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(weekStart)));
                const weekSnapshot = yield getDocs(weekQuery);
                const thisWeekApplications = weekSnapshot.size;
                // Get last week's applications for comparison
                const lastWeekStart = new Date(weekStart);
                lastWeekStart.setDate(lastWeekStart.getDate() - 7);
                const lastWeekEnd = new Date(weekStart);
                const lastWeekQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(lastWeekStart)), where('createdAt', '<', Timestamp.fromDate(lastWeekEnd)));
                const lastWeekSnapshot = yield getDocs(lastWeekQuery);
                const lastWeekApplications = lastWeekSnapshot.size;
                // Get this month's applications
                const monthStart = new Date();
                monthStart.setDate(1);
                monthStart.setHours(0, 0, 0, 0);
                const monthQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(monthStart)));
                const monthSnapshot = yield getDocs(monthQuery);
                const thisMonthApplications = monthSnapshot.size;
                // Get last month's applications for comparison
                const lastMonthStart = new Date(monthStart);
                lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
                const lastMonthEnd = new Date(monthStart);
                const lastMonthQuery = query(applicationsRef, where('createdAt', '>=', Timestamp.fromDate(lastMonthStart)), where('createdAt', '<', Timestamp.fromDate(lastMonthEnd)));
                const lastMonthSnapshot = yield getDocs(lastMonthQuery);
                const lastMonthApplications = lastMonthSnapshot.size;
                // Get applications for this specific job
                const jobQuery = query(applicationsRef, where('jobId', '==', (_a = state === null || state === void 0 ? void 0 : state.jobDetails) === null || _a === void 0 ? void 0 : _a.id));
                const jobSnapshot = yield getDocs(jobQuery);
                const jobApplicationCount = jobSnapshot.size;
                // Get user's total applications
                const userQuery = query(applicationsRef, where('applicantEmail', '==', (_b = state === null || state === void 0 ? void 0 : state.formData) === null || _b === void 0 ? void 0 : _b.email));
                const userSnapshot = yield getDocs(userQuery);
                const userTotalApplications = userSnapshot.size;
                // Calculate percentage changes
                const todayChange = yesterdayApplications > 0
                    ? Math.round(((todayApplications - yesterdayApplications) / yesterdayApplications) * 100)
                    : 0;
                const weekChange = lastWeekApplications > 0
                    ? Math.round(((thisWeekApplications - lastWeekApplications) / lastWeekApplications) * 100)
                    : 0;
                const monthChange = lastMonthApplications > 0
                    ? Math.round(((thisMonthApplications - lastMonthApplications) / lastMonthApplications) * 100)
                    : 0;
                setStats({
                    totalApplications,
                    todayApplications,
                    thisWeekApplications,
                    thisMonthApplications,
                    jobApplicationCount,
                    userTotalApplications,
                    companyApplications: totalApplications, // أو يمكنك إضافة query محدد للشركة
                    averageResponseTime: '3-5 days',
                    todayChange: todayChange > 0 ? `+${todayChange}%` : `${todayChange}%`,
                    weekChange: weekChange > 0 ? `+${weekChange}%` : `${weekChange}%`,
                    monthChange: monthChange > 0 ? `+${monthChange}%` : `${monthChange}%`
                });
            }
            catch (error) {
                console.error('Error fetching application stats:', error);
                // Fallback to basic stats if error occurs
                setStats({
                    totalApplications: 0,
                    todayApplications: 0,
                    thisWeekApplications: 0,
                    thisMonthApplications: 0,
                    jobApplicationCount: 0,
                    userTotalApplications: 0,
                    companyApplications: 0,
                    averageResponseTime: 'N/A'
                });
            }
            finally {
                setIsLoadingStats(false);
            }
        });
        if ((state === null || state === void 0 ? void 0 : state.jobDetails) && (state === null || state === void 0 ? void 0 : state.formData)) {
            fetchApplicationStats();
        }
        else {
            setIsLoadingStats(false);
        }
    }, [(_a = state === null || state === void 0 ? void 0 : state.jobDetails) === null || _a === void 0 ? void 0 : _a.id, (_b = state === null || state === void 0 ? void 0 : state.formData) === null || _b === void 0 ? void 0 : _b.email]);
    if (!(state === null || state === void 0 ? void 0 : state.jobDetails) || !(state === null || state === void 0 ? void 0 : state.formData)) {
        return (_jsx("div", { className: "confirmation-page", children: _jsxs("div", { className: "confirmation-container", children: [_jsx("h2", { children: "No Application Data Found" }), _jsx("p", { children: "It seems you reached this page directly. Please submit an application first." }), _jsxs(Link, { to: "/jobs", className: "btn btn-primary", children: [_jsx(Search, { size: 18 }), "Browse Jobs"] })] }) }));
    }
    const { jobDetails, formData } = state;
    const StatCard = ({ icon: Icon, label, value, trend, color = '#3b82f6' }) => (_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-icon", style: { backgroundColor: `${color}20`, color }, children: _jsx(Icon, { size: 24 }) }), _jsxs("div", { className: "stat-content", children: [_jsx("div", { className: "stat-value", style: { color }, children: isLoadingStats ? (_jsx("div", { className: "stat-skeleton" })) : (typeof value === 'number' ? value.toLocaleString() : value) }), _jsx("div", { className: "stat-label", children: label }), trend && !isLoadingStats && (_jsxs("div", { className: "stat-trend", children: [_jsx(TrendingUp, { size: 12 }), trend] }))] })] }));
    return (_jsx("div", { className: "confirmation-page", children: _jsxs("div", { className: "confirmation-container", children: [_jsx(CheckCircle, { size: 80, className: "success-icon" }), _jsx("h1", { className: "confirmation-title", children: "Application Submitted Successfully!" }), _jsxs("p", { className: "confirmation-message", children: ["Thank you, ", _jsx("strong", { children: formData.fullName }), "! Your application for the", _jsxs("strong", { children: [" ", jobDetails.title] }), " position has been successfully submitted and received by our team."] }), _jsxs("div", { className: "application-id", children: [_jsx("span", { className: "application-id-label", children: "Application ID:" }), applicationId] }), _jsxs("div", { className: "stats-section", children: [_jsxs("h3", { className: "stats-title", children: [_jsx(BarChart3, { size: 20 }), "Application Analytics"] }), _jsxs("div", { className: "stats-grid", children: [_jsx(StatCard, { icon: Users, label: "Total Applications Today", value: stats.todayApplications, trend: stats.todayChange || '+0%', color: "#10b981" }), _jsx(StatCard, { icon: FileCheck, label: "Applications This Week", value: stats.thisWeekApplications, trend: stats.weekChange || '+0%', color: "#3b82f6" }), _jsx(StatCard, { icon: Calendar, label: "Applications This Month", value: stats.thisMonthApplications, trend: stats.monthChange || '+0%', color: "#8b5cf6" }), _jsx(StatCard, { icon: Building2, label: "Applications for This Job", value: stats.jobApplicationCount, color: "#f59e0b" })] }), _jsxs("div", { className: "stats-summary", children: [_jsxs("div", { className: "summary-item", children: [_jsx("span", { className: "summary-label", children: "Your Total Applications:" }), _jsx("span", { className: "summary-value", children: isLoadingStats ? (_jsx("div", { className: "inline-skeleton" })) : (stats.userTotalApplications) })] }), _jsxs("div", { className: "summary-item", children: [_jsx("span", { className: "summary-label", children: "Platform Total Applications:" }), _jsx("span", { className: "summary-value", children: isLoadingStats ? (_jsx("div", { className: "inline-skeleton" })) : (stats.totalApplications.toLocaleString()) })] }), _jsxs("div", { className: "summary-item", children: [_jsx("span", { className: "summary-label", children: "Average Response Time:" }), _jsx("span", { className: "summary-value", children: isLoadingStats ? (_jsx("div", { className: "inline-skeleton" })) : (stats.averageResponseTime) })] })] })] }), _jsxs("div", { className: "job-details-card", children: [_jsx("h3", { className: "job-details-title", children: "Position Applied For" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '1.3rem', marginBottom: '15px' }, children: jobDetails.title }), _jsxs("div", { className: "job-meta-info", children: [_jsxs("div", { className: "job-meta-item", children: [_jsx(MapPin, { size: 16 }), _jsx("span", { children: jobDetails.location })] }), _jsxs("div", { className: "job-meta-item", children: [_jsx(Globe, { size: 16 }), _jsx("span", { children: jobDetails.remote })] }), _jsxs("div", { className: "job-meta-item", children: [_jsx(Briefcase, { size: 16 }), _jsx("span", { children: jobDetails.type })] }), _jsxs("div", { className: "job-meta-item", children: [_jsx(DollarSign, { size: 16 }), _jsxs("span", { children: [jobDetails.salary, "/month"] })] })] }), _jsxs("div", { className: "tech-stack", children: [_jsxs("span", { className: "tech-stack-label", children: [_jsx(Cpu, { size: 16, style: { display: 'inline', marginRight: '8px' } }), "Tech Stack:"] }), _jsx("span", { children: jobDetails.tech })] })] }), _jsxs("div", { className: "job-details-card", style: { background: '#f0f9ff', borderColor: '#0ea5e9' }, children: [_jsxs("h3", { className: "job-details-title", style: { color: '#0c4a6e' }, children: [_jsx(Mail, { size: 20, style: { display: 'inline', marginRight: '8px' } }), "Contact Information"] }), _jsxs("div", { style: { textAlign: 'left' }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", formData.email] }), formData.phone && _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", formData.phone] })] })] }), _jsxs("div", { className: "next-steps", children: [_jsxs("h3", { className: "next-steps-title", children: [_jsx(Clock, { size: 20 }), "What's Next?"] }), _jsxs("ul", { className: "next-steps-list", children: [_jsx("li", { children: "\u2705 Your application has been added to our candidate pool" }), _jsx("li", { children: "\uD83D\uDCE7 You'll receive a confirmation email within the next few minutes" }), _jsx("li", { children: "\uD83D\uDC40 Our HR team will review your application within 3-5 business days" }), _jsx("li", { children: "\uD83D\uDCDE If you're shortlisted, we'll contact you for the next steps" }), _jsx("li", { children: "\uD83D\uDCBC Keep an eye on your email for updates about your application status" })] })] }), _jsxs("div", { className: "action-buttons", children: [_jsxs(Link, { to: "/jobs", className: "btn btn-primary", children: [_jsx(Search, { size: 18 }), "Browse More Jobs"] }), _jsxs(Link, { to: "/", className: "btn btn-secondary", children: [_jsx(Home, { size: 18 }), "Back to Home"] })] })] }) }));
}
export default ConfirmationPage;
