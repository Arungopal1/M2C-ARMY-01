import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    // Handle user logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    // Get initials from the user's display name
    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    // Handle keydown events (e.g., close menu with Escape key)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setShowMenu(false);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.querySelector('.profile-container');
            if (container && !container.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            {/* Left side: Logo and Title */}
            <div className="logo-header">
                <div className="m2c-logo">
                    <svg width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 180c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" fill="#4CAF50" fillOpacity=".2"/>
                        <path d="M45 70h110v50H45z" fill="#4CAF50"/>
                        <path d="M60 70v-15c0-5.523 4.477-10 10-10h60c5.523 0 10 4.477 10 10v15" stroke="#4CAF50" strokeWidth="5"/>
                        <path d="M155 95h15c5.523 0 10 4.477 10 10v20c0 5.523-4.477 10-10 10h-15M45 95H30c-5.523 0-10 4.477-10 10v20c0 5.523 4.477 10 10 10h15" stroke="#4CAF50" strokeWidth="5"/>
                        <path d="M60 120a5 5 0 100-10 5 5 0 000 10zM140 120a5 5 0 100-10 5 5 0 000 10z" fill="#fff"/>
                        <path d="M90 60V40M110 60V40" stroke="#4CAF50" strokeWidth="5"/>
                        <path d="M80 40h40" stroke="#4CAF50" strokeWidth="5"/>
                        <path d="M70 55c-2.761 0-5-2.239-5-5s2.239-5 5-5h60c2.761 0 5 2.239 5 5s-2.239 5-5 5H70z" fill="#4CAF50"/>
                    </svg>
                </div>
                <h1 className="m2c-title">M2C ARMY PC BUILDER AI</h1>
            </div>

            {/* Right side: Theme toggle and Profile icon */}
            <div className="right-section">
                {/* Theme toggle button (only shown when logged in) */}
                {currentUser && (
                    <div className="theme-toggle-section">
                        <button 
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3"/>
                                    <line x1="12" y1="21" x2="12" y2="23"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                    <line x1="1" y1="12" x2="3" y2="12"/>
                                    <line x1="21" y1="12" x2="23" y2="12"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                {/* Profile icon (only shown when logged in) */}
                {currentUser && (
                    <div 
                        className="profile-container" 
                        onKeyDown={handleKeyDown} 
                        tabIndex="0"
                    >
                        <button 
                            className="profile-button"
                            onClick={() => setShowMenu(!showMenu)}
                            aria-label="User profile menu"
                        >
                            <div className="profile-avatar">
                                {getInitials(currentUser.displayName)}
                            </div>
                            <span className="tooltip">{currentUser.displayName || 'User'}</span>
                        </button>

                        {showMenu && (
                            <div className="profile-menu">
                                <button 
                                    className="menu-item logout"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogout();
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                        <polyline points="16 17 21 12 16 7"/>
                                        <line x1="21" y1="12" x2="9" y2="12"/>
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;