import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  BrightnessHigh as BrightnessHighIcon,
  BrightnessLow as BrightnessLowIcon,
} from "@material-ui/icons";

import { AuthContext } from "../AuthContext";

const Navbar = ({ theme: [dark, setDark] }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Toolbar component={Box} display="flex" justifyContent="space-between">
          <Button
            color="inherit"
            size="large"
            component={Link}
            to="/"
            style={{ textTransform: "none" }}
          >
            <Typography variant="h6">Twitter Clone</Typography>
          </Button>
          <Box>
            {user ? (
              <>
                <Button
                  color="inherit"
                  size="large"
                  component={Link}
                  to={`/user/${user._id}`}
                >
                  {user.username}
                </Button>
                <Button color="inherit" size="large" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
            <IconButton color="inherit" onClick={() => setDark(!dark)}>
              {dark ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
