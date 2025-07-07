import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-xl w-96"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
                    Welcome Back
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
