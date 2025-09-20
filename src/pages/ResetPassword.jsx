import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const data = await authService.resetPassword({ token, new_password: newPassword });
            setMessage(data.message + " Redirecting to login...");
            setTimeout(() => navigate('/login'), 3000);
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
                    <h1 className="text-3xl text-pixel-black">Reset Password</h1>
                    <p className="text-pixel-black mt-2 text-lg">Enter a new password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        id="token"
                        label="Reset Token"
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste token here"
                        required
                    />
                    <FormInput
                        id="newPassword"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="********"
                        required
                    />

                    {error && <p className="text-pixel-red text-lg text-center">{error}</p>}
                    {message && <p className="text-pixel-green text-lg text-center">{message}</p>}

                    <FormButton isLoading={loading}>
                        Reset Password
                    </FormButton>
                </form>

                 <p className="text-center text-lg text-pixel-black mt-8">
                    <Link to="/login" className="font-mono text-pixel-blue hover:underline">
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
