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
// src/pages/EditCourse.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { CourseService } from '../firebase/src/firebaseServices';
const EditCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [saving, setSaving] = useState(false);
    // التحقق من تسجيل الدخول
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            }
            else {
                navigate('/signin');
            }
        });
        return () => unsubscribe();
    }, [navigate]);
    // جلب الكورسات الخاصة بالمدرس
    useEffect(() => {
        if (!currentUser)
            return;
        const fetchCourses = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const myCourses = yield CourseService.getMyCourses(currentUser.uid);
                setCourses(myCourses);
            }
            catch (err) {
                console.error('Error loading courses:', err);
            }
            finally {
                setLoading(false);
            }
        });
        fetchCourses();
    }, [currentUser]);
    const handleEdit = (course) => {
        setSelectedCourse(course);
    };
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedCourse || !currentUser || !selectedCourse.id)
            return;
        setSaving(true);
        try {
            yield CourseService.updateCourse(selectedCourse.id, selectedCourse, currentUser.uid);
            alert('✅ Course updated successfully!');
            // إعادة تحميل القائمة
            const updated = yield CourseService.getMyCourses(currentUser.uid);
            setCourses(updated);
            setSelectedCourse(null);
        }
        catch (err) {
            alert('❌ ' + (err.message || 'Failed to save changes.'));
        }
        finally {
            setSaving(false);
        }
    });
    const handleAddLink = () => {
        if (!selectedCourse)
            return;
        const newLinks = [
            ...(selectedCourse.courseLinks || []),
            { id: Date.now().toString(), title: '', url: '', type: 'video' }
        ];
        setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { courseLinks: newLinks }));
    };
    const handleRemoveLink = (index) => {
        if (!selectedCourse)
            return;
        const newLinks = selectedCourse.courseLinks.filter((_, i) => i !== index);
        setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { courseLinks: newLinks }));
    };
    if (loading) {
        return _jsx("div", { style: { padding: '3rem', textAlign: 'center', fontSize: '1.2rem' }, children: "Loading your courses..." });
    }
    return (_jsxs("div", { style: { maxWidth: '800px', margin: '2rem auto', padding: '1.5rem', fontFamily: 'Arial, sans-serif' }, children: [_jsx("h2", { style: { textAlign: 'center', color: '#2563eb', marginBottom: '1.5rem' }, children: "Edit My Courses" }), courses.length === 0 ? (_jsx("p", { style: { textAlign: 'center', color: '#666' }, children: "You haven't created any courses yet." })) : (_jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '1rem' }, children: "Your Courses:" }), courses.map((course) => (_jsxs("div", { style: {
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: '#f9f9f9',
                        }, children: [_jsx("h4", { children: course.title }), _jsxs("p", { style: { color: '#555', fontSize: '0.9rem' }, children: [course.category, " \u2022 ", course.duration, " \u2022 ", course.price || 'Free'] }), _jsx("button", { onClick: () => handleEdit(course), style: {
                                    marginTop: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }, children: "Edit" })] }, course.id)))] })), selectedCourse && (_jsxs("div", { style: {
                    marginTop: '2rem',
                    padding: '1.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                }, children: [_jsxs("h3", { children: ["Edit: ", selectedCourse.title] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Course Title" }) }), _jsx("input", { type: "text", value: selectedCourse.title, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { title: e.target.value })), style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Description" }) }), _jsx("textarea", { value: selectedCourse.description, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { description: e.target.value })), rows: 3, style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Category" }) }), _jsx("input", { type: "text", value: selectedCourse.category, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { category: e.target.value })), style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Instructor" }) }), _jsx("input", { type: "text", value: selectedCourse.instructor, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { instructor: e.target.value })), style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Duration" }) }), _jsx("input", { type: "text", value: selectedCourse.duration, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { duration: e.target.value })), style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Price (USD)" }) }), _jsx("input", { type: "text", value: selectedCourse.price || '', onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { price: e.target.value })), placeholder: "e.g., 49.99 or Free", style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' } })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Difficulty" }) }), _jsxs("select", { value: selectedCourse.difficulty, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { difficulty: e.target.value })), style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' }, children: [_jsx("option", { value: "Beginner", children: "Beginner" }), _jsx("option", { value: "Intermediate", children: "Intermediate" }), _jsx("option", { value: "Advanced", children: "Advanced" })] })] }), _jsx("div", { style: { marginBottom: '1rem' }, children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedCourse.certificate, onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { certificate: e.target.checked })), style: { marginRight: '0.5rem' } }), _jsx("strong", { children: "Course Completion Certificate" })] }) }), _jsxs("div", { style: { marginBottom: '1.5rem' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }, children: [_jsx("h4", { children: _jsx("strong", { children: "Course Links" }) }), _jsx("button", { onClick: handleAddLink, style: {
                                            padding: '0.3rem 0.8rem',
                                            backgroundColor: '#10b981',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                        }, children: "+ Add Link" })] }), (selectedCourse.courseLinks || []).map((link, i) => (_jsxs("div", { style: { display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }, children: [_jsx("input", { type: "text", placeholder: "Title", value: link.title, onChange: (e) => {
                                            const newLinks = [...selectedCourse.courseLinks];
                                            newLinks[i] = Object.assign(Object.assign({}, newLinks[i]), { title: e.target.value });
                                            setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { courseLinks: newLinks }));
                                        }, style: { flex: 1, padding: '0.4rem' } }), _jsx("input", { type: "text", placeholder: "YouTube URL", value: link.url, onChange: (e) => {
                                            const newLinks = [...selectedCourse.courseLinks];
                                            newLinks[i] = Object.assign(Object.assign({}, newLinks[i]), { url: e.target.value });
                                            setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { courseLinks: newLinks }));
                                        }, style: { flex: 2, padding: '0.4rem' } }), _jsx("button", { onClick: () => handleRemoveLink(i), style: {
                                            padding: '0.4rem 0.6rem',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                        }, children: "\u2715" })] }, i)))] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { children: _jsx("strong", { children: "Overview" }) }), _jsx("textarea", { value: selectedCourse.overview || '', onChange: (e) => setSelectedCourse(Object.assign(Object.assign({}, selectedCourse), { overview: e.target.value })), rows: 3, style: { width: '100%', padding: '0.5rem', marginTop: '0.25rem' }, placeholder: "Course overview..." })] }), _jsx("button", { onClick: handleSave, disabled: saving, style: {
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: saving ? '#9ca3af' : '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: saving ? 'not-allowed' : 'pointer',
                        }, children: saving ? 'Saving...' : 'Save Changes' }), _jsx("button", { onClick: () => setSelectedCourse(null), style: {
                            width: '100%',
                            padding: '0.5rem',
                            marginTop: '0.5rem',
                            backgroundColor: '#f3f4f6',
                            color: '#1f2937',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }, children: "Cancel" })] }))] }));
};
export default EditCourse;
