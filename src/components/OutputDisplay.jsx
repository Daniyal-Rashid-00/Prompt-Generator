import React, { useState } from 'react';
import './OutputDisplay.css';

export default function OutputDisplay({ output, isLoading }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const charCount = output ? output.length : 0;

    if (isLoading) {
        return (
            <div className="output-wrapper glass-card">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p className="loading-text">Generating your optimized prompt...</p>
                </div>
            </div>
        );
    }

    if (!output) {
        return (
            <div className="output-wrapper glass-card empty-state">
                <div className="empty-icon">📝</div>
                <p className="empty-text">Your optimized prompt will appear here</p>
            </div>
        );
    }

    return (
        <div className="output-wrapper glass-card fade-in">
            <div className="output-header">
                <div className="output-label-section">
                    <label className="output-label">Optimized Prompt</label>
                    <span className="output-char-counter">{charCount} characters</span>
                </div>
                <button
                    className="copy-button btn-secondary"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <>
                            <span className="copy-icon">✓</span>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <span className="copy-icon">📋</span>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="output-content">
                {output}
            </div>
        </div>
    );
}
