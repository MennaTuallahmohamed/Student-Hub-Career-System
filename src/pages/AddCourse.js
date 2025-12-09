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
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { CourseService } from '../firebase/src/firebaseServices';
import { BookOpen, Upload, DollarSign, Tag, FileText, User, Clock, Plus, X, Award, Globe, Link, Video, Image, File, Zap, Target, CheckCircle, ArrowLeft } from 'lucide-react';
import './AddCourse.css';
const AddCourse = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // ⚠️ تم حذف حقل `lessons` من هنا
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        instructor: '',
        duration: '',
        difficulty: '',
        certificate: false,
        overview: '',
        requirements: '',
        whatYouLearn: '',
    });
    const [courseLinks, setCourseLinks] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                const { UserService } = yield import('../firebase/src/firebaseServices');
                const data = yield UserService.getUserData(user.uid);
                setUserData(data);
                setLoading(false);
            }
            else {
                setLoading(false);
                navigate('/signin');
            }
        });
        fetchUserData();
    }, [user, navigate]);
    // التحقق من الصلاحية بعد تحميل البيانات
    useEffect(() => {
        if (!loading && userData && userData.role !== 'teacher') {
            alert('ليس لديك صلاحية رفع كورسات. يجب أن تكون مُدرّسًا.');
            navigate('/courses');
        }
    }, [loading, userData, navigate]);
    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbnail(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const addCourseLink = () => {
        const newLink = {
            id: Date.now().toString(),
            title: '',
            url: '',
            type: 'video'
        };
        setCourseLinks(prev => [...prev, newLink]);
    };
    const removeCourseLink = (id) => {
        setCourseLinks(prev => prev.filter(link => link.id !== id));
    };
    const updateCourseLink = (id, field, value) => {
        setCourseLinks(prev => prev.map(link => link.id === id ? Object.assign(Object.assign({}, link), { [field]: value }) : link));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!user)
            return;
        setSubmitting(true);
        setError(null);
        try {
            yield CourseService.uploadCourse({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                instructor: formData.instructor,
                duration: formData.duration,
                lessons: courseLinks.length,
                difficulty: formData.difficulty,
                certificate: formData.certificate,
                overview: formData.overview,
                requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
                whatYouLearn: formData.whatYouLearn.split(',').map(item => item.trim()).filter(item => item),
                courseLinks: courseLinks,
                thumbnail: thumbnail || undefined,
            }, user.uid);
            console.log('🔥 Course created successfully!', {
                title: formData.title,
                category: formData.category,
                courseLinks: courseLinks.length
            });
            alert('Course created successfully! 🎉');
            navigate('/courses');
        }
        catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred while creating the course.');
        }
        finally {
            setSubmitting(false);
        }
    });
    if (loading) {
        return (_jsxs("div", { style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
            }, children: [_jsxs("div", { style: {
                        background: "white",
                        borderRadius: "20px",
                        padding: "35px 45px",
                        textAlign: "center",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                        color: "#444",
                    }, children: [_jsx("div", { style: {
                                width: "48px",
                                height: "48px",
                                border: "3px solid rgba(0,0,0,0.08)",
                                borderTop: "3px solid #9b87f5", // soft lavender accent
                                borderRadius: "50%",
                                margin: "0 auto 18px",
                                animation: "spin 1.2s ease-in-out infinite",
                            } }), _jsx("h3", { style: { marginBottom: "6px", fontWeight: 600, color: "#333" }, children: "Loading..." }), _jsx("p", { style: { fontSize: "14px", color: "#777" }, children: "Please wait a moment \u2728" })] }), _jsx("style", { children: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        ` })] }));
    }
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }, children: [_jsx("div", { style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    marginBottom: '30px'
                }, children: _jsxs("button", { onClick: () => navigate('/courses'), style: {
                        background: '#3a25ff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '16px',
                        fontWeight: '500',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                    }, onMouseEnter: (e) => {
                        e.currentTarget.style.background = '#2d1bd0ff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }, onMouseLeave: (e) => {
                        e.currentTarget.style.background = '#2d1bd0ff';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }, children: [_jsx(ArrowLeft, { size: 20 }), "Back to Courses"] }) }), _jsxs("div", { style: {
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden'
                }, children: [_jsxs("div", { style: {
                            background: 'linear-gradient(135deg, #3a25ff 0%, #5a4bff 100%)',
                            padding: '40px',
                            textAlign: 'center',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }, children: [_jsx("div", { style: {
                                    position: 'absolute',
                                    top: '-50px',
                                    right: '-50px',
                                    width: '200px',
                                    height: '200px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '50%'
                                } }), _jsx("div", { style: {
                                    position: 'absolute',
                                    bottom: '-30px',
                                    left: '-30px',
                                    width: '150px',
                                    height: '150px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '50%'
                                } }), _jsxs("div", { style: { position: 'relative', zIndex: 2 }, children: [_jsx("div", { style: {
                                            width: '80px',
                                            height: '80px',
                                            background: 'rgba(255,255,255,0.2)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 20px',
                                            backdropFilter: 'blur(10px)'
                                        }, children: _jsx(BookOpen, { size: 40, color: "white" }) }), _jsx("h1", { style: {
                                            fontSize: '36px',
                                            fontWeight: '800',
                                            marginBottom: '12px',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }, children: "Create Amazing Course" }), _jsx("p", { style: {
                                            fontSize: '18px',
                                            opacity: 0.9,
                                            fontWeight: '300'
                                        }, children: "Build a professional course and share your expertise with students worldwide" })] })] }), error && (_jsx("div", { style: {
                            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                            color: 'white',
                            padding: '16px 24px',
                            margin: '20px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            fontWeight: '500',
                            boxShadow: '0 4px 12px rgba(255,107,107,0.3)'
                        }, children: error })), _jsx("div", { style: { padding: '40px' }, children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(BookOpen, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Course Title"] }), _jsx("div", { style: { position: 'relative' }, children: _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, required: true, placeholder: "e.g., Learn React from Scratch", style: {
                                                    width: '100%',
                                                    padding: '16px 20px',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '16px',
                                                    fontSize: '16px',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                    background: '#f8fafc',
                                                    fontWeight: '500'
                                                }, onFocus: (e) => {
                                                    e.currentTarget.style.borderColor = '#3a25ff';
                                                    e.currentTarget.style.background = 'white';
                                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                                }, onBlur: (e) => {
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                    e.currentTarget.style.background = '#f8fafc';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                } }) })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(FileText, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Course Description"] }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, required: true, placeholder: "Describe your course in detail...", rows: 4, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                fontFamily: 'inherit'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '20px'
                                            }, children: [_jsxs("label", { style: {
                                                        fontWeight: '700',
                                                        fontSize: '18px',
                                                        color: '#2d3748',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }, children: [_jsx(Link, { size: 24 }), "Course Links & Resources"] }), _jsxs("button", { type: "button", onClick: addCourseLink, style: {
                                                        background: 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        padding: '12px 20px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 4px 12px rgba(58, 37, 255, 0.3)'
                                                    }, onMouseEnter: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(58, 37, 255, 0.4)';
                                                    }, onMouseLeave: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 37, 255, 0.3)';
                                                    }, children: [_jsx(Plus, { size: 16 }), "Add Link"] })] }), courseLinks.length === 0 ? (_jsxs("div", { style: {
                                                background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                                                border: '2px dashed #cbd5e0',
                                                borderRadius: '16px',
                                                padding: '40px',
                                                textAlign: 'center',
                                                color: '#718096'
                                            }, children: [_jsx(Link, { size: 48, style: { marginBottom: '16px', opacity: 0.5 } }), _jsx("h3", { style: { marginBottom: '8px', color: '#4a5568' }, children: "No Links Added Yet" }), _jsx("p", { children: "Add course materials, videos, documents, and other resources" })] })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: courseLinks.map((link, index) => (_jsxs("div", { style: {
                                                    background: 'white',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '16px',
                                                    padding: '20px',
                                                    transition: 'all 0.3s ease',
                                                    position: 'relative'
                                                }, children: [_jsxs("div", { style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            marginBottom: '16px'
                                                        }, children: [_jsxs("div", { style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px'
                                                                }, children: [link.type === 'video' && _jsx(Video, { size: 20, color: "#3a25ff" }), link.type === 'document' && _jsx(File, { size: 20, color: "#3a25ff" }), link.type === 'image' && _jsx(Image, { size: 20, color: "#3a25ff" }), link.type === 'other' && _jsx(Link, { size: 20, color: "#3a25ff" }), _jsxs("span", { style: { fontWeight: '600', color: '#2d3748' }, children: ["Link #", index + 1] })] }), _jsx("button", { type: "button", onClick: () => removeCourseLink(link.id), style: {
                                                                    background: '#fed7d7',
                                                                    color: '#e53e3e',
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    padding: '8px',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.3s ease'
                                                                }, onMouseEnter: (e) => {
                                                                    e.currentTarget.style.background = '#feb2b2';
                                                                }, onMouseLeave: (e) => {
                                                                    e.currentTarget.style.background = '#fed7d7';
                                                                }, children: _jsx(X, { size: 16 }) })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                                            display: 'block',
                                                                            marginBottom: '8px',
                                                                            fontWeight: '600',
                                                                            fontSize: '14px',
                                                                            color: '#4a5568'
                                                                        }, children: "Link Title" }), _jsx("input", { type: "text", value: link.title, onChange: (e) => updateCourseLink(link.id, 'title', e.target.value), placeholder: "e.g., Introduction Video", style: {
                                                                            width: '100%',
                                                                            padding: '12px 16px',
                                                                            border: '2px solid #e2e8f0',
                                                                            borderRadius: '12px',
                                                                            fontSize: '14px',
                                                                            outline: 'none',
                                                                            transition: 'all 0.3s ease',
                                                                            background: '#f8fafc'
                                                                        }, onFocus: (e) => {
                                                                            e.currentTarget.style.borderColor = '#3a25ff';
                                                                            e.currentTarget.style.background = 'white';
                                                                        }, onBlur: (e) => {
                                                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                                                            e.currentTarget.style.background = '#f8fafc';
                                                                        } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                                            display: 'block',
                                                                            marginBottom: '8px',
                                                                            fontWeight: '600',
                                                                            fontSize: '14px',
                                                                            color: '#4a5568'
                                                                        }, children: "URL" }), _jsx("input", { type: "url", value: link.url, onChange: (e) => updateCourseLink(link.id, 'url', e.target.value), placeholder: "https://example.com", style: {
                                                                            width: '100%',
                                                                            padding: '12px 16px',
                                                                            border: '2px solid #e2e8f0',
                                                                            borderRadius: '12px',
                                                                            fontSize: '14px',
                                                                            outline: 'none',
                                                                            transition: 'all 0.3s ease',
                                                                            background: '#f8fafc'
                                                                        }, onFocus: (e) => {
                                                                            e.currentTarget.style.borderColor = '#3a25ff';
                                                                            e.currentTarget.style.background = 'white';
                                                                        }, onBlur: (e) => {
                                                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                                                            e.currentTarget.style.background = '#f8fafc';
                                                                        } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                                            display: 'block',
                                                                            marginBottom: '8px',
                                                                            fontWeight: '600',
                                                                            fontSize: '14px',
                                                                            color: '#4a5568'
                                                                        }, children: "Type" }), _jsxs("select", { value: link.type, onChange: (e) => updateCourseLink(link.id, 'type', e.target.value), style: {
                                                                            width: '100%',
                                                                            padding: '12px 16px',
                                                                            border: '2px solid #e2e8f0',
                                                                            borderRadius: '12px',
                                                                            fontSize: '14px',
                                                                            outline: 'none',
                                                                            transition: 'all 0.3s ease',
                                                                            background: '#f8fafc',
                                                                            cursor: 'pointer'
                                                                        }, onFocus: (e) => {
                                                                            e.currentTarget.style.borderColor = '#3a25ff';
                                                                            e.currentTarget.style.background = 'white';
                                                                        }, onBlur: (e) => {
                                                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                                                            e.currentTarget.style.background = '#f8fafc';
                                                                        }, children: [_jsx("option", { value: "video", children: "Video" }), _jsx("option", { value: "document", children: "Document" }), _jsx("option", { value: "image", children: "Image" }), _jsx("option", { value: "other", children: "Other" })] })] })] })] }, link.id))) }))] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Tag, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Category"] }), _jsxs("select", { name: "category", value: formData.category, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                cursor: 'pointer'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }, children: [_jsx("option", { value: "", children: "Choose Category" }), _jsx("option", { value: "programming", children: "Programming" }), _jsx("option", { value: "design", children: "Design" }), _jsx("option", { value: "marketing", children: "Marketing" }), _jsx("option", { value: "business", children: "Business" }), _jsx("option", { value: "languages", children: "Languages" }), _jsx("option", { value: "data-science", children: "Data Science" }), _jsx("option", { value: "web-development", children: "Web Development" }), _jsx("option", { value: "mobile-development", children: "Mobile Development" }), _jsx("option", { value: "ai-ml", children: "AI & Machine Learning" }), _jsx("option", { value: "cybersecurity", children: "Cybersecurity" })] })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(User, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Instructor Name"] }), _jsx("input", { type: "text", name: "instructor", value: formData.instructor, onChange: handleChange, required: true, placeholder: "e.g., John Smith", style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Clock, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Course Duration"] }), _jsx("input", { type: "text", name: "duration", value: formData.duration, onChange: handleChange, required: true, placeholder: "e.g., 1 hour, 40 Minutes, 32 hours", style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Target, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Difficulty Level"] }), _jsxs("select", { name: "difficulty", value: formData.difficulty, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                cursor: 'pointer'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }, children: [_jsx("option", { value: "", children: "Choose Difficulty Level" }), _jsx("option", { value: "Beginner", children: "Beginner" }), _jsx("option", { value: "Intermediate", children: "Intermediate" }), _jsx("option", { value: "Advanced", children: "Advanced" }), _jsx("option", { value: "Beginner to Advanced", children: "Beginner to Advanced" })] })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(DollarSign, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Price (USD)"] }), _jsx("input", { type: "text", name: "price", value: formData.price, onChange: handleChange, required: true, placeholder: "e.g., 49.99 or Free", style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsx("div", { style: { marginBottom: '32px' }, children: _jsxs("label", { style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            fontWeight: '700',
                                            fontSize: '16px',
                                            color: '#2d3748',
                                            cursor: 'pointer',
                                            padding: '16px 20px',
                                            background: '#f8fafc',
                                            borderRadius: '16px',
                                            border: '2px solid #e2e8f0',
                                            transition: 'all 0.3s ease'
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.borderColor = '#3a25ff';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.background = '#f8fafc';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                        }, children: [_jsx("input", { type: "checkbox", name: "certificate", checked: formData.certificate, onChange: (e) => setFormData(prev => (Object.assign(Object.assign({}, prev), { certificate: e.target.checked }))), style: {
                                                    transform: 'scale(1.3)',
                                                    accentColor: '#3a25ff'
                                                } }), _jsx(Award, { size: 20, style: { color: '#3a25ff' } }), _jsx("span", { children: "Course Completion Certificate" })] }) }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Globe, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Course Overview"] }), _jsx("textarea", { name: "overview", value: formData.overview, onChange: handleChange, required: true, placeholder: "Provide a comprehensive description of your course...", rows: 4, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                fontFamily: 'inherit'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(CheckCircle, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Requirements (comma-separated)"] }), _jsx("textarea", { name: "requirements", value: formData.requirements, onChange: handleChange, placeholder: "e.g., Basic programming knowledge, Computer, Internet connection", rows: 3, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                fontFamily: 'inherit'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Zap, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "What Students Will Learn (comma-separated)"] }), _jsx("textarea", { name: "whatYouLearn", value: formData.whatYouLearn, onChange: handleChange, placeholder: "e.g., Learn programming fundamentals, Build web applications, Use development tools", rows: 3, style: {
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'all 0.3s ease',
                                                background: '#f8fafc',
                                                fontWeight: '500',
                                                fontFamily: 'inherit'
                                            }, onFocus: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                                            }, onBlur: (e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } })] }), _jsxs("div", { style: { marginBottom: '32px' }, children: [_jsxs("label", { style: {
                                                display: 'block',
                                                marginBottom: '12px',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#2d3748'
                                            }, children: [_jsx(Image, { size: 20, style: { marginRight: '8px', display: 'inline', verticalAlign: 'middle' } }), "Course Thumbnail"] }), _jsxs("div", { onClick: () => { var _a; return (_a = document.getElementById('thumbnail-input')) === null || _a === void 0 ? void 0 : _a.click(); }, style: {
                                                border: '2px dashed #cbd5e0',
                                                borderRadius: '16px',
                                                padding: '40px',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }, onMouseEnter: (e) => {
                                                e.currentTarget.style.borderColor = '#3a25ff';
                                                e.currentTarget.style.background = 'linear-gradient(135deg, #f0f4ff, #e6f3ff)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(58, 37, 255, 0.15)';
                                            }, onMouseLeave: (e) => {
                                                e.currentTarget.style.borderColor = '#cbd5e0';
                                                e.currentTarget.style.background = 'linear-gradient(135deg, #f7fafc, #edf2f7)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }, children: [previewUrl ? (_jsxs("div", { style: { position: 'relative' }, children: [_jsx("img", { src: previewUrl, alt: "Course Preview", style: {
                                                                maxWidth: '100%',
                                                                maxHeight: '200px',
                                                                borderRadius: '12px',
                                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                            } }), _jsx("div", { style: {
                                                                position: 'absolute',
                                                                top: '8px',
                                                                right: '8px',
                                                                background: 'rgba(58, 37, 255, 0.9)',
                                                                color: 'white',
                                                                padding: '4px 8px',
                                                                borderRadius: '6px',
                                                                fontSize: '12px',
                                                                fontWeight: '600'
                                                            }, children: "Preview" })] })) : (_jsxs("div", { children: [_jsx("div", { style: {
                                                                width: '80px',
                                                                height: '80px',
                                                                background: 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                margin: '0 auto 16px',
                                                                boxShadow: '0 4px 12px rgba(58, 37, 255, 0.3)'
                                                            }, children: _jsx(Upload, { size: 32, color: "white" }) }), _jsx("h3", { style: { color: '#2d3748', marginBottom: '8px', fontSize: '18px' }, children: "Upload Course Thumbnail" }), _jsx("p", { style: { color: '#718096', marginBottom: '16px' }, children: "Click to select an image (JPG, PNG, GIF)" }), _jsxs("div", { style: {
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                background: 'rgba(58, 37, 255, 0.1)',
                                                                color: '#3a25ff',
                                                                padding: '8px 16px',
                                                                borderRadius: '8px',
                                                                fontSize: '14px',
                                                                fontWeight: '600'
                                                            }, children: [_jsx(Image, { size: 16 }), "Choose File"] })] })), _jsx("input", { id: "thumbnail-input", type: "file", accept: "image/*", onChange: handleThumbnailChange, style: { display: 'none' } })] })] }), _jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '16px',
                                        marginTop: '40px',
                                        paddingTop: '32px',
                                        borderTop: '2px solid #e2e8f0'
                                    }, children: [_jsxs("button", { type: "button", onClick: () => navigate('/courses'), style: {
                                                flex: 1,
                                                padding: '16px 24px',
                                                background: 'linear-gradient(135deg, #718096, #4a5568)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }, onMouseEnter: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(113, 128, 150, 0.3)';
                                            }, onMouseLeave: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }, children: [_jsx(ArrowLeft, { size: 20 }), "Cancel"] }), _jsx("button", { type: "submit", disabled: submitting, style: {
                                                flex: 2,
                                                padding: '16px 24px',
                                                background: submitting
                                                    ? 'linear-gradient(135deg, #a0aec0, #718096)'
                                                    : 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '16px',
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                cursor: submitting ? 'not-allowed' : 'pointer',
                                                boxShadow: submitting
                                                    ? 'none'
                                                    : '0 8px 25px rgba(58, 37, 255, 0.4)',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '12px',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }, onMouseEnter: (e) => {
                                                if (!submitting) {
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(58, 37, 255, 0.5)';
                                                }
                                            }, onMouseLeave: (e) => {
                                                if (!submitting) {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(58, 37, 255, 0.4)';
                                                }
                                            }, children: submitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "loading-spinner", style: {
                                                            width: '20px',
                                                            height: '20px',
                                                            border: '2px solid rgba(255,255,255,0.3)',
                                                            borderTop: '2px solid white',
                                                            borderRadius: '50%'
                                                        } }), "Creating Course..."] })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { size: 20 }), "Create Amazing Course"] })) })] })] }) })] })] }));
};
export default AddCourse;
