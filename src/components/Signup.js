import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';
import './Login.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await signup(email, password);
            navigate('/login');
        } catch (error) {
            setError('Failed to create an account');
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <div className="login-form">
                <h1>Auth Signup</h1>

                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className="input-field"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="input-field"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        className="input-field"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm the password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="submit-button" type="submit" disabled={loading}>
                        signup
                    </button>
                </form>

                <p>
                    Already have an account? {' '}<Link to="/login">Login</Link>{' '}
                </p>
            </div>
        </div>
    );
};

export default Signup;
