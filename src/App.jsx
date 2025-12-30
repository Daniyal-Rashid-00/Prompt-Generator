import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import PromptInput from './components/PromptInput';
import OutputDisplay from './components/OutputDisplay';
import ErrorNotification from './components/ErrorNotification';
import { generateFastPrompt, generateAdvancedPrompt } from './services/promptService';
import './App.css';

function App() {
    const [selectedMode, setSelectedMode] = useState('fast');
    const [userInput, setUserInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(true); // Default to dark mode

    // Initialize dark mode from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                const isDark = JSON.parse(saved);
                setDarkMode(isDark);
            }
        } catch (error) {
            console.error('Error reading dark mode preference:', error);
        }
    }, []);

    // Update dark mode class on html when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        try {
            localStorage.setItem('darkMode', JSON.stringify(darkMode));
        } catch (error) {
            console.error('Error saving dark mode preference:', error);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleGenerate = async () => {
        // Validate input
        if (!userInput.trim()) {
            setError('Please enter some text to generate a prompt');
            return;
        }

        setIsLoading(true);
        setError('');
        setOutput('');

        try {
            let result;
            if (selectedMode === 'fast') {
                result = await generateFastPrompt(userInput);
            } else {
                result = await generateAdvancedPrompt(userInput);
            }

            setOutput(result);
        } catch (err) {
            setError(err.message || 'Failed to generate prompt. Please try again.');
            console.error('Generation error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        // Generate on Ctrl+Enter or Cmd+Enter
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleGenerate();
        }
    };

    return (
        <div className="app">
            {/* Dark Mode Toggle */}
            <div className="theme-toggle">
                <button
                    onClick={toggleDarkMode}
                    className="theme-toggle-btn"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>

            <Header />

            <main className="main-content">
                <div className="container">
                    <div className="content-wrapper">
                        <ModeSelector
                            selectedMode={selectedMode}
                            onModeChange={setSelectedMode}
                        />

                        <div className="input-section" onKeyDown={handleKeyPress}>
                            <PromptInput
                                value={userInput}
                                onChange={setUserInput}
                            />

                            <div className="generate-section">
                                <button
                                    className="generate-button btn-primary"
                                    onClick={handleGenerate}
                                    disabled={isLoading || !userInput.trim()}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="button-spinner"></span>
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="button-icon">✨</span>
                                            <span>Generate Optimized Prompt</span>
                                        </>
                                    )}
                                </button>
                                <p className="helper-text">
                                    Pro tip: Press <kbd>Ctrl+Enter</kbd> to generate
                                </p>
                            </div>
                        </div>

                        <OutputDisplay
                            output={output}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        Made by <span className="footer-name">Daniyal</span>
                    </p>
                    <div className="footer-links">
                        <a
                            href="mailto:the.daniyal.rashid@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                            aria-label="Email"
                        >
                            <svg className="footer-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span>Email</span>
                        </a>
                        <span className="footer-separator">•</span>
                        <a
                            href="https://github.com/Daniyal-Rashid-00"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                            aria-label="GitHub"
                        >
                            <svg className="footer-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                        <span className="footer-separator">•</span>
                        <a
                            href="https://www.linkedin.com/in/the-daniyal-rashid/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                            aria-label="LinkedIn"
                        >
                            <svg className="footer-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                        <span className="footer-separator">•</span>
                        <a
                            href="https://tryhackme.com/p/Daniyal01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                            aria-label="TryHackMe"
                        >
                            <svg className="footer-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27 3.273 3.273 0 0 1 3.27-3.27c.054 0 .108.002.161.005.035-.344.105-.68.207-1.004C5.6 3.112 7.94 1.25 10.705 1.25c3.273 0 5.933 2.66 5.933 5.933a.625.625 0 1 0 1.25 0c0-3.97-3.213-7.183-7.183-7.183zm8.476 5.158a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h.165a4.525 4.525 0 0 0 4.107-4.5 4.525 4.525 0 0 0-4.52-4.52zm0 1.25a3.273 3.273 0 0 1 3.27 3.27 3.273 3.273 0 0 1-3.27 3.27h-.165a3.273 3.273 0 0 1-3.27-3.27 3.273 3.273 0 0 1 3.27-3.27zm-8.476 3.27a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a4.525 4.525 0 0 0 4.107-4.5 4.525 4.525 0 0 0-4.52-4.52zm0 1.25h6.761a3.273 3.273 0 0 1 3.27 3.27 3.273 3.273 0 0 1-3.27 3.27h-6.761a3.273 3.273 0 0 1-3.27-3.27 3.273 3.273 0 0 1 3.27-3.27z" />
                            </svg>
                            <span>TryHackMe</span>
                        </a>
                    </div>
                </div>
            </footer>

            <ErrorNotification
                error={error}
                onClose={() => setError('')}
            />
        </div>
    );
}

export default App;
