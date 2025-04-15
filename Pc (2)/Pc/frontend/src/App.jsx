import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { getRecommendation } from "../api/pcBuilderAPI.js"; 
import { AuthProvider } from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/Navbar.jsx";
import "./components/auth/auth.css";
import "./components/Navbar.css";


const App = () => {
    const [budget, setBudget] = useState('');
    const [useCase, setUseCase] = useState([]);
    const [preferences, setPreferences] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    // Apply theme to document when component mounts or theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRecommendation('');

        try {
            const useCaseString = useCase.join(', ');
            const response = await getRecommendation(budget, useCaseString, preferences);
            if (response && response.recommendation) {
                setRecommendation(response.recommendation);
            } else {
                setError("No recommendation received. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching recommendation:", error);
            setError("Failed to get a recommendation.");
        } finally {
            setLoading(false);
        }
    };

    const getComponentIcon = (componentType) => {
        const type = componentType.toLowerCase();
        
        if (type.includes('cpu')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M9,2V4H12V5H10.5A1.5,1.5 0 0,0 9,6.5V7H7V9H9V11H7V13H9V15H7V17H9V17.5A1.5,1.5 0 0,0 10.5,19H12V20H9V22H15V20H12V19H13.5A1.5,1.5 0 0,0 15,17.5V17H17V15H15V13H17V11H15V9H17V7H15V6.5A1.5,1.5 0 0,0 13.5,5H12V4H15V2M10.5,6H13.5V17.5H10.5Z" />
                </svg>
            );
        } else if (type.includes('gpu') || type.includes('graphics')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M2,7H4.5V17H3V19H7V17H5.5V7H8V5H2V7M10,5H14V7H16V19H14V21H10V19H12V7H10V5M18,7H20.5V17H19V19H23V17H21.5V7H24V5H18V7Z" />
                </svg>
            );
        } else if (type.includes('motherboard')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V21H10V17H14V21H21V11H20A2,2 0 0,1 18,9V5A2,2 0 0,0 16,3H8M8,5H16V9A4,4 0 0,0 20,13V19H16V15H8V19H5V13A4,4 0 0,0 9,9V5M10,7V11H14V7H10Z" />
                </svg>
            );
        } else if (type.includes('ram') || type.includes('memory')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M17,17H7V7H17M21,3H10C8.9,3 8,3.9 8,5V17C8,18.1 8.9,19 10,19H19C20.1,19 21,18.1 21,17V5C21,3.9 20.1,3 19,3M19,17H10V5H19V17M7,14.5V16H5V14.5H7M7,12.5V14H5V12.5H7M7,10.5V12H5V10.5H7M7,8.5V10H5V8.5H7M4,8.5H2V17H4V8.5Z" />
                </svg>
            );
        } else if (type.includes('storage') || type.includes('ssd') || type.includes('hdd')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z" />
                </svg>
            );
        } else if (type.includes('power') || type.includes('psu')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M15,9H13V7H15V9M15,5H13V3H15V5M19,3H10C8.9,3 8,3.9 8,5V17C8,18.1 8.9,19 10,19H19C20.1,19 21,18.1 21,17V5C21,3.9 20.1,3 19,3M19,17H10V5H19V17M7,14.5V16H5V14.5H7M7,12.5V14H5V12.5H7M7,10.5V12H5V10.5H7M7,8.5V10H5V8.5H7M4,8.5H2V17H4V8.5Z" />
                </svg>
            );
        } else if (type.includes('case')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2M8,4V20H16V4H8M10,6H14V8H10V6M10,10H14V12H10V10M10,14H14V16H10V14Z" />
                </svg>
            );
        } else if (type.includes('cooling') || type.includes('cooler') || type.includes('fan')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
                </svg>
            );
        } else if (type.includes('total')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18H21M12,16H22V8H12V16M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M7,2H17A2,2 0 0,0 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V20H17V4H7M10,6H14V8H10V6M10,10H14V12H10V10M10,14H14V16H10V14Z" />
                </svg>
            );
        }
    };

    const parseRecommendation = (recommendation) => {
        if (!recommendation) return null;
    
        const lines = recommendation.split("\n").filter(line => line.trim() !== "");
    
        const components = [];
        let descriptions = [];
        let isDescriptionSection = false;
        let totalCost = "";
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith("**Component Descriptions:**")) {
                isDescriptionSection = true;
                continue;
            }
    
            if (isDescriptionSection) {
                descriptions.push(line);
            } else if (line.startsWith("**")) {
                if (line.toLowerCase().includes("total cost")) {
                    totalCost = line.replace(/\*\*/g, "").split(":")[1]?.trim() || "";
                    continue;
                }
                
                const component = line.replace(/\*\*/g, "").split(":")[0].trim();
                let details = line.split(":")[1]?.trim() || "No details available";
                
                let price = "";
                if (details.includes("(₹")) {
                    const priceMatch = details.match(/\(₹([\d,]+\.?\d*)\)/);
                    if (priceMatch && priceMatch[1]) {
                        price = "₹" + priceMatch[1];
                        details = details.replace(/\(₹[\d,]+\.?\d*\)/, "").trim();
                    }
                }
                
                components.push({ component, details, price });
            }
        }
    
        return (
            <div>
                <div className="component-cards-grid">
                    {components.map((item, index) => (
                        <div key={index} className="component-card">
                            <div className="component-card-header">
                                <span>{item.component}</span>
                            </div>
                            {item.price && (
                                <div className="component-card-price-container">
                                    <span className="component-card-price-label">Price:</span>
                                    <span className="component-card-price">{item.price}</span>
                                </div>
                            )}
                            <div className="component-card-body">
                                <div className="component-card-icon">
                                    {getComponentIcon(item.component)}
                                </div>
                                <div className="component-card-details">
                                    {item.details}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {totalCost && (
                    <div className="total-cost-card">
                        <div className="total-cost-label">
                            <div className="component-card-icon">
                                {getComponentIcon("Total Cost")}
                            </div>
                            <span>Total Cost</span>
                        </div>
                        <div className="total-cost-value">{totalCost}</div>
                    </div>
                )}
    
                {descriptions.length > 0 && (
                    <div className="component-descriptions">
                        <h4>Component Descriptions:</h4>
                        <ul>
                            {descriptions.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const toggleUseCase = (value) => {
        setUseCase(prev => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const useCaseOptions = [
        { value: 'Gaming', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21,6H3C1.9,6 1,6.9 1,8V17C1,18.1 1.9,19 3,19H21C22.1,19 23,18.1 23,17V8C23,6.9 22.1,6 21,6M21,16H3V8H21M6,15H8V13H10V11H8V9H6V11H4V13H6M14.5,12A1.5,1.5 0 0,1 16,13.5A1.5,1.5 0 0,1 14.5,15A1.5,1.5 0 0,1 13,13.5A1.5,1.5 0 0,1 14.5,12M18.5,9A1.5,1.5 0 0,1 20,10.5A1.5,1.5 0 0,1 18.5,12A1.5,1.5 0 0,1 17,10.5A1.5,1.5 0 0,1 18.5,9Z" /></svg> },
        { value: 'Editing', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg> },
        { value: 'Development', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z" /></svg> },
        { value: 'Streaming', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" /></svg> },
        { value: 'Office', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" /></svg> }
    ];

    return (
        <Router>
            <AuthProvider>
                <div className={`app ${theme}`}>
                    <Navbar theme={theme} toggleTheme={toggleTheme} />
                    <div className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* Protected Routes */}
                            <Route path="/" element={
                                <PrivateRoute>
                                    <div className="container">
                                        <div className="form-container">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>Budget (₹)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter your budget"
                                                        value={budget}
                                                        onChange={(e) => setBudget(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Use Case (Select one or more)</label>
                                                    <div className="use-case-buttons">
                                                        {useCaseOptions.map(option => (
                                                            <button
                                                                key={option.value}
                                                                type="button"
                                                                className={`use-case-button ${useCase.includes(option.value) ? 'active' : ''}`}
                                                                onClick={() => toggleUseCase(option.value)}
                                                            >
                                                                <span className="use-case-icon">{option.icon}</span>
                                                                <span>{option.value}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label>Additional Preferences</label>
                                                    <textarea
                                                        placeholder="Enter any specific preferences (e.g., preferred brands, color scheme, silent operation)"
                                                        value={preferences}
                                                        onChange={(e) => setPreferences(e.target.value)}
                                                    />
                                                </div>

                                                <button type="submit" disabled={loading}>
                                                    {loading ? <div className="loading-spinner"></div> : 'Get Recommendation'}
                                                </button>
                                            </form>
                                        </div>

                                        {error && <div className="error">{error}</div>}
                                        
                                        {recommendation && (
                                            <div className="recommendation">
                                                <h3>Recommended Build:</h3>
                                                {parseRecommendation(recommendation)}
                                            </div>
                                        )}
                                    </div>
                                </PrivateRoute>
                            } />

                            {/* Redirect unknown routes to home */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;