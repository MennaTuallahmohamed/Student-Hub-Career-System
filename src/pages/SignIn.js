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
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { Mail, Lock } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
const illustrationUrl = 'https://i.pinimg.com/1200x/f0/a2/c4/f0a2c4b7b69ee1e6d3e92bb85a558b11.jpg  ';
function SignIn() {
    const navigate = useNavigate();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        try {
            yield signInWithEmailAndPassword(auth, email, password);
            console.log("تم تسجيل الدخول بنجاح");
            navigate('/homepage');
        }
        catch (error) {
            alert(error.message);
        }
    });
    return (_jsxs("div", { className: "auth-page-container", children: [_jsx("div", { className: "visual-panel", children: _jsxs("div", { className: "visual-content", children: [_jsxs("h1", { className: "visual-title", children: ["Unlock Your", _jsx("br", {}), "Full Potential."] }), _jsx("p", { className: "visual-subtitle", children: "Study smarter and find jobs faster with our AI-powered tools." }), _jsx("img", { src: illustrationUrl, className: "auth-illustration", alt: "Person working on a laptop with abstract shapes" })] }) }), _jsx("div", { className: "form-container", children: _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [_jsx("h2", { className: "form-title", children: "Welcome Back!" }), _jsx("p", { className: "form-message", children: "Sign in to continue to your account." }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsxs("div", { className: "input-group", children: [_jsx(Mail, { size: 20, className: "input-icon" }), _jsx("input", { id: "email", name: "email", placeholder: "you@example.com", type: "email", className: "input", required: true })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsxs("div", { className: "input-group", children: [_jsx(Lock, { size: 20, className: "input-icon" }), _jsx("input", { id: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: "password", className: "input", required: true })] })] }), _jsx("button", { type: "submit", className: "submit-btn", children: "Sign In" }), _jsxs("p", { className: "signin-link", children: ["Don't have an account? ", _jsx(Link, { to: "/register", children: "Register" })] })] }) })] }));
}
export default SignIn;
