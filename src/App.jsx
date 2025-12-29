import React, { useState } from 'react';
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

            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        Powered by OpenRouter AI • Built with ❤️
                    </p>
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
