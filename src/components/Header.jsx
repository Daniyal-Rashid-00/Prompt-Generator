import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo-icon">✨</div>
                        <h1 className="logo-text">
                            Prompt<span className="gradient-text">Optimizer</span>
                        </h1>
                    </div>
                    <p className="tagline">Transform ideas into powerful AI prompts</p>
                </div>
            </div>
        </header>
    );
}
