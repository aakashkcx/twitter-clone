import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'space-between',
    },
    title: {
        textTransform: 'none',
    },
});

const Navbar = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Toolbar className={classes.toolbar}>
                    <Button
                        color="inherit"
                        size="large"
                        component={Link}
                        to="/"
                    >
                        <Typography variant="h6" className={classes.title}>
                            Twitter Clone
                        </Typography>
                    </Button>
                    {props.user ? (
                        <nav>
                            <Button
                                color="inherit"
                                size="large"
                                component={Link}
                                to="/"
                            >
                                {props.user.username}
                            </Button>
                            <Button
                                color="inherit"
                                size="large"
                                component={Link}
                                to="/"
                            >
                                Logout
                            </Button>
                        </nav>
                    ) : (
                        <nav>
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
                        </nav>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
