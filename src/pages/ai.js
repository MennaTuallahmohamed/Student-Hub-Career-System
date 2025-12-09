var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import "./ai.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Bot, User, Mic, MicOff, Paperclip, Copy, ArrowUp, Trash2, PlusSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
const TypingIndicator = () => (_jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), " ", _jsx("span", {}), " ", _jsx("span", {})] }));
export default function Ai() {
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    // Load chat history from localStorage
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem("chatHistorySidebar");
            if (savedHistory) {
                setChatHistory(JSON.parse(savedHistory));
            }
        }
        catch (error) {
            console.error("Failed to load or parse chat history:", error);
        }
    }, []);
    // Save chat history to localStorage
    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem("chatHistorySidebar", JSON.stringify(chatHistory));
        }
        else {
            localStorage.removeItem("chatHistorySidebar");
        }
    }, [chatHistory]);
    // Restore active chat ID
    useEffect(() => {
        const savedActiveId = localStorage.getItem("activeChatId");
        if (!activeChatId && savedActiveId) {
            const exists = chatHistory.some((chat) => chat.id === savedActiveId);
            if (exists) {
                setActiveChatId(savedActiveId);
            }
        }
    }, [chatHistory, activeChatId]);
    // Update messages when active chat changes
    useEffect(() => {
        const activeChat = chatHistory.find((chat) => chat.id === activeChatId);
        setMessages(activeChat ? activeChat.messages : []);
        if (activeChatId) {
            localStorage.setItem("activeChatId", activeChatId);
        }
        else {
            localStorage.removeItem("activeChatId");
        }
    }, [activeChatId, chatHistory]);
    // Auto-scroll to bottom
    useEffect(() => {
        var _a;
        (_a = chatEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);
    // Update input with transcript
    useEffect(() => {
        setInput(transcript);
    }, [transcript]);
    // Restore mic state
    useEffect(() => {
        const micState = localStorage.getItem("micEnabled");
        if (micState === "true" && !listening) {
            SpeechRecognition.startListening({ continuous: true });
        }
    }, [listening]);
    // Handle send message
    const handleSend = (textToSend) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const messageText = textToSend || input;
        if (!messageText.trim())
            return;
        const userMessage = { text: messageText, sender: "user" };
        setInput("");
        resetTranscript();
        setIsTyping(true);
        let chatId = activeChatId;
        if (!chatId) {
            chatId = Date.now().toString();
            const newChatSession = {
                id: chatId,
                title: messageText.substring(0, 40) + "...",
                messages: [userMessage],
            };
            setChatHistory((prev) => [newChatSession, ...prev]);
            setActiveChatId(chatId);
        }
        else {
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, userMessage] }) : chat));
        }
        try {
            // Send message to Gemini API
            const response = yield fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: messageText }],
                        },
                    ],
                }),
            });
            if (!response.ok) {
                const errorData = yield response.json().catch(() => ({}));
                throw new Error(((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || `HTTP ${response.status}`);
            }
            const data = yield response.json();
            const botReply = ((_f = (_e = (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || "I couldn't understand the response. ❌";
            const botMessage = { text: botReply, sender: "bot" };
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, botMessage] }) : chat));
        }
        catch (error) {
            console.error("API Error:", error);
            const errorMessage = {
                text: "Failed to connect to Gemini. Check your API key or internet. ❌",
                sender: "bot",
            };
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, errorMessage] }) : chat));
        }
        finally {
            setIsTyping(false);
        }
    });
    // Handle file change
    const handleFileChange = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            var _a;
            const base64 = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString().split(",")[1];
            if (base64) {
                handleSendWithImage(base64, file.type, input);
            }
        };
        reader.readAsDataURL(file);
    };
    // Handle send with image
    const handleSendWithImage = (base64Image, mimeType, text) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const userMessage = { text: text || "Sent an image", sender: "user" };
        setInput("");
        resetTranscript();
        setIsTyping(true);
        let chatId = activeChatId;
        if (!chatId) {
            chatId = Date.now().toString();
            const newChat = {
                id: chatId,
                title: (text || "Image conversation").substring(0, 40) + "...",
                messages: [userMessage],
            };
            setChatHistory((prev) => [newChat, ...prev]);
            setActiveChatId(chatId);
        }
        else {
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, userMessage] }) : chat));
        }
        try {
            const response = yield fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: text || "Describe this image." },
                                {
                                    inline_data: {
                                        mime_type: mimeType,
                                        data: base64Image,
                                    },
                                },
                            ],
                        },
                    ],
                }),
            });
            if (!response.ok) {
                const errorData = yield response.json().catch(() => ({}));
                throw new Error(((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || `HTTP ${response.status}`);
            }
            const data = yield response.json();
            const botReply = ((_f = (_e = (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || "I couldn't understand the image. ❌";
            const botMessage = { text: botReply, sender: "bot" };
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, botMessage] }) : chat));
        }
        catch (error) {
            console.error("Image API Error:", error);
            const errorMessage = {
                text: "Failed to analyze image. Check API key or connection. ❌",
                sender: "bot",
            };
            setChatHistory((prev) => prev.map((chat) => chat.id === chatId ? Object.assign(Object.assign({}, chat), { messages: [...chat.messages, errorMessage] }) : chat));
        }
        finally {
            setIsTyping(false);
        }
    });
    // Handle new chat
    const handleNewChat = () => {
        setActiveChatId(null);
        setMessages([]);
        setInput("");
        localStorage.removeItem("activeChatId");
    };
    const handleSelectChat = (chatId) => {
        setActiveChatId(chatId);
    };
    const handleDeleteChat = (e, chatIdToDelete) => {
        e.stopPropagation();
        const updatedHistory = chatHistory.filter((chat) => chat.id !== chatIdToDelete);
        setChatHistory(updatedHistory);
        if (activeChatId === chatIdToDelete) {
            handleNewChat();
        }
    };
    const handleVoiceToggle = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            localStorage.setItem("micEnabled", "false");
        }
        else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
            localStorage.setItem("micEnabled", "true");
        }
    };
    const handleAttachClick = () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); };
    return (_jsxs("div", { className: "app-container", children: [_jsxs("aside", { className: "sidebar", children: [_jsx("div", { className: "sidebar-header", children: _jsx("h2", { className: "sidebar-title", children: "Chat History" }) }), _jsx("div", { className: "chat-history-list", children: chatHistory.map((chat) => (_jsxs("div", { className: `chat-history-item ${chat.id === activeChatId ? "active" : ""}`, onClick: () => handleSelectChat(chat.id), children: [_jsxs("span", { className: "chat-title", children: [chat.title, " ", _jsxs("small", { children: ["(", chat.messages.length, ")"] })] }), _jsx("button", { title: "Delete chat", className: "delete-chat-btn", onClick: (e) => handleDeleteChat(e, chat.id), children: _jsx(Trash2, { size: 16 }) })] }, chat.id))) }), _jsx("div", { className: "sidebar-footer", children: _jsxs("button", { className: "new-chat-btn", onClick: handleNewChat, children: [_jsx(PlusSquare, { size: 20 }), _jsx("span", { children: "New Chat" })] }) })] }), _jsxs("div", { className: "chat-area", children: [_jsxs("header", { className: "chat-header", children: [_jsx(Bot, { size: 28, className: "header-icon" }), _jsx("h1", { className: "h1-robot", children: "AI Assistant" })] }), _jsxs("div", { className: "messages-list", children: [messages.length === 0 && !isTyping && (_jsxs("div", { className: "welcome-container", children: [_jsx("img", { src: "https://i.pinimg.com/originals/88/5c/b9/885cb9c22fe028b25db7ea87b1e301cd.gif", alt: "AI", className: "welcome-gif" }), _jsx("h2", { children: "How can I help you today?" }), _jsxs("div", { className: "suggestion-chips", children: [_jsx("button", { onClick: () => handleSend("Tell me about courses"), children: "Tell me about courses" }), _jsx("button", { onClick: () => handleSend("What jobs are available?"), children: "What jobs are available?" }), _jsx("button", { onClick: () => handleSend("Explain a complex topic"), children: "Explain a complex topic" })] })] })), messages.map((msg, idx) => (_jsxs("div", { className: `message-row ${msg.sender}`, children: [msg.sender === "bot" && (_jsx("div", { className: "avatar bot-avatar", children: _jsx(Bot, { size: 20 }) })), _jsx("div", { className: "message-content", children: msg.sender === "user" ? (_jsx("div", { className: "user-bubble", children: msg.text })) : (_jsxs("div", { className: "bot-bubble", children: [_jsx(ReactMarkdown, { children: msg.text, remarkPlugins: [remarkGfm], components: {
                                                        code(_a) {
                                                            var { node, inline, className, children } = _a, props = __rest(_a, ["node", "inline", "className", "children"]);
                                                            const match = /language-(\w+)/.exec(className || "");
                                                            return !inline && match ? (_jsx(SyntaxHighlighter, Object.assign({ style: vscDarkPlus, language: match[1], PreTag: "div" }, props, { children: String(children).replace(/\n$/, "") }))) : (_jsx("code", Object.assign({ className: className }, props, { children: children })));
                                                        },
                                                        ul: ({ children }) => _jsx("ul", { style: { paddingLeft: "20px", marginTop: "5px" }, children: children }),
                                                        ol: ({ children }) => _jsx("ol", { style: { paddingLeft: "20px", marginTop: "5px" }, children: children }),
                                                        li: ({ children }) => _jsx("li", { style: { marginBottom: "5px" }, children: children }),
                                                        strong: ({ children }) => _jsx("span", { style: { fontWeight: "700", color: "#0e0d0dff" }, children: children }),
                                                    } }), _jsx("div", { className: "message-actions", children: msg.text.includes("❌") ? (_jsx("button", { onClick: () => {
                                                            var _a;
                                                            const prev = (_a = messages[idx - 1]) === null || _a === void 0 ? void 0 : _a.text;
                                                            if (prev)
                                                                handleSend(prev);
                                                        }, className: "retry-btn", title: "Retry", children: _jsx(ArrowUp, { size: 14, className: "rotate-icon" }) })) : (_jsx("button", { onClick: () => {
                                                            navigator.clipboard.writeText(msg.text);
                                                            alert("Copied!");
                                                        }, className: "copy-btn", title: "Copy", children: _jsx(Copy, { size: 14 }) })) })] })) }), msg.sender === "user" && (_jsx("div", { className: "avatar user-avatar", children: _jsx(User, { size: 20 }) }))] }, idx))), isTyping && (_jsxs("div", { className: "message-row bot typing-indicator-row", children: [_jsx("div", { className: "avatar bot-avatar", children: _jsx(Bot, { size: 20 }) }), _jsx("div", { className: "message-content", children: _jsx("div", { className: "bot-bubble", children: _jsx(TypingIndicator, {}) }) })] })), _jsx("div", { ref: chatEndRef })] }), _jsx("footer", { className: "chat-input-area", children: _jsxs("div", { className: "input-wrapper", children: [_jsx("button", { className: "icon-btn", title: "Attach File", onClick: handleAttachClick, children: _jsx(Paperclip, { size: 20 }) }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/*", style: { display: "none" } }), _jsx("button", { onClick: handleVoiceToggle, className: `icon-btn mic-btn ${listening ? "listening" : ""}`, title: "Voice Input", children: listening ? _jsx(MicOff, { size: 20 }) : _jsx(Mic, { size: 20 }) }), _jsx("input", { type: "text", placeholder: "Ask me anything...", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    } }), _jsx("button", { onClick: () => handleSend(), className: "icon-btn send-btn", title: "Send Message", children: _jsx(ArrowUp, { size: 20 }) })] }) })] })] }));
}
