import React from 'react'
import './Signup.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { dataFetch } from '../common/common';
const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(dataFetch + 'api/user/create', {
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.email,
                mobileNo: data.mobileNo,
                password: data.password,
                role: data.role,
                password: data.password
            });
            console.log('Response:', response?.data?.responseData);
            if (response) {
                navigate('/');
            }

        } catch (error) {
            console.log('Error:', error);
        }

        console.log(data);
    };
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center viewport'>
            <form className='maindiv' onSubmit={handleSubmit(onSubmit)}>
                <div className='login'>
                    <div className='header'>
                        <p className='text'>Hello...!</p>
                    </div>
                    <div className='childDiv'>
                        {/* <label>First Name:</label> */}
                        <input
                            className='input'
                            placeholder='First Name..........'
                            type="text"
                            {...register('firstName', { required: 'First Name is required' })}
                        />
                        {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
                    </div>

                    <div className='childDiv'>
                        {/* <label>Last Name:</label> */}
                        <input
                            className='input'
                            type="text"
                            placeholder='Last Name..........'
                            {...register('lastName', { required: 'Last Name is required' })}
                        />
                        {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
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
                        {/* <label>Mobile No:</label> */}
                        <input
                            className='input'
                            type="text"
                            placeholder='Mobile No..........'
                            {...register('mobileNo', {
                                required: 'Mobile No is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Mobile No must be 10 digits'
                                }
                            })}
                        />
                        {errors.mobileNo && <p className='error'>{errors.mobileNo.message}</p>}
                    </div>

                    <div className='childDiv'>
                        {/* <label>Role:</label> */}
                        <select className='input' {...register('role', { required: 'Role is required' })}>
                            <option value="">Select Role</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Guest">Guest</option>
                        </select>
                        {errors.role && <p className='error'>{errors.role.message}</p>}
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
                    </div>
                    <div className='childDiv'>
                        <button className='button btn-sm' type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup