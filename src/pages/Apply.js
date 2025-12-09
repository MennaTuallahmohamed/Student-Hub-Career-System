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
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Globe, DollarSign, Cpu, UploadCloud } from 'lucide-react';
import './Apply.css';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService } from '../firebase/src/firebaseServices';
function JobApplicationPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState(null);
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        cvFileName: '',
        cvBase64: ''
    });
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    useEffect(() => {
        const fetchJob = () => __awaiter(this, void 0, void 0, function* () {
            if (!jobId)
                return;
            try {
                const jobRef = doc(db, 'jobs', jobId);
                const jobSnap = yield getDoc(jobRef);
                if (jobSnap.exists()) {
                    const jobData = jobSnap.data();
                    setJobDetails(Object.assign({ id: jobSnap.id }, jobData));
                }
                else {
                    setJobDetails(null);
                }
            }
            catch (error) {
                console.error("Error fetching job details: ", error);
            }
        });
        fetchJob();
    }, [jobId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                setErrors({ cvFile: 'File size must be less than 1MB.' });
                setFileName('');
                return;
            }
            setFileName(file.name);
            setErrors(prev => (Object.assign(Object.assign({}, prev), { cvFile: undefined })));
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => (Object.assign(Object.assign({}, prev), { cvFileName: file.name, cvBase64: base64String, cvSize: file.size, cvType: file.type })));
            };
            reader.readAsDataURL(file);
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim())
            newErrors.fullName = 'Full name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.cvBase64)
            newErrors.cvFile = 'CV is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        e.preventDefault();
        if (!validateForm() || !jobDetails)
            return;
        setSubmissionStatus('submitting');
        try {
            // Duplicate protection
            if (user === null || user === void 0 ? void 0 : user.uid) {
                const q1 = query(collection(db, 'applications'), where('jobId', '==', jobDetails.id), where('userId', '==', user.uid));
                const r1 = yield getDocs(q1);
                if (!r1.empty) {
                    alert('You have already applied to this job.');
                    setSubmissionStatus('idle');
                    return;
                }
            }
            else if (formData.email) {
                const q2 = query(collection(db, 'applications'), where('jobId', '==', jobDetails.id), where('email', '==', formData.email));
                const r2 = yield getDocs(q2);
                if (!r2.empty) {
                    alert('This email has already applied to this job.');
                    setSubmissionStatus('idle');
                    return;
                }
            }
            const emailDomain = ((_b = (_a = formData.email) === null || _a === void 0 ? void 0 : _a.split('@')[1]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || null;
            const nameLower = ((_c = formData.fullName) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
            let userSnapshot = null;
            if (user === null || user === void 0 ? void 0 : user.uid) {
                try {
                    userSnapshot = yield UserService.getUserData(user.uid);
                }
                catch (_d) { }
            }
            const docRef = yield addDoc(collection(db, 'applications'), {
                jobId: jobDetails.id,
                jobTitle: jobDetails.title,
                jobCompany: jobDetails.company || null,
                posterId: jobDetails.posterId || null,
                posterName: jobDetails.posterName || null,
                userId: (user === null || user === void 0 ? void 0 : user.uid) || null,
                fullName: formData.fullName,
                email: formData.email,
                emailDomain,
                phone: formData.phone || '',
                coverLetter: formData.coverLetter,
                cvFileName: formData.cvFileName,
                cvBase64: formData.cvBase64,
                cvMeta: {
                    size: formData.cvSize || null,
                    type: formData.cvType || null,
                },
                appliedAt: serverTimestamp(),
                status: 'pending',
                viewed: false,
                stage: 'applied',
                statusHistory: [
                    { status: 'applied', at: new Date() }
                ],
                score: null,
                notes: null,
                submittedByAuth: !!(user === null || user === void 0 ? void 0 : user.uid),
                userSnapshot: userSnapshot ? {
                    uid: userSnapshot.uid || (user === null || user === void 0 ? void 0 : user.uid) || null,
                    displayName: userSnapshot.displayName || null,
                    photoURL: userSnapshot.photoURL || null,
                    role: userSnapshot.role || null,
                    location: userSnapshot.location || null,
                    firstName: userSnapshot.firstName || null,
                    lastName: userSnapshot.lastName || null,
                    skills: userSnapshot.skills || [],
                } : null,
                nameLower,
                lastUpdatedAt: serverTimestamp(),
            });
            // Update counters on job doc
            try {
                const updateData = {
                    applicantsCount: increment(1),
                    lastApplicationAt: serverTimestamp(),
                };
                if (user === null || user === void 0 ? void 0 : user.uid) {
                    updateData.applicantsUserIds = arrayUnion(user.uid);
                }
                else if (formData.email) {
                    updateData.applicantsUserIds = arrayUnion(`email:${formData.email}`);
                }
                if (emailDomain) {
                    updateData.applicantsEmailDomains = arrayUnion(emailDomain);
                }
                yield updateDoc(doc(db, 'jobs', jobDetails.id), updateData);
            }
            catch (_e) { }
            if (user === null || user === void 0 ? void 0 : user.uid) {
                try {
                    yield UserService.incrementField(user.uid, 'appliedJobs');
                }
                catch (_f) { }
            }
            setSubmissionStatus('success');
            navigate('/confirmation', {
                state: {
                    jobDetails,
                    formData,
                    applicationId: `APP-${docRef.id.substring(0, 8).toUpperCase()}`
                }
            });
        }
        catch (error) {
            console.error("Error submitting application: ", error);
            setSubmissionStatus('error');
            alert("Failed to submit application. Please try again.");
            setSubmissionStatus('idle');
        }
    });
    if (!jobDetails) {
        return (_jsx("div", { className: "job-application-page", children: _jsxs("div", { className: "container", children: [_jsx("h2", { children: "Job Not Found" }), _jsx("p", { children: "The job you are looking for does not exist or may have been filled." }), _jsxs(Link, { to: "/jobs", className: "back-link", children: [_jsx(ArrowLeft, { size: 18 }), " Back to Job Listings"] })] }) }));
    }
    return (_jsx("div", { className: "job-application-page", children: _jsxs("div", { className: "container", children: [_jsxs(Link, { to: "/jobs", className: "back-link", children: [_jsx(ArrowLeft, { size: 18 }), " Back to Job Listings"] }), _jsxs("div", { className: "application-header", children: [_jsxs("h1", { children: ["Apply for ", jobDetails.title] }), _jsxs("div", { className: "job-meta", children: [_jsxs("span", { children: [_jsx(MapPin, { size: 16 }), " ", jobDetails.location] }), _jsxs("span", { children: [_jsx(Globe, { size: 16 }), " ", jobDetails.remote] }), _jsxs("span", { children: [_jsx(Briefcase, { size: 16 }), " ", jobDetails.type] }), _jsxs("span", { children: [_jsx(DollarSign, { size: 16 }), " ", jobDetails.salary, " / month"] })] }), _jsxs("div", { className: "job-tech", children: [_jsx(Cpu, { size: 16 }), _jsx("strong", { children: "Tech Stack:" }), " ", jobDetails.tech] })] }), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [_jsxs("div", { className: "ApplyFormsection", children: [_jsx("h3", { children: "Personal Information" }), _jsxs("div", { className: "ApplyFormgrid", children: [_jsxs("div", { className: "ApplyFormgroup", children: [_jsx("label", { htmlFor: "fullName", children: "Full Name" }), _jsx("input", { type: "text", id: "fullName", name: "fullName", value: formData.fullName, onChange: handleInputChange, required: true }), errors.fullName && _jsx("span", { className: "error-text", children: errors.fullName })] }), _jsxs("div", { className: "ApplyFormgroup", children: [_jsx("label", { htmlFor: "email", children: "Email Address" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, required: true }), errors.email && _jsx("span", { className: "error-text", children: errors.email })] }), _jsxs("div", { className: "ApplyFormgroup", children: [_jsx("label", { htmlFor: "phone", children: "Phone Number (Optional)" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange })] })] })] }), _jsxs("div", { className: "ApplyFormsection", children: [_jsx("h3", { children: "Resume / CV" }), _jsxs("div", { className: "ApplyFormgroup", children: [_jsxs("label", { htmlFor: "cvFile", className: "file-upload-label", children: [_jsx(UploadCloud, { size: 20 }), _jsx("span", { children: fileName ? fileName : 'Upload Your CV' })] }), _jsx("input", { type: "file", id: "cvFile", name: "cvFile", onChange: handleFileChange, accept: ".pdf,.doc,.docx", hidden: true }), errors.cvFile && _jsx("span", { className: "error-text", children: errors.cvFile })] }), _jsx("p", { className: "file-instructions", children: "Accepted file types: PDF, DOC, DOCX. Max size: 1MB." })] }), _jsxs("div", { className: "ApplyFormsection", children: [_jsx("h3", { children: "Cover Letter (Optional)" }), _jsx("div", { className: "ApplyFormgroup", children: _jsx("textarea", { id: "coverLetter", name: "coverLetter", rows: 6, value: formData.coverLetter, onChange: handleInputChange }) })] }), _jsx("div", { className: "ApplyFormactions", children: _jsx("button", { type: "submit", className: "submit-button", disabled: submissionStatus === 'submitting', children: submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Application' }) })] })] }) }));
}
export default JobApplicationPage;
