import React from 'react';
import './ModeSelector.css';

export default function ModeSelector({ selectedMode, onModeChange }) {
    return (
        <div className="mode-selector-wrapper">
            <div className="mode-selector glass-card">
                <button
                    className={`mode-button ${selectedMode === 'fast' ? 'active' : ''}`}
                    onClick={() => onModeChange('fast')}
                >
                    <div className="mode-icon">⚡</div>
                    <div className="mode-info">
                        <div className="mode-name">Fast Mode</div>
                        <div className="mode-description">Concise & Direct (&lt;500 chars)</div>
                    </div>
                </button>

                <button
                    className={`mode-button ${selectedMode === 'advanced' ? 'active' : ''}`}
                    onClick={() => onModeChange('advanced')}
                >
                    <div className="mode-icon">🎯</div>
                    <div className="mode-info">
                        <div className="mode-name">Advanced Mode</div>
                        <div className="mode-description">Structured & Detailed (500-1000 chars)</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
