import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
    getLinks = () => {
        if (this.props.auth) {
            return (
                <React.Fragment>
                    <span className="nav-item nav-link">
                        {this.props.user.username}
                    </span>
                    <span
                        onClick={this.props.handleLogout}
                        className="nav-item nav-link"
                        style={{ cursor: 'pointer' }}
                    >
                        Logout
                    </span>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <NavLink
                        to="/login"
                        className="nav-item nav-link"
                        activeClassName="active"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="nav-item nav-link"
                        activeClassName="active"
                    >
                        Register
                    </NavLink>
                </React.Fragment>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        Twitter Clone
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav ml-auto">
                            {this.getLinks()}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
