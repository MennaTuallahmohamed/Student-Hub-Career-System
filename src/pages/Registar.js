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
// src/pages/Registar.tsx
import { useState } from 'react';
import './Registar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { User, Mail, Lock } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthService } from '../firebase/src/firebaseServices';
function Registar() {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const handleGoogleSignUp = () => __awaiter(this, void 0, void 0, function* () {
        const provider = new GoogleAuthProvider();
        try {
            const result = yield signInWithPopup(auth, provider);
            const user = result.user;
            // حفظ كـ student افتراضيًا لحسابات جوجل
            yield setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                displayName: user.displayName,
                role: 'student',
                createdAt: new Date(),
            });
            navigate('/homepage');
        }
        catch (error) {
            alert(error.message);
        }
    });
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.elements.namedItem('email').value;
        const password = form.elements.namedItem('password').value;
        const firstName = form.elements.namedItem('firstName').value;
        const lastName = form.elements.namedItem('lastName').value;
        try {
            const user = yield AuthService.signUp(email, password, role, {
                firstName,
                lastName,
            });
            navigate('/homepage');
        }
        catch (error) {
            alert(error.message);
        }
    });
    return (_jsxs("div", { className: "auth-container", children: [_jsx("div", { className: "info-panel", children: _jsxs("div", { className: "info-content", children: [_jsxs("h1", { className: "info-title", children: ["Study smarter.", _jsx("br", {}), "Find jobs faster."] }), _jsx("p", { className: "info-subtitle", children: "All in one place \u2014 join our community for free!" }), _jsx("img", { src: "https://i.pinimg.com/1200x/f0/a2/c4/f0a2c4b7b69ee1e6d3e92bb85a558b11.jpg", className: "auth-illustration", alt: "Person studying on a laptop" })] }) }), _jsx("div", { className: "form-panel", children: _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [_jsx("h2", { className: "form-title", children: "Create Your Account" }), _jsx("p", { className: "form-message", children: "Signup now and get full access to our app." }), _jsxs("button", { type: "button", className: "google-btn", onClick: handleGoogleSignUp, children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: [_jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), _jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), _jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" }), _jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }), _jsx("path", { d: "M1 1h22v22H1z", fill: "none" })] }), "Sign Up with Google"] }), _jsx("div", { className: "divider", children: _jsx("span", { children: "OR" }) }), _jsxs("div", { className: "name-flex", children: [_jsxs("div", { className: "form-group", children: [_jsx(User, { size: 20, className: "input-icon" }), _jsx("input", { placeholder: "First Name", type: "text", className: "input", name: "firstName", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx(User, { size: 20, className: "input-icon" }), _jsx("input", { placeholder: "Last Name", type: "text", className: "input", name: "lastName", required: true })] })] }), _jsxs("div", { className: "form-group", children: [_jsx(Mail, { size: 20, className: "input-icon" }), _jsx("input", { placeholder: "Email", type: "email", className: "input", name: "email", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx(Lock, { size: 20, className: "input-icon" }), _jsx("input", { placeholder: "Password", type: "password", className: "input", name: "password", required: true })] }), _jsxs("div", { className: "form-group user-type-group", children: [_jsx("label", { className: "user-type-label", children: "I am a:" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { className: "radio-option", children: [_jsx("input", { type: "radio", name: "role", value: "student", checked: role === 'student', onChange: () => setRole('student') }), "Student"] }), _jsxs("label", { className: "radio-option", children: [_jsx("input", { type: "radio", name: "role", value: "teacher", checked: role === 'teacher', onChange: () => setRole('teacher') }), "Teacher"] })] })] }), _jsx("button", { type: "submit", className: "submit-btn", children: "Submit" }), _jsxs("p", { className: "signin-link", children: ["Already have an account? ", _jsx(Link, { to: "/signin", children: "Sign in" })] })] }) })] }));
}
export default Registar;
