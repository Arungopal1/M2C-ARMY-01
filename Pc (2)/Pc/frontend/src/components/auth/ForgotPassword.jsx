import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { resetPassword, error, setError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            return setError('Please enter your email address');
        }
        
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your email for further instructions');
        } catch (error) {
            // Error is handled in the AuthContext
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                {/* Welcome Section */}
                <div className="auth-welcome">
                    <h1>M2C Army PC Builder</h1>
                    <p>Your trusted partner in custom PC building</p>
                </div>
                
                <h2>Reset Password</h2>
                
                {error && <div className="auth-error">{error}</div>}
                {message && <div className="auth-success">{message}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
                
                <div className="auth-links">
                    <p>
                        <Link to="/login" className="auth-link">Back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
