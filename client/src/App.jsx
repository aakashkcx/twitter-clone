import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Tweet from './components/Tweet';

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

    handleNewTweet = () => {
        this.setState({
            user: {
                ...this.state.user,
                numTweets: this.state.user.numTweets + 1
            }
        });
    };

    render() {
        return (
            <Router>
                <Navbar
                    auth={this.state.auth}
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <div className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={routeProps => (
                                <Dashboard
                                    {...routeProps}
                                    token={this.state.token}
                                    auth={this.state.auth}
                                    user={this.state.user}
                                    handleNewTweet={this.handleNewTweet}
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
                        <Route
                            path="/tweet/:id"
                            render={routeProps => <Tweet {...routeProps} />}
                        />
                        <Route
                            path="/user/:id"
                            render={routeProps => <Profile {...routeProps} />}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const NoMatch = ({ location }) => (
    <div className="card card-body bg-light">
        <h1>404 Not Found</h1>
        <p>
            No match for <code>"{location.pathname}"</code>.
        </p>
    </div>
);

export default App;
