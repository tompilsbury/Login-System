import './App.css';
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <div className="homeLink">
            <Link to="/"> Home Page </Link>
          </div>
          {!isAuthenticated() && (
            <div className='rightSide'>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register </Link>
            </div>
          )}
          {isAuthenticated() && (
            <div className='rightSide'>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<RequireAuth loginPath='/login'>
            <Dashboard />
          </RequireAuth>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
