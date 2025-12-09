import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registar from './pages/Registar';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import Courses from './pages/Courses';
import Jobs from './pages/jobs';
import Ai from './pages/ai';
import Apply from './pages/Apply';
import ProfilePage from './pages/ProfilePage';
import ConfirmationPage from './pages/ConfirmationPage';
import AddCourse from './pages/AddCourse';
import AddExercises from './pages/AddExercises';
import EditCourse from './pages/EditCourse';
import Applicants from './pages/Applicants';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/register", element: _jsx(Registar, {}) }), _jsx(Route, { path: "/homepage", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/courses", element: _jsx(Courses, {}) }), _jsx(Route, { path: "/add-course", element: _jsx(AddCourse, {}) }), _jsx(Route, { path: "/edit-course", element: _jsx(EditCourse, {}) }), _jsx(Route, { path: "/jobs", element: _jsx(Jobs, {}) }), _jsx(Route, { path: "/ai", element: _jsx(Ai, {}) }), _jsx(Route, { path: "/addExercises", element: _jsx(AddExercises, {}) }), _jsx(Route, { path: "/apply/:jobId", element: _jsx(Apply, {}) }), _jsx(Route, { path: "/applicants", element: _jsx(Applicants, {}) }), _jsx(Route, { path: "/confirmation", element: _jsx(ConfirmationPage, {}) }), _jsx(Route, { path: "/", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "*", element: _jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            textAlign: 'center'
                        }, children: [_jsx("h1", { style: { fontSize: '4rem', color: '#e11d48' }, children: "404" }), _jsx("h2", { children: "Page Not Found" }), _jsx("p", { children: "The page you're looking for doesn't exist." }), _jsx("a", { href: "/jobs", style: {
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    background: '#3b82f6',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '8px'
                                }, children: "Back to Jobs" })] }) })] }) }) }));
