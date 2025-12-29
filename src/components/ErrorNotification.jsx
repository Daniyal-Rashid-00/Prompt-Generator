import React, { useEffect } from 'react';
import './ErrorNotification.css';

export default function ErrorNotification({ error, onClose }) {
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, onClose]);

    if (!error) return null;

    return (
        <div className="error-notification fade-in">
            <div className="error-content">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{error}</span>
            </div>
            <button className="error-close" onClick={onClose}>
                ✕
            </button>
        </div>
    );
}
