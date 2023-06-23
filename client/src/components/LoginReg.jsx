import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginReg.css'

const LoginReg = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [loginErrors, setLoginErrors] = useState("");
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword 
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/home");
            })
            .catch(err => {
                console.log(err);
                const errorResponse = err.response.data.errors;
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray);
            })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email,
            password
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/home");
            })
            .catch(err => {
                console.log(err);
                setLoginErrors(err.response.data);
            })
    }

    return (
        <div className='loginreg-container'>
            <h2>Register</h2>
            <form onSubmit={registerHandler} className='register'>
                {errors.map((err, index) => (
                    <p key={index} className="text-danger">{err}</p>
                ))}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-input" id="username" name="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-input" id="firstName" name="firstName" onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-input" id="lastName" name="lastName" onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-input" id="email" name="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-input" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-input" id="confirmPassword" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                { loginErrors ? <p className="text-danger">{loginErrors}</p> : "" }
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-input" id="email" name="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-input" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    )
}

export default LoginReg;
