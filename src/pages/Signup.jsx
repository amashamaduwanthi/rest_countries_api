import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';  // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        console.log('Email:', email);
        console.log('Password:', password);

        // Simple validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login'); // Redirect after signup
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border mb-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
