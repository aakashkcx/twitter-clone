import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';

class Register extends Component {
    state = { username: '', password: '', email: '', msg: '', redirect: false };

    usernameChange = (e) => this.setState({ username: e.target.value });
    passwordChange = (e) => this.setState({ password: e.target.value });
    emailChange = (e) => this.setState({ email: e.target.value });

    submit = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        axios
            .post('/users', { username, email, password })
            .then(({ data: { token, user } }) => {
                this.props.login(token, user);
                this.setState({ redirect: true });
            })
            .catch(({ response }) => {
                if (response.status === 400)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: 'Internal Server Error' });
            });
    };

    reset = () =>
        this.setState({ username: '', password: '', email: '', msg: '' });

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            <Box my={3}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4">Register</Typography>
                        <form onSubmit={this.submit} onReset={this.reset}>
                            <TextField
                                name="username"
                                label="Username"
                                value={this.state.username}
                                onChange={this.usernameChange}
                                error={this.state.msg}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.emailChange}
                                error={this.state.msg}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                            />
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                value={this.state.password}
                                onChange={this.passwordChange}
                                error={this.state.msg}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                            />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                mt={2}
                            >
                                <Typography color="error">
                                    {this.state.msg}
                                </Typography>
                                <span>
                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Reset
                                    </Button>
                                    &nbsp;
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </span>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default Register;
