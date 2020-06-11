import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    AppBar,
    Container,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';

const Navbar = (props) => {
    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Toolbar
                    component={Box}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Button
                        color="inherit"
                        size="large"
                        component={Link}
                        to="/"
                        style={{ textTransform: 'none' }}
                    >
                        <Typography variant="h6">Twitter Clone</Typography>
                    </Button>
                    {props.user ? (
                        <span>
                            <Button
                                color="inherit"
                                size="large"
                                component={Link}
                                to={`/user/${props.user._id}`}
                            >
                                {props.user.username}
                            </Button>
                            <Button
                                color="inherit"
                                size="large"
                                onClick={props.logout}
                            >
                                Logout
                            </Button>
                        </span>
                    ) : (
                        <span>
                            <Button
                                color="inherit"
                                size="large"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                size="large"
                                component={Link}
                                to="/register"
                            >
                                Register
                            </Button>
                        </span>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
