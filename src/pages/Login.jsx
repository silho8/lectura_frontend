import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pixel-white px-4">
            <div className="max-w-sm w-full bg-pixel-white border-4 border-pixel-black p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl text-pixel-black">Login</h1>
                    <p className="text-pixel-black mt-2 text-lg">Welcome back, student!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@school.com"
                        required
                    />
                    <FormInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-lg font-mono text-pixel-blue hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className="text-pixel-red text-lg text-center">{error}</p>}

                    <FormButton isLoading={loading}>
                        Sign In
                    </FormButton>
                </form>

                <p className="text-center text-lg text-pixel-black mt-8">
                    No account?{' '}
                    <Link to="/signup" className="font-mono text-pixel-blue hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
