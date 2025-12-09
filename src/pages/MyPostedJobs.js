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
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Users, Eye, Download, Mail, Phone, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle, Trash2, Search } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import './MyPostedJobs.css';
function MyPostedJobs() {
    const [user] = useAuthState(auth);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showApplications, setShowApplications] = useState(false);
    useEffect(() => {
        if (user) {
            fetchMyJobs();
        }
    }, [user]);
    useEffect(() => {
        filterApplications();
    }, [applications, searchTerm, statusFilter]);
    const fetchMyJobs = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            const jobsRef = collection(db, 'jobs');
            const q = query(jobsRef, orderBy('timestamp', 'desc'));
            const snapshot = yield getDocs(q);
            const jobsList = [];
            for (const jobDoc of snapshot.docs) {
                const jobData = Object.assign({ id: jobDoc.id }, jobDoc.data());
                // حساب عدد المتقدمين لكل وظيفة
                const appsRef = collection(db, 'applications');
                const appsQuery = query(appsRef, where('jobId', '==', jobDoc.id));
                const appsSnapshot = yield getDocs(appsQuery);
                jobData.applicationsCount = appsSnapshot.size;
                jobsList.push(jobData);
            }
            setJobs(jobsList);
        }
        catch (error) {
            console.error('Error fetching jobs:', error);
        }
        finally {
            setLoading(false);
        }
    });
    const fetchApplications = (jobId) => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            const appsRef = collection(db, 'applications');
            const q = query(appsRef, where('jobId', '==', jobId), orderBy('appliedAt', 'desc'));
            const snapshot = yield getDocs(q);
            const appsList = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            setApplications(appsList);
            setFilteredApplications(appsList);
        }
        catch (error) {
            console.error('Error fetching applications:', error);
        }
        finally {
            setLoading(false);
        }
    });
    const filterApplications = () => {
        let filtered = [...applications];
        // فلترة بالبحث
        if (searchTerm) {
            filtered = filtered.filter(app => app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // فلترة بالحالة
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }
        setFilteredApplications(filtered);
    };
    const handleViewApplications = (job) => {
        setSelectedJob(job);
        setShowApplications(true);
        fetchApplications(job.id);
    };
    const handleUpdateStatus = (applicationId, newStatus) => __awaiter(this, void 0, void 0, function* () {
        try {
            const appRef = doc(db, 'applications', applicationId);
            yield updateDoc(appRef, { status: newStatus });
            // تحديث الحالة محلياً
            setApplications(prev => prev.map(app => app.id === applicationId ? Object.assign(Object.assign({}, app), { status: newStatus }) : app));
            alert('Status updated successfully!');
        }
        catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    });
    const handleDownloadCV = (cvBase64, fileName) => {
        const link = document.createElement('a');
        link.href = cvBase64;
        link.download = fileName;
        link.click();
    };
    const handleDeleteJob = (jobId) => __awaiter(this, void 0, void 0, function* () {
        if (!window.confirm('Are you sure you want to delete this job? This will also delete all applications.')) {
            return;
        }
        try {
            // حذف كل التقديمات المرتبطة بالوظيفة
            const appsRef = collection(db, 'applications');
            const appsQuery = query(appsRef, where('jobId', '==', jobId));
            const appsSnapshot = yield getDocs(appsQuery);
            const deletePromises = appsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            yield Promise.all(deletePromises);
            // حذف الوظيفة
            yield deleteDoc(doc(db, 'jobs', jobId));
            setJobs(prev => prev.filter(job => job.id !== jobId));
            alert('Job deleted successfully!');
        }
        catch (error) {
            console.error('Error deleting job:', error);
            alert('Failed to delete job');
        }
    });
    const getStatusBadge = (status) => {
        const badges = {
            pending: { icon: _jsx(Clock, { size: 14 }), text: 'Pending', class: 'status-pending' },
            reviewed: { icon: _jsx(Eye, { size: 14 }), text: 'Reviewed', class: 'status-reviewed' },
            accepted: { icon: _jsx(CheckCircle, { size: 14 }), text: 'Accepted', class: 'status-accepted' },
            rejected: { icon: _jsx(XCircle, { size: 14 }), text: 'Rejected', class: 'status-rejected' }
        };
        return badges[status];
    };
    if (loading && jobs.length === 0) {
        return (_jsx("div", { className: "my-posted-jobs-container", children: _jsx("div", { className: "loading", children: "Loading..." }) }));
    }
    if (!showApplications) {
        return (_jsxs("div", { className: "my-posted-jobs-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs(Link, { to: "/jobs", className: "back-link", children: [_jsx(ArrowLeft, { size: 20 }), " Back to Jobs"] }), _jsx("h1", { children: "My Posted Jobs" }), _jsx("p", { children: "Manage your job postings and review applications" })] }), _jsxs("div", { className: "stats-cards", children: [_jsxs("div", { className: "stat-card", children: [_jsx(Briefcase, { size: 24 }), _jsxs("div", { children: [_jsx("h3", { children: jobs.length }), _jsx("p", { children: "Total Jobs Posted" })] })] }), _jsxs("div", { className: "stat-card", children: [_jsx(Users, { size: 24 }), _jsxs("div", { children: [_jsx("h3", { children: jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0) }), _jsx("p", { children: "Total Applications" })] })] }), _jsxs("div", { className: "stat-card", children: [_jsx(CheckCircle, { size: 24 }), _jsxs("div", { children: [_jsx("h3", { children: jobs.filter(job => (job.applicationsCount || 0) > 0).length }), _jsx("p", { children: "Active Jobs" })] })] })] }), jobs.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx(Briefcase, { size: 64 }), _jsx("h2", { children: "No Jobs Posted Yet" }), _jsx("p", { children: "Start posting jobs to receive applications" }), _jsx(Link, { to: "/jobs", className: "btn-primary", children: "Post a Job" })] })) : (_jsx("div", { className: "jobs-grid", children: jobs.map(job => (_jsxs("div", { className: "job-card-posted", children: [_jsxs("div", { className: "job-card-header", children: [_jsxs("div", { className: "job-title-section", children: [_jsx("h3", { children: job.title }), _jsx("span", { className: "company-name", children: job.company })] }), _jsx("div", { className: "job-actions", children: _jsx("button", { className: "btn-icon", onClick: () => handleDeleteJob(job.id), title: "Delete Job", children: _jsx(Trash2, { size: 18 }) }) })] }), _jsxs("div", { className: "job-details", children: [_jsxs("div", { className: "detail-item", children: [_jsx(MapPin, { size: 16 }), _jsx("span", { children: job.location })] }), _jsxs("div", { className: "detail-item", children: [_jsx(Briefcase, { size: 16 }), _jsx("span", { children: job.type })] }), _jsxs("div", { className: "detail-item", children: [_jsx(DollarSign, { size: 16 }), _jsxs("span", { children: [job.salary, "/yr"] })] })] }), _jsxs("div", { className: "tech-stack", children: [_jsx("strong", { children: "Tech:" }), " ", job.tech] }), _jsxs("div", { className: "job-footer", children: [_jsxs("div", { className: "applications-count", children: [_jsx(Users, { size: 18 }), _jsxs("span", { children: [job.applicationsCount || 0, " Applications"] })] }), _jsxs("button", { className: "btn-view-applications", onClick: () => handleViewApplications(job), disabled: !job.applicationsCount, children: [_jsx(Eye, { size: 16 }), " View Applications"] })] })] }, job.id))) }))] }));
    }
    // عرض التقديمات
    return (_jsxs("div", { className: "my-posted-jobs-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs("button", { className: "back-link", onClick: () => {
                            setShowApplications(false);
                            setSelectedJob(null);
                            setApplications([]);
                            setSearchTerm('');
                            setStatusFilter('all');
                        }, children: [_jsx(ArrowLeft, { size: 20 }), " Back to My Jobs"] }), _jsxs("h1", { children: ["Applications for: ", selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.title] }), _jsxs("p", { children: [applications.length, " total applications"] })] }), _jsxs("div", { className: "filters-section", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 20 }), _jsx("input", { type: "text", placeholder: "Search by name or email...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs("div", { className: "status-filters", children: [_jsxs("button", { className: statusFilter === 'all' ? 'active' : '', onClick: () => setStatusFilter('all'), children: ["All (", applications.length, ")"] }), _jsxs("button", { className: statusFilter === 'pending' ? 'active' : '', onClick: () => setStatusFilter('pending'), children: ["Pending (", applications.filter(a => a.status === 'pending').length, ")"] }), _jsxs("button", { className: statusFilter === 'reviewed' ? 'active' : '', onClick: () => setStatusFilter('reviewed'), children: ["Reviewed (", applications.filter(a => a.status === 'reviewed').length, ")"] }), _jsxs("button", { className: statusFilter === 'accepted' ? 'active' : '', onClick: () => setStatusFilter('accepted'), children: ["Accepted (", applications.filter(a => a.status === 'accepted').length, ")"] }), _jsxs("button", { className: statusFilter === 'rejected' ? 'active' : '', onClick: () => setStatusFilter('rejected'), children: ["Rejected (", applications.filter(a => a.status === 'rejected').length, ")"] })] })] }), filteredApplications.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx(Users, { size: 64 }), _jsx("h2", { children: "No Applications Found" }), _jsx("p", { children: "No applications match your filters" })] })) : (_jsx("div", { className: "applications-list", children: filteredApplications.map(app => {
                    const statusBadge = getStatusBadge(app.status);
                    return (_jsxs("div", { className: "application-card", children: [_jsxs("div", { className: "application-header", children: [_jsxs("div", { className: "applicant-info", children: [_jsx("div", { className: "applicant-avatar", children: app.fullName.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("h3", { children: app.fullName }), _jsxs("p", { className: "applied-date", children: [_jsx(Calendar, { size: 14 }), "Applied ", new Date(app.appliedAt.seconds * 1000).toLocaleDateString()] })] })] }), _jsxs("span", { className: `status-badge ${statusBadge.class}`, children: [statusBadge.icon, statusBadge.text] })] }), _jsxs("div", { className: "application-details", children: [_jsxs("div", { className: "contact-info", children: [_jsxs("div", { className: "contact-item", children: [_jsx(Mail, { size: 16 }), _jsx("a", { href: `mailto:${app.email}`, children: app.email })] }), app.phone && (_jsxs("div", { className: "contact-item", children: [_jsx(Phone, { size: 16 }), _jsx("a", { href: `tel:${app.phone}`, children: app.phone })] }))] }), app.coverLetter && (_jsxs("div", { className: "cover-letter", children: [_jsx("strong", { children: "Cover Letter:" }), _jsx("p", { children: app.coverLetter })] })), _jsxs("div", { className: "application-actions", children: [_jsxs("button", { className: "btn-download", onClick: () => handleDownloadCV(app.cvBase64, app.cvFileName), children: [_jsx(Download, { size: 16 }), " Download CV"] }), _jsxs("div", { className: "status-actions", children: [app.status !== 'reviewed' && (_jsxs("button", { className: "btn-status reviewed", onClick: () => handleUpdateStatus(app.id, 'reviewed'), children: [_jsx(Eye, { size: 16 }), " Mark Reviewed"] })), app.status !== 'accepted' && (_jsxs("button", { className: "btn-status accepted", onClick: () => handleUpdateStatus(app.id, 'accepted'), children: [_jsx(CheckCircle, { size: 16 }), " Accept"] })), app.status !== 'rejected' && (_jsxs("button", { className: "btn-status rejected", onClick: () => handleUpdateStatus(app.id, 'rejected'), children: [_jsx(XCircle, { size: 16 }), " Reject"] }))] })] })] })] }, app.id));
                }) }))] }));
}
export default MyPostedJobs;
