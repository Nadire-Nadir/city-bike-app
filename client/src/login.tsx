import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // will call authProvider.login({ username, password })
        login({ username, password }).catch(() =>
            notify('Invalid username or password')
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </form>
    );
};

export default LoginPage;