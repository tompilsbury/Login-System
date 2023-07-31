import React from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    let username = localStorage.getItem('user')
    console.log(username);

    return (
        <div className="dashContainer">
            <h1>Welcome {username}!</h1>
        </div>
    )
};

export default Dashboard;