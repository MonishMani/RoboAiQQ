import React, { useState, useEffect, useRef } from 'react';
import './RiaChatbot.css';
import { FAQ_DATA } from './faqData';

// Constants
const RIA_AVATAR_SRC = "/assets/chatbot/ria.png";

const SECTIONS = [
    { id: 'hero', name: 'Hero', tip: "Welcome to RoboAiQ! Ask me about our robotics programs." },
    { id: 'curriculum', name: 'Curriculum', tip: "Exploring our curriculum? I can explain our modules!" },
    { id: 'programs', name: 'Programs', tip: "Looking at programs? I can help you choose the right one." },
    { id: 'demo-form', name: 'Demo', tip: "Ready to book? I can guide you through the form!" },
    { id: 'contact', name: 'Contact', tip: "Need to reach us? Ask about our contact options." }
];

const RiaChatbot = () => {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'welcome', type: 'bot', text: "Hi! I'm Ria, your robotics guide. Ask me anything!" }
    ]);
    const [currentSection, setCurrentSection] = useState(SECTIONS[0]);
    const [isIntroDone, setIsIntroDone] = useState(false);
    const [voiceState, setVoiceState] = useState('idle'); // idle, listening, speaking
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Refs
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);
    const synthesisRef = useRef(window.speechSynthesis);

    // --- 1. Hero Intro & Video Logic ---
    useEffect(() => {
        const videoElement = document.getElementById('hero-video');

        if (videoElement) {
            // Force hidden initially if video exists
            setIsHidden(true);

            const handlePlay = () => setIsHidden(true);

            const handleEnd = () => {
                // Wait 12 seconds after video ends before showing
                setTimeout(() => {
                    setIsHidden(false);
                    // Only start intro animation AFTER this delay if not seen
                    const hasSeenIntro = sessionStorage.getItem('ria_intro_seen');
                    if (!hasSeenIntro) {
                        setIsIntroDone(false); // Trigger visual entry
                        setTimeout(() => {
                            setIsIntroDone(true);
                            sessionStorage.setItem('ria_intro_seen', 'true');
                        }, 3500);
                    } else {
                        setIsIntroDone(true);
                    }
                }, 12000);
            };

            const handlePause = () => {
                // Keep hidden logic for pause
            };

            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('ended', handleEnd);

            // Initial check: if video already ended before React mounted
            if (videoElement.ended) {
                handleEnd();
            }

            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('ended', handleEnd);
            };
        } else {
            // No video? Wait 12 seconds after mount before showing
            setIsHidden(true);
            setTimeout(() => {
                setIsHidden(false);
                // Start intro if needed
                const hasSeenIntro = sessionStorage.getItem('ria_intro_seen');
                if (!hasSeenIntro) {
                    setIsIntroDone(false);
                    setTimeout(() => {
                        setIsIntroDone(true);
                        sessionStorage.setItem('ria_intro_seen', 'true');
                    }, 3500);
                } else {
                    setIsIntroDone(true);
                }
            }, 12000);
        }
    }, []);

    // --- 2. Section Detection ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const matched = SECTIONS.find(s => entry.target.id.includes(s.id)) || SECTIONS[0];
                    setCurrentSection(matched);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-100px 0px'
        });

        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id) || document.getElementById(`${s.id}-section`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // --- 3. Auto Scroll ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isThinking]);

    // --- 4. Voice Logic ---
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Voice input not supported in this browser.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => setVoiceState('listening');
        recognitionRef.current.onend = () => setVoiceState('idle');
        recognitionRef.current.onerror = (e) => {
            console.error("Speech error", e);
            setVoiceState('idle');
        };

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) handleUserMessage(transcript);
        };

        recognitionRef.current.start();
    };

    const speakText = (text) => {
        if (synthesisRef.current.speaking) synthesisRef.current.cancel();
        if (!isOpen) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setVoiceState('speaking');
        utterance.onend = () => setVoiceState('idle');

        const voices = synthesisRef.current.getVoices();
        const femaleVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female'));
        if (femaleVoice) utterance.voice = femaleVoice;

        synthesisRef.current.speak(utterance);
    };

    // --- 5. Message Handling ---
    const handleUserMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsThinking(true);

        await new Promise(r => setTimeout(r, 800));

        const faqMatch = FAQ_DATA.find(q =>
            text.toLowerCase().includes(q.question.toLowerCase()) ||
            text.toLowerCase().includes(q.question.split(' ')[0].toLowerCase()) && text.toLowerCase().includes("program")
        );

        let botResponse = "I'm not sure about that. Try checking the FAQ options below!";
        if (faqMatch) botResponse = faqMatch.answer;

        if (!faqMatch) {
            const keywords = {
                "enroll": 2, "join": 2, "cost": 10, "price": 10, "kit": 6, "robot": 4
            };
            for (const [key, id] of Object.entries(keywords)) {
                if (text.toLowerCase().includes(key)) {
                    botResponse = FAQ_DATA.find(q => q.id === id)?.answer || botResponse;
                    break;
                }
            }
        }

        setIsThinking(false);

        const botMsg = { id: Date.now() + 1, type: 'bot', text: botResponse };
        setMessages(prev => [...prev, botMsg]);

        speakText(botResponse);
    };

    const handleFAQClick = (question) => {
        handleUserMessage(question);
    };

    const toggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (!newState) {
            if (synthesisRef.current.speaking) {
                synthesisRef.current.cancel();
                setVoiceState('idle');
            }
        }
    };

    return (
        <>
            <div className={`ria-backdrop ${isOpen ? 'visible' : ''}`} onClick={toggleChat} />

            <div className={`ria-container ${isOpen ? 'open' : ''} ${isHidden ? 'hidden' : ''}`}>

                {/* Chatbot Icon Button - Visible when closed */}
                {!isOpen && (
                    <button
                        className="ria-icon-button"
                        onClick={toggleChat}
                        title="Ask help with Ria"
                    >
                        <img src="/assets/chatbot/ria_face.png" alt="Ria" />
                    </button>
                )}

                {isOpen && (
                    <div className="ria-avatar-container">
                        {/* Avatar Image */}
                        <img
                            src={RIA_AVATAR_SRC}
                            alt="Ria AI Assistant"
                            className={`ria-avatar-img ${isOpen ? 'chat-open' : ''}`}
                            onClick={toggleChat}
                        />
                    </div>
                )}

                {/* Chat Panel */}
                <div className={`ria-chat-panel ${isOpen ? 'open' : ''}`}>
                    {/* Header */}
                    <div className="ria-header">
                        <div className="ria-title">
                            <h3>Ria — Your <span>Robotics</span> Guide</h3>
                            <div className="ria-context">
                                Viewing: <strong>{currentSection.name}</strong>
                            </div>
                        </div>
                        <button className="ria-close-btn" onClick={toggleChat}>✕</button>
                    </div>

                    {/* Messages */}
                    <div className="ria-messages">
                        <div className="context-tip">
                            💡 {currentSection.tip}
                        </div>

                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}

                        {isThinking && (
                            <div className="message bot typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />

                        {!isThinking && (
                            <div className="faq-grid">
                                {FAQ_DATA.slice(0, 4).map(faq => (
                                    <button key={faq.id} className="faq-btn" onClick={() => handleFAQClick(faq.question)}>
                                        {faq.question}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="ria-input-area">
                        <button
                            className={`ria-mic-btn ${voiceState}`}
                            onClick={startListening}
                            title="Speak to Ria"
                        >
                            {voiceState === 'listening' ? '●' : voiceState === 'speaking' ? '🔊' : '🎤'}
                        </button>

                        <input
                            className="ria-input"
                            placeholder="Ask a question..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUserMessage(inputText)}
                            disabled={voiceState === 'listening'}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default RiaChatbot;
