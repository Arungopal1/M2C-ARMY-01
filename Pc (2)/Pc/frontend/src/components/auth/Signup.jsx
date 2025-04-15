import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Signup = () => {
    // State variables for form fields, loading state, and error handling
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, error, setError } = useAuth(); // Auth context methods
    const navigate = useNavigate(); // Navigation hook

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!name || !email || !password || !confirmPassword) {
            return setError('Please fill in all fields');
        }

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {
            setError(''); // Clear any previous errors
            setLoading(true); // Set loading state to true
            await signup(email, password, name); // Call the signup function from AuthContext
            navigate('/'); // Redirect to the home page after successful signup
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('Signup failed. Please try again.'); // Display a user-friendly error message
        } finally {
            setLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                {/* Welcome Section */}
                <div className="auth-welcome">
                    <h1>M2C Army PC Builder</h1>
                   
                </div>

                {/* Header */}
                <h2>Create an Account</h2>

                {/* Error Message Display */}
                {error && <div className="auth-error">{error}</div>}

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {/* Links for Login */}
                <div className="auth-links">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;