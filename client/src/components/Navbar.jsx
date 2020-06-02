import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav>
            <Link to="/">Twitter Clone</Link>
            {props.user ? (
                <div>
                    <Link>{props.user.username}</Link>
                    <Link onClick={props.logout}>Logout</Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
