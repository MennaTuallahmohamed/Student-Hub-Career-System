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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { ApplicationsService } from '../firebase/src/firebaseServices';
import { collection, query, where, onSnapshot, doc, getDoc, orderBy } from 'firebase/firestore';
import { Download, Eye, EyeOff, FileText, Users, TrendingUp, Calendar, Filter, Search, CheckCircle2, XCircle, Clock, Star, MapPin, Briefcase, Mail, Phone, Award, MessageSquare, Save, Loader2, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import './Applicants.css';
export default function Applicants() {
    var _a;
    const [user] = useAuthState(auth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noteDrafts, setNoteDrafts] = useState({});
    const [scoreDrafts, setScoreDrafts] = useState({});
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewedOnly, setViewedOnly] = useState(false);
    const [domainFilter, setDomainFilter] = useState('');
    const [minScore, setMinScore] = useState('');
    const [sortBy, setSortBy] = useState('appliedAt_desc');
    const [isBulkUpdating, setIsBulkUpdating] = useState(false);
    const [actionLoading, setActionLoading] = useState({});
    useEffect(() => {
        if (!(user === null || user === void 0 ? void 0 : user.uid))
            return;
        const qJobs = query(collection(db, 'jobs'), where('posterId', '==', user.uid));
        const unsub = onSnapshot(qJobs, (snap) => __awaiter(this, void 0, void 0, function* () {
            const list = snap.docs.map((d) => (Object.assign({ id: d.id }, d.data())));
            setJobs(list);
            const requested = searchParams.get('jobId');
            if (requested && list.some(j => j.id === requested)) {
                setSelectedJobId(requested);
            }
            else if (!selectedJobId && list.length) {
                setSelectedJobId(list[0].id);
            }
        }));
        return () => unsub();
    }, [user === null || user === void 0 ? void 0 : user.uid, searchParams, selectedJobId]);
    useEffect(() => {
        if (selectedJobId) {
            setSearchParams({ jobId: selectedJobId });
        }
    }, [selectedJobId, setSearchParams]);
    const loadJobDetails = useCallback((jobId) => __awaiter(this, void 0, void 0, function* () {
        const jobRef = doc(db, 'jobs', jobId);
        const jobSnap = yield getDoc(jobRef);
        if (jobSnap.exists()) {
            setSelectedJob(Object.assign({ id: jobSnap.id }, jobSnap.data()));
        }
        else {
            setSelectedJob(null);
        }
    }), []);
    useEffect(() => {
        if (!selectedJobId) {
            setApplicants([]);
            setSelectedJob(null);
            return;
        }
        setLoading(true);
        loadJobDetails(selectedJobId);
        // Real-time updates for applicants
        const qApps = query(collection(db, 'applications'), where('jobId', '==', selectedJobId), orderBy('appliedAt', 'desc'));
        const unsub = onSnapshot(qApps, (snap) => {
            const list = snap.docs.map((d) => (Object.assign({ id: d.id }, d.data())));
            setApplicants(list);
            setLoading(false);
        }, (error) => {
            console.error('Error loading applicants:', error);
            setLoading(false);
        });
        return () => unsub();
    }, [selectedJobId, loadJobDetails]);
    const stats = useMemo(() => {
        const byStatus = {};
        let viewed = 0;
        applicants.forEach((a) => {
            const s = a.status || 'pending';
            byStatus[s] = (byStatus[s] || 0) + 1;
            if (a.viewed)
                viewed += 1;
        });
        return { total: applicants.length, byStatus, viewed };
    }, [applicants]);
    const filtered = useMemo(() => {
        let list = [...applicants];
        if (statusFilter !== 'all') {
            list = list.filter(a => (a.status || 'pending') === statusFilter);
        }
        if (viewedOnly) {
            list = list.filter(a => !!a.viewed);
        }
        if (domainFilter.trim()) {
            const d = domainFilter.trim().toLowerCase();
            list = list.filter(a => (a.emailDomain || '').toLowerCase().includes(d));
        }
        const min = Number(minScore);
        if (!Number.isNaN(min) && minScore !== '') {
            list = list.filter(a => typeof a.score === 'number' && a.score >= min);
        }
        switch (sortBy) {
            case 'score_desc':
                list.sort((a, b) => { var _a, _b; return ((_a = b.score) !== null && _a !== void 0 ? _a : -Infinity) - ((_b = a.score) !== null && _b !== void 0 ? _b : -Infinity); });
                break;
            case 'score_asc':
                list.sort((a, b) => { var _a, _b; return ((_a = a.score) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b.score) !== null && _b !== void 0 ? _b : Infinity); });
                break;
            case 'name_az':
                list.sort((a, b) => String(a.fullName || '').localeCompare(String(b.fullName || '')));
                break;
            case 'appliedAt_asc':
                list.sort((a, b) => {
                    var _a, _b;
                    const at = ((_a = a.appliedAt) === null || _a === void 0 ? void 0 : _a.toDate) ? a.appliedAt.toDate().getTime() : 0;
                    const bt = ((_b = b.appliedAt) === null || _b === void 0 ? void 0 : _b.toDate) ? b.appliedAt.toDate().getTime() : 0;
                    return at - bt;
                });
                break;
            default:
                list.sort((a, b) => {
                    var _a, _b;
                    const at = ((_a = a.appliedAt) === null || _a === void 0 ? void 0 : _a.toDate) ? a.appliedAt.toDate().getTime() : 0;
                    const bt = ((_b = b.appliedAt) === null || _b === void 0 ? void 0 : _b.toDate) ? b.appliedAt.toDate().getTime() : 0;
                    return bt - at;
                });
        }
        return list;
    }, [applicants, statusFilter, viewedOnly, domainFilter, minScore, sortBy]);
    const markViewed = (id) => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId)
            return;
        setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`view-${id}`]: true })));
        try {
            setApplicants(prev => prev.map(a => a.id === id ? Object.assign(Object.assign({}, a), { viewed: true, viewedAt: new Date() }) : a));
            yield ApplicationsService.markViewed(id);
        }
        catch (error) {
            console.error('Error marking viewed:', error);
            setApplicants(prev => prev.map(a => a.id === id ? Object.assign(Object.assign({}, a), { viewed: false }) : a));
        }
        finally {
            setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`view-${id}`]: false })));
        }
    });
    const updateStatus = (id, next) => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId)
            return;
        setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`status-${id}`]: true })));
        try {
            setApplicants(prev => prev.map(a => a.id === id ? Object.assign(Object.assign({}, a), { status: next, stage: next }) : a));
            yield ApplicationsService.updateStatus(id, next);
        }
        catch (error) {
            console.error('Error updating status:', error);
            const list = yield ApplicationsService.getByJob(selectedJobId);
            setApplicants(list);
        }
        finally {
            setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`status-${id}`]: false })));
        }
    });
    const addNote = (id) => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId)
            return;
        const note = (noteDrafts[id] || '').trim();
        if (!note)
            return;
        setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`note-${id}`]: true })));
        try {
            yield ApplicationsService.addNote(id, note);
            setNoteDrafts(prev => (Object.assign(Object.assign({}, prev), { [id]: '' })));
        }
        catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Please try again.');
        }
        finally {
            setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`note-${id}`]: false })));
        }
    });
    const saveScore = (id) => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId)
            return;
        const raw = scoreDrafts[id];
        if (raw === undefined)
            return;
        const v = Number(raw);
        if (Number.isNaN(v) || v < 0 || v > 100) {
            alert('Score must be between 0 and 100');
            return;
        }
        setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`score-${id}`]: true })));
        try {
            setApplicants(prev => prev.map(a => a.id === id ? Object.assign(Object.assign({}, a), { score: v }) : a));
            yield ApplicationsService.scoreApplicant(id, v);
            setScoreDrafts(prev => (Object.assign(Object.assign({}, prev), { [id]: '' })));
        }
        catch (error) {
            console.error('Error saving score:', error);
            const list = yield ApplicationsService.getByJob(selectedJobId);
            setApplicants(list);
        }
        finally {
            setActionLoading(prev => (Object.assign(Object.assign({}, prev), { [`score-${id}`]: false })));
        }
    });
    const markAllViewed = () => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId || filtered.length === 0)
            return;
        setIsBulkUpdating(true);
        try {
            const toUpdate = filtered.filter(a => !a.viewed);
            setApplicants(prev => prev.map(a => toUpdate.some(t => t.id === a.id) ? Object.assign(Object.assign({}, a), { viewed: true, viewedAt: new Date() }) : a));
            yield Promise.all(toUpdate.map(a => ApplicationsService.markViewed(a.id)));
        }
        catch (error) {
            console.error('Error marking all viewed:', error);
            alert('Some updates failed. Please refresh.');
        }
        finally {
            setIsBulkUpdating(false);
        }
    });
    const setStatusForAll = (next) => __awaiter(this, void 0, void 0, function* () {
        if (!selectedJobId || filtered.length === 0)
            return;
        setIsBulkUpdating(true);
        try {
            setApplicants(prev => prev.map(a => filtered.some(f => f.id === a.id) ? Object.assign(Object.assign({}, a), { status: next, stage: next }) : a));
            yield Promise.all(filtered.map(a => ApplicationsService.updateStatus(a.id, next)));
        }
        catch (error) {
            console.error('Error updating status for all:', error);
            alert('Some updates failed. Please refresh.');
        }
        finally {
            setIsBulkUpdating(false);
        }
    });
    const exportCSV = () => {
        const rows = [
            ['Full Name', 'Email', 'Phone', 'Status', 'Viewed', 'Score', 'Applied At', 'Email Domain'].join(',')
        ];
        filtered.forEach(a => {
            var _a, _b;
            const applied = ((_a = a.appliedAt) === null || _a === void 0 ? void 0 : _a.toDate) ? a.appliedAt.toDate().toISOString() : '';
            rows.push([
                `"${(a.fullName || '').replace(/"/g, '""')}"`,
                `"${(a.email || '').replace(/"/g, '""')}"`,
                `"${(a.phone || '').replace(/"/g, '""')}"`,
                a.status || 'pending',
                a.viewed ? 'yes' : 'no',
                (_b = a.score) !== null && _b !== void 0 ? _b : '',
                applied,
                a.emailDomain || ''
            ].join(','));
        });
        const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.title) || 'applicants'}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    if (!user) {
        return (_jsxs("div", { className: "apps-auth-prompt", children: [_jsx("h2", { children: "Please sign in" }), _jsx(Link, { to: "/signin", className: "apps-btn primary", children: "Go to Sign In" })] }));
    }
    const statusSummary = useMemo(() => {
        const entries = Object.entries(stats.byStatus);
        return entries.map(([status, count]) => ({
            status,
            count,
            percentage: stats.total ? Math.round((count / stats.total) * 100) : 0,
        }));
    }, [stats]);
    const topDomains = useMemo(() => {
        const tally = {};
        applicants.forEach((a) => {
            if (a.emailDomain) {
                tally[a.emailDomain] = (tally[a.emailDomain] || 0) + 1;
            }
        });
        return Object.entries(tally)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }, [applicants]);
    const statusOptions = ['pending', 'reviewing', 'interview', 'offered', 'rejected', 'hired'];
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return _jsx(Clock, { size: 14 });
            case 'reviewing': return _jsx(Eye, { size: 14 });
            case 'interview': return _jsx(Briefcase, { size: 14 });
            case 'offered': return _jsx(Award, { size: 14 });
            case 'rejected': return _jsx(XCircle, { size: 14 });
            case 'hired': return _jsx(CheckCircle2, { size: 14 });
            default: return _jsx(Clock, { size: 14 });
        }
    };
    return (_jsx("div", { className: "apps-wrapper", children: _jsxs("div", { className: "apps-shell", children: [_jsxs("div", { className: "apps-header", children: [_jsxs(Link, { to: "/jobs", className: "apps-backlink", children: [_jsx(ArrowLeft, { size: 18 }), "Back to Jobs"] }), _jsxs("div", { className: "apps-header-title", children: [_jsxs("h1", { className: "apps-title", children: [_jsx(Users, { size: 32 }), "Applicants Dashboard"] }), _jsx("p", { className: "apps-subtitle", children: "Manage and review job applications" })] })] }), _jsxs("div", { className: "apps-summary", children: [_jsxs("div", { className: "summary-card", children: [_jsx("div", { className: "summary-icon-wrapper", style: { background: ' #667eea' }, children: _jsx(Users, { size: 24, color: 'white' }) }), _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-label", children: "Total Applicants" }), _jsx("span", { className: "summary-value", children: stats.total })] })] }), _jsxs("div", { className: "summary-card", children: [_jsx("div", { className: "summary-icon-wrapper", style: { background: ' #f093fb ' }, children: _jsx(Eye, { size: 24, color: 'white' }) }), _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-label", children: "Viewed" }), _jsx("span", { className: "summary-value", children: stats.viewed })] })] }), _jsxs("div", { className: "summary-card", children: [_jsx("div", { className: "summary-icon-wrapper", style: { background: ' #4facfe ' }, children: _jsx(Globe, { size: 24, color: 'white' }) }), _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-label", children: "Unique Domains" }), _jsx("span", { className: "summary-value", children: topDomains.length })] })] }), _jsxs("div", { className: "summary-card", children: [_jsx("div", { className: "summary-icon-wrapper", style: { background: '#fa709a ' }, children: _jsx(Calendar, { size: 24, color: 'white' }) }), _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-label", children: "Last Application" }), _jsx("span", { className: "summary-value-small", children: ((_a = selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.lastApplicationAt) === null || _a === void 0 ? void 0 : _a.toDate)
                                                ? selectedJob.lastApplicationAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                : '—' })] })] })] }), _jsxs("div", { className: "apps-layout", children: [_jsxs("div", { className: "apps-sidebar card", children: [_jsxs("h3", { className: "card-title", children: [_jsx(Briefcase, { size: 18 }), "My Jobs"] }), _jsxs("div", { className: "list-gap", children: [jobs.map((j) => {
                                            var _a;
                                            return (_jsxs("button", { onClick: () => setSelectedJobId(j.id), className: `joblist-item ${selectedJobId === j.id ? 'active' : ''}`, children: [_jsx("div", { className: "joblist-title", children: j.title }), _jsxs("div", { className: "joblist-meta", children: [_jsx(Users, { size: 12 }), (_a = j.applicantsCount) !== null && _a !== void 0 ? _a : 0, " applicants"] })] }, j.id));
                                        }), jobs.length === 0 && (_jsxs("div", { className: "apps-empty-state", children: [_jsx(Briefcase, { size: 48 }), _jsx("p", { children: "No jobs posted yet" })] }))] }), statusSummary.length > 0 && (_jsxs("div", { className: "apps-status-breakdown", children: [_jsxs("h4", { children: [_jsx(TrendingUp, { size: 14 }), "Status Breakdown"] }), _jsx("ul", { children: statusSummary.map(({ status, count, percentage }) => (_jsxs("li", { children: [_jsxs("span", { className: "status-label", children: [getStatusIcon(status), status] }), _jsxs("span", { className: "status-value", children: [count, " (", percentage, "%)"] })] }, status))) })] })), topDomains.length > 0 && (_jsxs("div", { className: "apps-status-breakdown", children: [_jsxs("h4", { children: [_jsx(Globe, { size: 14 }), "Top Email Domains"] }), _jsx("ul", { children: topDomains.map(([domain, count]) => (_jsxs("li", { children: [_jsx("span", { children: domain }), _jsx("span", { className: "domain-count", children: count })] }, domain))) })] }))] }), _jsxs("div", { className: "apps-content card", children: [_jsx("div", { className: "apps-content-header", children: _jsxs("div", { children: [_jsxs("h3", { className: "card-title", children: [(selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.title) || 'Select a job', (selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.company) && _jsxs("span", { className: "job-company", children: [" \u2022 ", selectedJob.company] })] }), _jsxs("div", { className: "apps-stats", children: [_jsxs("span", { children: [_jsx(Users, { size: 14 }), " ", stats.total] }), _jsxs("span", { children: [_jsx(Eye, { size: 14 }), " ", stats.viewed] }), Object.entries(stats.byStatus).map(([k, v]) => (_jsxs("span", { className: "status-stat", children: [getStatusIcon(k), k, ": ", v] }, k)))] })] }) }), _jsxs("div", { className: "apps-toolbar", children: [_jsxs("div", { className: "toolbar-group", children: [_jsx(Filter, { size: 16 }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "apps-input", children: [_jsx("option", { value: "all", children: "All statuses" }), statusOptions.map((status) => (_jsx("option", { value: status, children: status }, status)))] })] }), _jsxs("label", { className: "apps-checkbox", children: [_jsx("input", { type: "checkbox", checked: viewedOnly, onChange: (e) => setViewedOnly(e.target.checked) }), _jsx(Eye, { size: 14 }), "Viewed only"] }), _jsxs("div", { className: "toolbar-group", children: [_jsx(Search, { size: 16 }), _jsx("input", { placeholder: "Filter by email domain", value: domainFilter, onChange: (e) => setDomainFilter(e.target.value), className: "apps-input" })] }), _jsxs("div", { className: "toolbar-group", children: [_jsx(Star, { size: 16 }), _jsx("input", { type: "number", placeholder: "Min score", value: minScore, onChange: (e) => setMinScore(e.target.value), className: "apps-input narrow" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "apps-input", children: [_jsx("option", { value: "appliedAt_desc", children: "Newest applied" }), _jsx("option", { value: "appliedAt_asc", children: "Oldest applied" }), _jsx("option", { value: "score_desc", children: "Score high \u2192 low" }), _jsx("option", { value: "score_asc", children: "Score low \u2192 high" }), _jsx("option", { value: "name_az", children: "Name A \u2192 Z" })] }), _jsxs("button", { onClick: exportCSV, className: "apps-btn secondary", disabled: filtered.length === 0, children: [_jsx(Download, { size: 16 }), "Export CSV"] }), _jsxs("button", { onClick: markAllViewed, className: "apps-btn secondary", disabled: filtered.length === 0 || isBulkUpdating, children: [isBulkUpdating ? _jsx(Loader2, { size: 16, className: "spin" }) : _jsx(Eye, { size: 16 }), "Mark all viewed"] }), _jsxs("select", { onChange: (e) => e.target.value && setStatusForAll(e.target.value), defaultValue: "", className: "apps-input", disabled: filtered.length === 0 || isBulkUpdating, children: [_jsx("option", { value: "", disabled: true, children: "Set status for all" }), statusOptions.map((status) => (_jsx("option", { value: status, children: status }, status)))] })] }), loading ? (_jsxs("div", { className: "apps-loading", children: [_jsx(Loader2, { size: 32, className: "spin" }), _jsx("p", { children: "Loading applicants..." })] })) : filtered.length === 0 ? (_jsxs("div", { className: "apps-empty-state", children: [_jsx(Users, { size: 64 }), _jsx("h3", { children: "No applicants found" }), _jsx("p", { children: "Try adjusting your filters" })] })) : (_jsx("div", { className: "apps-list", children: filtered.map((a, idx) => {
                                        var _a, _b, _c, _d, _e, _f, _g;
                                        return (_jsxs("div", { className: "apps-card", style: { animationDelay: `${idx * 50}ms` }, children: [_jsx("div", { className: "apps-card-header", children: _jsxs("div", { className: "apps-card-main", children: [_jsxs("div", { className: "apps-card-title-row", children: [_jsx("h4", { className: "apps-name", children: a.fullName }), _jsxs("div", { className: `apps-status-badge status-${(a.status || 'pending').toLowerCase()}`, children: [getStatusIcon(a.status || 'pending'), a.status || 'pending'] })] }), _jsxs("div", { className: "apps-contact-info", children: [_jsxs("span", { className: "contact-item", children: [_jsx(Mail, { size: 14 }), a.email] }), a.phone && (_jsxs("span", { className: "contact-item", children: [_jsx(Phone, { size: 14 }), a.phone] })), _jsxs("span", { className: "contact-item", children: [_jsx(Calendar, { size: 14 }), ((_a = a.appliedAt) === null || _a === void 0 ? void 0 : _a.toDate) ? a.appliedAt.toDate().toLocaleDateString('en-US', {
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                year: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            }) : '—'] })] }), ((_b = a.userSnapshot) === null || _b === void 0 ? void 0 : _b.location) && (_jsxs("div", { className: "apps-chip", children: [_jsx(MapPin, { size: 12 }), a.userSnapshot.location] })), Array.isArray((_c = a.userSnapshot) === null || _c === void 0 ? void 0 : _c.skills) && a.userSnapshot.skills.length > 0 && (_jsx("div", { className: "apps-skill-row", children: a.userSnapshot.skills.slice(0, 5).map((skill) => (_jsxs("span", { className: "apps-chip skill", children: [_jsx(Sparkles, { size: 10 }), skill] }, skill))) }))] }) }), _jsxs("div", { className: "apps-actions", children: [a.cvBase64 ? (_jsxs("a", { href: a.cvBase64, download: a.cvFileName || 'cv', className: "apps-btn primary", children: [_jsx(Download, { size: 16 }), "Download CV"] })) : null, _jsxs("button", { onClick: () => markViewed(a.id), className: `apps-btn ${a.viewed ? 'viewed' : ''}`, disabled: actionLoading[`view-${a.id}`], children: [actionLoading[`view-${a.id}`] ? (_jsx(Loader2, { size: 16, className: "spin" })) : a.viewed ? (_jsx(CheckCircle2, { size: 16 })) : (_jsx(EyeOff, { size: 16 })), a.viewed ? 'Viewed' : 'Mark viewed'] }), _jsx("select", { value: a.status || 'pending', onChange: (e) => updateStatus(a.id, e.target.value), className: "apps-input status-select", disabled: actionLoading[`status-${a.id}`], children: statusOptions.map((status) => (_jsx("option", { value: status, children: status }, status))) })] }), _jsxs("div", { className: "apps-card-bottom", children: [_jsxs("div", { className: "score-section-wrapper", children: [_jsxs("div", { className: "section-header", children: [_jsx(Star, { size: 18 }), _jsx("span", { className: "section-title", children: "Applicant Score" }), typeof a.score === 'number' && (_jsxs("div", { className: "current-score-badge", children: ["Current: ", a.score, "/100"] }))] }), _jsxs("div", { className: "score-section", children: [_jsxs("div", { className: "input-group", children: [_jsx("input", { type: "number", placeholder: "Enter score (0-100)", value: (_d = scoreDrafts[a.id]) !== null && _d !== void 0 ? _d : '', onChange: (e) => setScoreDrafts(prev => (Object.assign(Object.assign({}, prev), { [a.id]: e.target.value }))), className: "apps-input score-input", min: "0", max: "100" }), _jsx("span", { className: "input-hint", children: "/ 100" })] }), _jsx("button", { onClick: () => saveScore(a.id), className: "apps-btn primary", disabled: actionLoading[`score-${a.id}`] || !((_e = scoreDrafts[a.id]) === null || _e === void 0 ? void 0 : _e.trim()), children: actionLoading[`score-${a.id}`] ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { size: 16 }), "Save Score"] })) })] })] }), _jsxs("div", { className: "note-section-wrapper", children: [_jsxs("div", { className: "section-header", children: [_jsx(MessageSquare, { size: 18 }), _jsx("span", { className: "section-title", children: "Add Note" }), Array.isArray(a.notes) && a.notes.length > 0 && (_jsxs("div", { className: "notes-count-badge", children: [a.notes.length, " note", a.notes.length > 1 ? 's' : ''] }))] }), _jsxs("div", { className: "note-section", children: [_jsx("div", { className: "input-group", children: _jsx("textarea", { placeholder: "Write your note here...", value: (_f = noteDrafts[a.id]) !== null && _f !== void 0 ? _f : '', onChange: (e) => setNoteDrafts(prev => (Object.assign(Object.assign({}, prev), { [a.id]: e.target.value }))), className: "apps-textarea", rows: 3, onKeyDown: (e) => {
                                                                                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                                                                        addNote(a.id);
                                                                                    }
                                                                                } }) }), _jsx("button", { onClick: () => addNote(a.id), className: "apps-btn primary", disabled: actionLoading[`note-${a.id}`] || !((_g = noteDrafts[a.id]) === null || _g === void 0 ? void 0 : _g.trim()), children: actionLoading[`note-${a.id}`] ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), "Adding..."] })) : (_jsxs(_Fragment, { children: [_jsx(MessageSquare, { size: 16 }), "Add Note"] })) }), _jsx("div", { className: "note-hint", children: "Press Ctrl+Enter to save quickly" })] })] })] }), _jsxs("div", { className: "apps-meta-row", children: [_jsxs("span", { className: a.viewed ? 'meta-viewed' : 'meta-not-viewed', children: [a.viewed ? _jsx(CheckCircle2, { size: 12 }) : _jsx(Clock, { size: 12 }), a.viewed ? 'Viewed' : 'Not viewed'] }), _jsxs("span", { children: [_jsx(Star, { size: 12 }), "Score: ", typeof a.score === 'number' ? `${a.score}/100` : '—'] }), _jsxs("span", { children: [_jsx(Globe, { size: 12 }), a.emailDomain || '—'] })] }), Array.isArray(a.notes) && a.notes.length > 0 && (_jsxs("div", { className: "apps-notes", children: [_jsxs("div", { className: "apps-notes-title", children: [_jsx(MessageSquare, { size: 14 }), "Notes History (", a.notes.length, ")"] }), _jsx("ul", { className: "apps-notes-list", children: a.notes.slice().reverse().map((n, idx) => {
                                                                var _a;
                                                                return (_jsxs("li", { children: [_jsxs("div", { className: "note-content", children: [_jsx(FileText, { size: 12 }), _jsx("span", { children: n.note })] }), ((_a = n.at) === null || _a === void 0 ? void 0 : _a.toDate) && (_jsx("span", { className: "apps-note-date", children: n.at.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }))] }, idx));
                                                            }) })] }))] }, a.id));
                                    }) }))] })] })] }) }));
}
