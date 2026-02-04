import React, { useState, useEffect, useRef } from 'react';
import './RiaChatbot.css';
import { FAQ_DATA } from './faqData';

// Constants
const RIA_AVATAR_SRC = "/assets/chatbot/red-ria.png";

const SECTIONS = [
    { id: 'home', name: 'Hero', tip: "Welcome to RoboAiQ! Ask me about our robotics programs." },
    { id: 'curriculum', name: 'Curriculum', tip: "Exploring our curriculum? I can explain our modules!" },
    { id: 'programs', name: 'Programs', tip: "Looking at programs? I can help you choose the right one." },
    { id: 'unique', name: 'Features', tip: "Curious about what makes us unique? Let me explain!" },
    { id: 'pricing', name: 'Pricing', tip: "Checking pricing? I can help you find the best option!" },
    { id: 'contact', name: 'Contact', tip: "Need to reach us? Ask about our contact options." }
];

const RiaChatbot = () => {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentSection, setCurrentSection] = useState(SECTIONS[0]);
    const [voiceState, setVoiceState] = useState('idle');
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Feedback System State - DELAYED APPEARANCE
    const [showFeedbackCard, setShowFeedbackCard] = useState(false); // Start hidden

    useEffect(() => {
        // Show feedback card after 8 seconds delay
        const timer = setTimeout(() => {
            setShowFeedbackCard(true);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [chatMode, setChatMode] = useState('initial'); // initial, feedback_yes, feedback_no, capture_info, free_chat
    const [showFAQ, setShowFAQ] = useState(true);
    const [userMessage, setUserMessage] = useState('');
    const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);
    const synthesisRef = useRef(window.speechSynthesis);

    // --- 1. Video Logic ---
    useEffect(() => {
        const videoElement = document.getElementById('hero-video');

        if (videoElement) {
            setIsHidden(true);

            const handlePlay = () => setIsHidden(true);

            const handleEnd = () => {
                setTimeout(() => {
                    setIsHidden(false);
                    const hasSeenIntro = sessionStorage.getItem('ria_intro_seen');
                    if (!hasSeenIntro) {
                        sessionStorage.setItem('ria_intro_seen', 'true');
                    }
                }, 12000);
            };

            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('ended', handleEnd);

            if (videoElement.ended) {
                handleEnd();
            }

            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('ended', handleEnd);
            };
        } else {
            setIsHidden(true);
            setTimeout(() => {
                setIsHidden(false);
                const hasSeenIntro = sessionStorage.getItem('ria_intro_seen');
                if (!hasSeenIntro) {
                    sessionStorage.setItem('ria_intro_seen', 'true');
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

    // --- 5. Feedback Handlers ---
    const handleFeedbackYes = () => {
        setShowFeedbackCard(false);
        setFeedbackGiven(true);
        setShowFAQ(false);
        setIsOpen(true);
        setChatMode('feedback_yes');
        setMessages([
            { id: Date.now(), type: 'bot', text: "Thank you for your feedback! If you need anything else, I'm here to help." }
        ]);
    };

    const handleFeedbackNo = () => {
        setShowFeedbackCard(false);
        setFeedbackGiven(true);
        setShowFAQ(false);
        setIsOpen(true);
        setChatMode('feedback_no');
        setMessages([
            { id: Date.now(), type: 'bot', text: "How could I help you today?" }
        ]);
    };

    // --- 6. Message Handling ---
    const handleUserMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Store user message for data capture
        if (chatMode === 'feedback_no') {
            setUserMessage(text);
            setIsThinking(true);
            await new Promise(r => setTimeout(r, 800));
            setIsThinking(false);

            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "May I have your name and email so our team can contact you soon?"
            };
            setMessages(prev => [...prev, botMsg]);
            setChatMode('capture_info');
            return;
        }

        // Normal FAQ handling for free chat
        if (chatMode === 'feedback_yes' || chatMode === 'free_chat') {
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
            // REMOVED: Auto TTS - users must click to listen
            // speakText(botResponse);

            // Enable FAQ after first free chat message
            if (chatMode === 'feedback_yes') {
                setShowFAQ(true);
                setChatMode('free_chat');
            }
        }
    };

    const handleFAQClick = (question) => {
        handleUserMessage(question);
    };

    // Manual TTS trigger for specific message
    const handleListenToMessage = (text) => {
        speakText(text);
    };

    // --- 7. Contact Info Submission ---
    const handleContactSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!contactInfo.name.trim() || !emailRegex.test(contactInfo.email)) {
            const errorMsg = {
                id: Date.now(),
                type: 'bot',
                text: "Please provide a valid name and email address."
            };
            setMessages(prev => [...prev, errorMsg]);
            return;
        }

        setIsSubmitting(true);

        // Prepare data
        const submissionData = {
            name: contactInfo.name,
            email: contactInfo.email,
            message: userMessage,
            section: currentSection.name,
            timestamp: new Date().toISOString(),
            source: "RoboAiQ Chatbot Feedback Flow"
        };

        console.log("Submission Data:", submissionData);

        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));

        setIsSubmitting(false);

        const confirmMsg = {
            id: Date.now(),
            type: 'bot',
            text: "Thanks! Our team will contact you shortly."
        };
        setMessages(prev => [...prev, confirmMsg]);

        // Reset form and enable free chat
        setContactInfo({ name: '', email: '' });
        setChatMode('free_chat');
        setShowFAQ(true);
    };

    const toggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (!newState) {
            if (synthesisRef.current.speaking) {
                synthesisRef.current.cancel();
                setVoiceState('idle');
            }
        } else {
            // If opening chat manually (not via feedback), set to free chat mode
            if (!feedbackGiven) {
                setMessages([
                    { id: Date.now(), type: 'bot', text: "Hi! I'm Ria, your robotics guide. Ask me anything!" }
                ]);
                setChatMode('free_chat');
                setShowFeedbackCard(false);
            }
        }
    };

    return (
        <>
            <div className={`ria-backdrop ${isOpen ? 'visible' : ''}`} onClick={toggleChat} />

            <div className={`ria-container ${isOpen ? 'open' : ''} ${isHidden ? 'hidden' : ''}`}>

                {/* Floating Feedback Card */}
                {!isOpen && showFeedbackCard && !feedbackGiven && (
                    <div className="feedback-card">
                        <p>Did you find what you were looking for?</p>
                        <div className="feedback-buttons">
                            <button
                                className="feedback-btn yes"
                                onClick={handleFeedbackYes}
                                aria-label="Yes, I found what I was looking for"
                            >
                                Yes
                            </button>
                            <button
                                className="feedback-btn no"
                                onClick={handleFeedbackNo}
                                aria-label="No, I need help"
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

                {/* Chatbot Icon Button */}
                {!isOpen && (
                    <button
                        className="ria-icon-button"
                        onClick={toggleChat}
                        title="Ask help with Ria"
                    >
                        <img src="/assets/chatbot/ria-face.png" alt="Ria" />
                    </button>
                )}

                {isOpen && (
                    <div className="ria-avatar-container">
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
                            <h3>Ria: Your <span>Robotics</span> Guide</h3>
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
                                <span className="message-text">{msg.text}</span>
                                {msg.type === 'bot' && (
                                    <button
                                        className="listen-btn"
                                        onClick={() => handleListenToMessage(msg.text)}
                                        aria-label="Listen to this message"
                                        title="Click to hear this message"
                                    >
                                        🔊
                                    </button>
                                )}
                            </div>
                        ))}

                        {isThinking && (
                            <div className="message bot typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}

                        {/* Contact Info Form */}
                        {chatMode === 'capture_info' && (
                            <form className="contact-form" onSubmit={handleContactSubmit}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={contactInfo.name}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                    disabled={isSubmitting}
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div ref={messagesEndRef} />

                        {/* FAQ Grid - Show only when appropriate */}
                        {!isThinking && showFAQ && chatMode !== 'capture_info' && (
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
                            disabled={chatMode === 'capture_info'}
                        >
                            {voiceState === 'listening' ? '●' : voiceState === 'speaking' ? '🔊' : '🎤'}
                        </button>

                        <input
                            className="ria-input"
                            placeholder={chatMode === 'capture_info' ? 'Please fill the form above' : 'Ask a question...'}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUserMessage(inputText)}
                            disabled={voiceState === 'listening' || chatMode === 'capture_info'}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default RiaChatbot;
