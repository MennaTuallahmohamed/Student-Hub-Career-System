import React, { useState, useEffect, useRef } from "react";
import "./ai.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Bot, User, Mic, MicOff, Paperclip, Copy, ArrowUp, Trash2, PlusSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-ignore - Module doesn't have type definitions
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore - Module doesn't have type definitions
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
