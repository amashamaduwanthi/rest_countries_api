import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError('Invalid credentials');
            setIsLoading(false);
        }
    };

    return (
        // Update the background style in your Login component
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
            }}

        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className={`w-full max-w-md relative z-10 transition-all duration-500 ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-icons text-4xl text-blue-600">account_circle</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your account</p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start">
                                <span className="material-icons text-red-500 mr-2">error</span>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">email</span>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline flex items-center">
                                        <span className="material-icons text-base mr-1">lock_reset</span>
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">lock</span>
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center ${
                                    isLoading ? 'opacity-75' : ''
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="material-icons animate-spin mr-2">refresh</span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-icons mr-2">login</span>
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/" className="text-blue-600 hover:underline font-medium flex items-center justify-center">
                                <span className="material-icons text-base mr-1">person_add</span>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;