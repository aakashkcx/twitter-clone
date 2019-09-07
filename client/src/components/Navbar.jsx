import React, { Component } from 'react';

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <span className="navbar-brand">Twitter Clone</span>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <div class="navbar-nav ml-auto">
                            <span class="nav-item nav-link">Link #1</span>
                            <span class="nav-item nav-link">Link #2</span>
                            <span class="nav-item nav-link">Link #3</span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
