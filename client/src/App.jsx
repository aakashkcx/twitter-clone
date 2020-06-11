import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
} from '@material-ui/core';

import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';
import User from './routes/User';
import Tweet from './routes/Tweet';

import Navbar from './components/Navbar';

class App extends Component {
    state = { token: '', user: null };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token)
            axios
                .get('/auth', { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data: { user } }) => {
                    this.setState({ token, user });
                })
                .catch((err) => localStorage.removeItem('token'));
    }

    login = (token, user) => {
        localStorage.setItem('token', token);
        this.setState({ token, user });
    };

    logout = () => {
        localStorage.removeItem('token');
        this.setState({ token: '', user: null });
    };

    render() {
        return (
            <Router>
                <Navbar user={this.state.user} logout={this.logout} />
                <Container maxWidth="xs">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Dashboard token={this.state.token} />
                            )}
                        />
                        <Route
                            path="/login"
                            render={() => <Login login={this.login} />}
                        />
                        <Route
                            path="/register"
                            render={() => <Register login={this.login} />}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => <User {...props} />}
                        />
                        <Route
                            path="/tweet/:id"
                            render={(props) => (
                                <Tweet {...props} user={this.state.user} />
                            )}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

const NotFound = ({ location }) => (
    <Box my={3}>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h4">404 Not Found</Typography>
                <Typography>No match for "{location.pathname}".</Typography>
            </CardContent>
        </Card>
    </Box>
);

export default App;
