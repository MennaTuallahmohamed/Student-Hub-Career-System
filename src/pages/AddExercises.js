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
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { ExercisesService, UserService } from '../firebase/src/firebaseServices';
import { BookOpen, ArrowLeft } from 'lucide-react';
import './AddCourse.css';
const AddExercise = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        difficulty: '',
        duration: '',
        points: 0,
        completed: false,
        questions: [
            { question: '', correctAnswer: '', options: ['', '', '', ''] }
        ],
    });
    useEffect(() => {
        const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
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
    useEffect(() => {
        if (!loading && userData && userData.role !== 'teacher') {
            alert('ليس لديك صلاحية رفع كورسات. يجب أن تكون مُدرّسًا.');
            navigate('/courses');
        }
    }, [loading, userData, navigate]);
    // Add a new question
    const addQuestion = () => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { questions: [
                ...prev.questions,
                { question: '', options: ['', '', '', ''], correctAnswer: '' }
            ] })));
    };
    // Handle question text change
    const handleQuestionChange = (qIndex, value) => {
        const updated = [...formData.questions];
        updated[qIndex].question = value;
        setFormData(Object.assign(Object.assign({}, formData), { questions: updated }));
    };
    // Handle option change
    const handleOptionChange = (qIndex, optIndex, value) => {
        const updated = [...formData.questions];
        updated[qIndex].options[optIndex] = value;
        setFormData(Object.assign(Object.assign({}, formData), { questions: updated }));
    };
    // Handle correct answer change
    const handleCorrectAnswerChange = (qIndex, value) => {
        const updated = [...formData.questions];
        updated[qIndex].correctAnswer = value;
        setFormData(Object.assign(Object.assign({}, formData), { questions: updated }));
    };
    // Handle generic input change
    const handleChange = (e) => {
        const target = e.target;
        const { name } = target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        }
        else if (target.type === 'number') {
            const num = target.value;
            value = num === '' ? '' : Number(num);
        }
        else {
            value = target.value;
        }
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    // Handle form submit
    const handleExerciseSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!user)
            return;
        setSubmitting(true);
        setError(null);
        try {
            yield ExercisesService.uploadExercises(formData, user.uid);
            alert('Exercise created successfully! 🎉');
            navigate('/exercises');
        }
        catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred while creating the exercise.');
        }
        finally {
            setSubmitting(false);
        }
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
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
    const handleExerciseChange = (e) => {
        const target = e.target;
        const { name } = target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        }
        else if (target.type === 'number') {
            const num = target.value;
            value = num === '' ? '' : Number(num);
        }
        else {
            value = target.value;
        }
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!user)
            return;
        setSubmitting(true);
        setError(null);
        try {
            yield ExercisesService.uploadExercises({
                id: formData.id,
                title: formData.title,
                difficulty: formData.difficulty,
                duration: formData.duration,
                points: formData.points, // Added for exercise
                completed: formData.completed, // Added for exercise
                questions: formData.questions, // Added for exercise
            }, user.uid);
            console.log('🔥 Exercise created successfully!', {
                title: formData.title,
                difficulty: formData.difficulty // Changed field (category replaced with difficulty)
            });
            alert('Exercise created successfully! 🎉'); // Changed alert message
            navigate('/exercises'); // Changed navigation target
        }
        catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred while creating the exercise.'); // Changed error message
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
    return ( // This is the code you asked for after the return statement
    _jsxs("div", { style: styles.container, children: [_jsx("div", { style: {
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
                    }, children: [_jsx(ArrowLeft, { size: 20 }), "Back to Courses"] }) }), _jsx("div", { style: {
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden'
                } }), _jsxs("div", { style: {
                    background: 'linear-gradient(135deg, #3a25ff 0%, #5a4bff 100%)',
                    textAlign: "center",
                    marginBottom: '20px',
                    color: "white",
                    width: "100%", // make it full width of the container
                    padding: "50px 0", // remove fixed height; use padding instead
                    borderRadius: "20px 20px 0 0", // rounded only at the top
                    position: "relative",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // soft modern shadow
                    overflow: "hidden",
                    fontFamily: "'Poppins', sans-serif",
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
                                }, children: "Create Amazing Exersices" }), _jsx("p", { style: {
                                    fontSize: '18px',
                                    opacity: 0.9,
                                    fontWeight: '300'
                                }, children: "Build a professional course and share your expertise with students worldwide" })] })] }), _jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [_jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "title", style: styles.label, children: "Title" }), _jsx("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "difficulty", style: styles.label, children: "Difficulty" }), _jsxs("select", { id: "difficulty", name: "difficulty", value: formData.difficulty, onChange: handleChange, required: true, style: styles.input, children: [_jsx("option", { value: "", children: "Select Difficulty" }), _jsx("option", { value: "beginner", children: "beginner" }), _jsx("option", { value: "intermediate", children: "intermediate" }), _jsx("option", { value: "advanced", children: "advanced" })] })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "duration", style: styles.label, children: "Duration (e.g., \"30 minutes\")" }), _jsx("input", { type: "text", id: "duration", name: "duration", value: formData.duration, onChange: handleChange, style: styles.input })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "points", style: styles.label, children: "Points" }), _jsx("input", { type: "number", id: "points", name: "points", value: formData.points, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("div", { style: styles.checkboxGroup, children: [_jsx("input", { type: "checkbox", name: "completed", checked: formData.completed, onChange: handleChange, id: "completed", style: styles.checkboxInput }), _jsx("label", { htmlFor: "completed", style: styles.checkboxLabel, children: "Completed" })] }), formData.questions.map((q, qIndex) => (_jsxs("div", { style: styles.questionCard, children: [_jsxs("label", { style: styles.label, children: ["Question ", qIndex + 1] }), _jsx("input", { type: "text", value: q.question, placeholder: "Enter question text", onChange: e => handleQuestionChange(qIndex, e.target.value), required: true, style: styles.input }), _jsx("h4", { style: styles.subHeading, children: "Options:" }), q.options.map((opt, optIndex) => (_jsx("input", { type: "text", value: opt, placeholder: `Option ${optIndex + 1}`, onChange: e => handleOptionChange(qIndex, optIndex, e.target.value), required: true, style: styles.optionInput }, optIndex))), _jsx("label", { style: styles.label, children: "Correct Answer" }), _jsx("input", { type: "text", value: q.correctAnswer, placeholder: "Enter correct answer", onChange: e => handleCorrectAnswerChange(qIndex, e.target.value), required: true, style: styles.input })] }, qIndex))), _jsxs("div", { style: styles.buttonContainer, children: [_jsx("button", { type: "button", onClick: addQuestion, style: styles.addButton, children: " + Add Question" }), _jsx("button", { type: "submit", disabled: submitting, style: Object.assign(Object.assign({}, styles.button), styles.submitButton), children: submitting ? 'Submitting...' : (formData.id ? 'Update Exercise' : 'Create Exercise') }), "    "] })] })] }));
};
// Inline styles object for modern appearance
const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        background: 'transparent', // no white
        borderRadius: '0', // flat edges to match header
        boxShadow: 'none',
        padding: '50px 0',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.2em',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
        fontWeight: '600',
    },
    errorMessage: {
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '8px',
        padding: '10px 15px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#555',
        fontSize: '1em',
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        fontSize: '1em',
        color: '#495057',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    inputFocus: {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    checkboxGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
    },
    checkboxInput: {
        marginRight: '10px',
        width: '18px',
        height: '18px',
        accentColor: '#007bff', // Modern way to style checkbox color
    },
    checkboxLabel: {
        fontWeight: 'normal',
        color: '#555',
        fontSize: '1em',
        cursor: 'pointer',
    },
    sectionHeading: {
        fontSize: '1.8em',
        color: '#444',
        marginTop: '30px',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
        fontWeight: '600',
    },
    subHeading: {
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#555', // Blue accent color
        marginBottom: '10px',
    },
    optionInput: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        margin: '5px',
        fontSize: '1em',
        color: '#495057',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    questionCard: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '25px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    buttonContainer: {
        display: 'flex', // use flex, not inline-flex if you want full centering
        gap: '15px', // space between buttons
        justifyContent: 'center', // center horizontally
        alignItems: 'center', // center vertically
        marginBottom: '20px',
    },
    addButton: {
        backgroundColor: '#3a25ff', // Filled with the primary color
        color: '#ffffff', // White text for contrast
        padding: '12px 25px', // Slightly larger padding
        border: 'none', // No border for the filled button
        borderRadius: '25px', // More rounded corners (pill shape common in modern design)
        fontSize: '17px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 6px 12px rgba(58, 37, 255, 0.3)', // A subtle, matching shadow
        transition: 'all 0.3s ease',
        textTransform: 'uppercase', // Often used for modern buttons
        letterSpacing: '0.5px',
        // '&:hover': {
        //   backgroundColor: '#2e1ee8', // Slightly darker on hover
        //   boxShadow: '0 8px 16px rgba(58, 37, 255, 0.4)',
        // },
        // '&:active': {
        //   backgroundColor: '#2015bd', // Even darker on click
        // }
    },
    submitButton: {
        backgroundColor: 'transparent', // Transparent background
        color: '#3a25ff', // Text color matches the primary color
        padding: '12px 25px',
        border: '2px solid #3a25ff', // Border with the primary color
        borderRadius: '25px',
        fontSize: '17px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // A very subtle shadow
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        // '&:hover': {
        //   backgroundColor: 'rgba(58, 37, 255, 0.08)', // Light background tint on hover
        //   color: '#3a25ff',
        //   boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        // },
        // '&:active': {
        //   backgroundColor: 'rgba(58, 37, 255, 0.15)', // More tint on click
        //   color: '#3a25ff',
        // }
    },
    buttonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
};
export default AddExercise;
