import React from 'react';
import { useSignOut, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const signOut = useSignOut();
    signOut();
    localStorage.removeItem('user')
    navigate('/login')

    // navigate('/login')
    return(<></>);
};

export default Logout;