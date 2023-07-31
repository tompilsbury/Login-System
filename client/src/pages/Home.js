import React, { useState, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import logo from '../public/favicon.ico'
import logo from '../assets/reactjs.gif'
function Home() {
    return(
        <div className="homeContainer">
            <h1>Home Page</h1>
            <h2>Made with </h2>
            <img src={require('../assets/logo192.png')} alt="react" />
        </div>
    )
};

export default Home;