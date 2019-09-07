import React, { Component } from 'react';

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <span className="navbar-brand">Twitter Clone</span>
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
                            <span className="nav-item nav-link">Link #1</span>
                            <span className="nav-item nav-link">Link #2</span>
                            <span className="nav-item nav-link">Link #3</span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
