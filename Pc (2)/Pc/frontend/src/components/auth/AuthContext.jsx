import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Sign up function
    const signup = async (email, password, name) => {
        try {
            setError('');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update the user's profile with their name
            await updateProfile(userCredential.user, {
                displayName: name
            });
            
            return userCredential;
        } catch (error) {
            let errorMessage = "Failed to create an account.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email is already registered.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password is too weak.";
                    break;
                default:
                    errorMessage = error.message;
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            setError('');
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            let errorMessage = "Failed to log in.";
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = "Invalid email or password.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled.";
                    break;
                default:
                    errorMessage = error.message;
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Logout function
    const logout = () => {
        return signOut(auth);
    };

    // Reset password function
    const resetPassword = async (email) => {
        try {
            setError('');
            return await sendPasswordResetEmail(auth, email);
        } catch (error) {
            let errorMessage = "Failed to reset password.";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email.";
                    break;
                default:
                    errorMessage = error.message;
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Effect to handle auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Context value
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        error,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
