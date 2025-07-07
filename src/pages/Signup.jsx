import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

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
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
            <form
                onSubmit={handleSignup}
                className="bg-white p-8 rounded-2xl shadow-xl w-96"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-800">
                    Create an Account
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
