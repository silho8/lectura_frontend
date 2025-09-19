import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setResetToken('');
        setLoading(true);
        try {
            const data = await authService.forgotPassword(email);
            setMessage(data.message);
            if (data.resetToken) {
                setResetToken(data.resetToken);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pixel-white px-4">
            <div className="max-w-sm w-full bg-pixel-white border-4 border-pixel-black p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl text-pixel-black">Forgot Password</h1>
                    <p className="text-pixel-black mt-2 text-lg">We'll send a reset token.</p>
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

                    {error && <p className="text-pixel-red text-lg text-center">{error}</p>}
                    {message && <p className="text-pixel-green text-lg text-center">{message}</p>}

                    {resetToken && (
                        <div className="p-4 bg-pixel-purple border-2 border-pixel-black">
                            <p className="text-lg text-pixel-black">
                                <strong>Dev Only:</strong> Reset token:
                            </p>
                            <p className="text-sm text-pixel-black break-all mt-2">{resetToken}</p>
                        </div>
                    )}


                    <FormButton isLoading={loading}>
                        Send Token
                    </FormButton>
                </form>

                <p className="text-center text-lg text-pixel-black mt-8">
                    Remembered it?{' '}
                    <Link to="/login" className="font-mono text-pixel-blue hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
