import React, { useState, useContext } from 'react';
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

import { AuthContext } from '../AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { login } = useContext(AuthContext);

    const reset = () => {
        setUsername('');
        setPassword('');
        setMsg('');
    };

    const submit = (e) => {
        e.preventDefault();
        axios
            .post('/auth', { username, password })
            .then(({ data: { token, user } }) => {
                login(token, user);
                setRedirect(true);
            })
            .catch(({ response }) => {
                if (response.status === 400) setMsg(response.data.msg);
                if (response.status === 500) setMsg('Internal Server Error');
            });
    };

    if (redirect) return <Redirect to="/" />;

    return (
        <Box my={3}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4">Login</Typography>
                    <form onSubmit={submit} onReset={reset}>
                        <TextField
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={msg}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={msg}
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
                            <Typography color="error">{msg}</Typography>
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
};

export default Login;
