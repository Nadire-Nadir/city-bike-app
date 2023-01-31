import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { set } from 'local-storage';
import RegisterForm from '../components/registerForm';
import '../styles/registerForm.css';

const LoginPage = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    const postData = {
        "username": username,
        "password": password
    };

    const handleLogin = async () => {
        if (username && password) {
            setError(undefined);
            setLoading(true);
            axios.post('/signin', postData)
                .then((response) => {
                    set('token', response.data.token);
                    navigate('/journey');
                    setLoading(false);
                }).catch(e => {
                    setError(e.response.data.message);
                    setLoading(false);
                });
        };
    };

    return (
        <div className='body'>
            <RegisterForm
                onSubmit={handleLogin}
                signup={true}
                setUsername={setUsername}
                setPassword={setPassword}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default LoginPage;