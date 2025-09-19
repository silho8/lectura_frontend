import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup({ full_name: fullName, email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pixel-white px-4 py-8">
            <div className="max-w-sm w-full bg-pixel-white border-4 border-pixel-black p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl text-pixel-black">Create Account</h1>
                    <p className="text-pixel-black mt-2 text-lg">Join the community!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        id="fullName"
                        label="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
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
                    <FormInput
                        id="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="********"
                        required
                    />

                    {error && <p className="text-pixel-red text-lg text-center">{error}</p>}

                    <FormButton isLoading={loading} fullWidth>
                        Sign Up
                    </FormButton>
                </form>

                <p className="text-center text-lg text-pixel-black mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="font-mono text-pixel-blue hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
