import React, { Component } from 'react';

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container justify-content-center">
                    <span className="navbar-brand mx-0 px-0">
                        Twitter Clone
                    </span>
                </div>
            </nav>
        );
    }
}

export default Navbar;
