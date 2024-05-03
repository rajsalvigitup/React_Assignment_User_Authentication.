import React, { useState } from 'react';
import accounts from './account'; 
import './Auth.css'; 

const Authentication = ({ onAuthenticationSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        setPasswordError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Find the account matching the entered email
        const account = accounts.find(acc => acc.email === email);

        if (account) {
            // If account found, check password
            if (account.password === password) {
                // Call the callback function passed from the parent component
                onAuthenticationSuccess();
            } else {
                // Invalid password
                setPasswordError('Invalid password.');
            }
        } else {
            // Invalid email
            setEmailError('Invalid email.');
        }
    };

    return (
        <form className="authentication-form" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={email} onChange={handleEmailChange} required />
                {emailError && <p className="error">{emailError}</p>}
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
                {passwordError && <p className="error">{passwordError}</p>}
            </p>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Authentication;
