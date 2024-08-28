import React from 'react'
import './Login.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataFetch } from '../common/common';
export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(dataFetch + 'api/user/login', {
                emailId: data.email,
                password: data.password,
            });
            console.log('Response:', response?.data?.responseData);
            if (response) {
                localStorage.setItem("Token", response?.data?.responseData.token)
                localStorage.setItem("user", response?.data?.responseData.role)
                console.log(data);
                // navigate('/signup');
                navigate('/table');
            }

        } catch (error) {
            console.log('Error:', error);
        }

    };
    const loginPageNav = () => {
        navigate('/signup')
    }
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center viewport'>
            <form className='maindiv' onSubmit={handleSubmit(onSubmit)}>
                <div className='login'>
                    <div className='header'>
                        <p className='text'>Welcome back ...</p>
                    </div>
                    <div className='childDiv'>
                        {/* <label>Email ID:</label> */}
                        <input
                            className='input'
                            placeholder='Email ID..........'
                            type="email"
                            {...register('email', {
                                required: 'Email ID is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                    </div>

                    <div className='childDiv'>
                        {/* <label>Password:</label> */}
                        <input
                            className='input'
                            type="password"
                            placeholder='Password..........'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <div className='fpassword'>
                            <p className=''>Forget password?</p>
                        </div>
                    </div>

                    <div className='childDiv'>
                        <button className='button btn-sm' type="submit">Submit</button>
                    </div>
                    <div className='endDiv'>
                        <p>
                            Already Have an Account?{' '}
                            <span
                                onClick={loginPageNav}
                                style={{ color: 'orangered', cursor: 'pointer' }}
                            >
                                SignUp
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
