import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { AuthProvider } from './AuthContext';

import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';
import User from './routes/User';
import Tweet from './routes/Tweet';

import Navbar from './components/Navbar';
import Error from './components/Error';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Container maxWidth="xs">
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/tweet/:id" component={Tweet} />
                        <Route
                            render={({ location: { pathname } }) => (
                                <Error
                                    title={'404 Not Found'}
                                    msg={`No match for ${pathname}`}
                                />
                            )}
                        />
                    </Switch>
                </Container>
            </Router>
        </AuthProvider>
    );
};

export default App;
