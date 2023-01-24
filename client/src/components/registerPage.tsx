import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import '../loginPage.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        login({ username, password }).catch(() =>
            notify('Invalid username or password')
        );
    };

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    name='username'
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    name='password'
                    type='text'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={handleSubmit}>login</button>
                <p className='message'>Not registered? <a href="#">Create an account</a></p>
            </form>
        </div>
    );
};

export default Register;