import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
    // State variables for form fields, loading state, and error handling
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, error, setError } = useAuth(); // Auth context methods
    const navigate = useNavigate(); // Navigation hook

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError(''); // Clear any previous errors
            setLoading(true); // Set loading state to true
            await login(email, password); // Call the login function from AuthContext
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('Login failed. Please check your credentials.'); // Display a user-friendly error message
        } finally {
            setLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                {/* Welcome Section */}
                <div className="auth-welcome">
                    <h1>Welcome </h1>
                    
                </div>

                {/* Sign In Form */}
                <h2>Sign In</h2>

                {/* Error Message Display */}
                {error && <div className="auth-error">{error}</div>}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Links for Forgot Password and Signup */}
                <div className="auth-links">
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot Password?
                    </Link>
                    <p className="signup-prompt">
                        New to M2C Army?{' '}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;