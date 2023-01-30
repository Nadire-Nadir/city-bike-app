import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import RegisterForm from '../components/registerForm';
import '../styles/registerForm.css'

const SignupPage = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate(); 

    const handleSingup = () => { 
        if (username && password) {
            setLoading(true);
            axios.post('/user', {               
                "username": username,
                "password": password                
            }).then((response) => {
                if (response.data.message) {
                    setError(response.data.message);
                }
                if (response.data.token) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    navigate('/journey');

                }
                setLoading(false);
            }).catch(e => {
                console.log(e);
                setLoading(false);
            })
        }
    }

    return (
        <div className='body'>
            <RegisterForm
                onSubmit={handleSingup}
                setUsername={setUsername}
                setPassword={setPassword}
                loading={loading}
                error={error}
            />
        </div>
    )
}

export default SignupPage;