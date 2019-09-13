import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Form';
import Tweets from './components/Tweets';

class App extends Component {
    state = {
        tweets: [],
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
                    this.setState({
                        token,
                        auth: true,
                        user: res.data.user
                    });
                })
                .catch(err => {
                    localStorage.removeItem('token');
                });
        }

        axios
            .get('/api/tweets')
            .then(res => this.setState({ tweets: res.data.tweets }))
            .catch(err => console.log(err));
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

    handleRegister = (token, createdUser) => {
        localStorage.setItem('token', token);
        this.setState({
            token,
            auth: true,
            user: createdUser
        });
    };

    handleNewTweet = newTweet => {
        this.setState({
            tweets: [newTweet, ...this.state.tweets]
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
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <React.Fragment>
                                <Form
                                    handleNewTweet={this.handleNewTweet}
                                    token={this.state.token}
                                    auth={this.state.auth}
                                />
                                <Tweets
                                    tweets={this.state.tweets}
                                    handleDeleteTweet={this.handleDeleteTweet}
                                />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        path="/login"
                        render={props => (
                            <Login handleLogin={this.handleLogin} />
                        )}
                    />
                    <Route
                        path="/register"
                        render={props => (
                            <Register handleRegister={this.handleRegister} />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
