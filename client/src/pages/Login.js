import React, { useState, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

function Login() {
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/users/login", data).then((response) => {
            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { username: response.data.username }
            });
            console.log(response.data);
            localStorage.setItem('user', data.username)
            navigate('/dashboard')
        });
    }

    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input
                type="text"
                onChange={(event) => {
                setUsername(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => {
                setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login;