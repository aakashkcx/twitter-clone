import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
    state = {
        token: '',
        auth: false,
        user: null
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('/api/auth', { headers: { 'X-Auth-Token': token } })
                .then(res => {
                    axios
                        .get(`/api/users/${res.data.user_id}`)
                        .then(res => {
                            this.setState({
                                token,
                                auth: true,
                                user: res.data.user
                            });
                        })
                        .catch(err => localStorage.removeItem('token'));
                })
                .catch(err => localStorage.removeItem('token'));
        }
    }

    handleLogin = (token, user) => {
        localStorage.setItem('token', token);
        this.setState({
            token,
            auth: true,
            user
        });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({
            token: '',
            auth: false,
            user: null
        });
    };

    handleRegister = this.handleLogin;

    render() {
        return (
            <Router>
                <Navbar
                    auth={this.state.auth}
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <div className="container">
                    <Route
                        exact
                        path="/"
                        render={routeProps => (
                            <Dashboard
                                {...routeProps}
                                token={this.state.token}
                                auth={this.state.auth}
                                user={this.state.user}
                            />
                        )}
                    />
                    <Route
                        path="/login"
                        render={routeProps => (
                            <Login
                                {...routeProps}
                                handleLogin={this.handleLogin}
                            />
                        )}
                    />
                    <Route
                        path="/register"
                        render={routeProps => (
                            <Register
                                {...routeProps}
                                handleRegister={this.handleRegister}
                            />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
