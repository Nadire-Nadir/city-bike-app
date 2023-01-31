import { IoPersonCircle } from 'react-icons/io5';


const RegisterForm = (props: any) => {
    const { onSubmit, signup, setUsername, setPassword, loading, error } = props;

    return (
        <div className='container'>
            <div className='form-box'>
                <div className='header-form'>
                    <div >
                        <IoPersonCircle style={{ fontSize: '110px', color: '#6495ED' }} />
                    </div>
                </div>
                <div className='body-form'>
                    <form>
                        <div className='input'>
                            <input type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className='input'>
                            <input type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        {loading ?
                            <div className="loader register-loader"></div>
                            :
                            <button type='button' onClick={onSubmit}>
                                {signup ?
                                    'LOGIN'
                                    :
                                    'SIGN UP'
                                }
                            </button>
                        }
                        {error &&
                            <p className='error'>{error}</p>
                        }
                        
                        <div className='message'>
                            {signup ?
                                <a href='/signup'>New user? Please sign up here</a>
                                :
                                <a href='/login'>Already have an account? login here</a>
                            }
                        </div>
                            
                            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;

