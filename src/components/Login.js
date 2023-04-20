import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/')
        } catch (error) {
            setError('Failed to sign in')
        }
        setLoading(false)

    }

    return (
        <div className="container">
            <div className="login-form">
                <h1>Auth Login</h1>

                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" className="input-field" placeholder="Enter your mail" value={email} onChange={((e) => setEmail(e.target.value))} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" className="input-field" placeholder="Enter the password" value={password} onChange={((e) => setPassword(e.target.value))} />

                    <button type="submit" className="submit-button" disabled={loading}>Login</button>
                </form>

                <p>Need to create an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>

    );
};
export default Login;