import React from 'react';
import './PromptInput.css';

export default function PromptInput({ value, onChange, placeholder }) {
    const charCount = value.length;

    return (
        <div className="prompt-input-wrapper glass-card">
            <div className="input-header">
                <label htmlFor="prompt-input" className="input-label">
                    Your Idea
                </label>
                <span className="char-counter">{charCount} characters</span>
            </div>
            <textarea
                id="prompt-input"
                className="prompt-textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Describe what you want the AI to help with...\n\nExample: Help me write a marketing email for a new product launch"}
                rows={8}
            />
        </div>
    );
}
