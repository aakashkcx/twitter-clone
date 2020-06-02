import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    initialState = { username: '', password: '', msg: '' };
    state = { ...this.initialState, redirect: false };

    usernameChange = (e) => this.setState({ username: e.target.value });
    passwordChange = (e) => this.setState({ password: e.target.value });

    submit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios
            .post('/auth', { username, password })
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

    reset = () => this.setState(this.initialState);

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            <div>
                <h1>Login</h1>
                {this.state.msg && <p>{this.state.msg}</p>}
                <form onSubmit={this.submit} onReset={this.reset}>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.usernameChange}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.passwordChange}
                        placeholder="Password"
                    />
                    <input type="submit" value="Login" />
                    <input type="reset" value="Reset" />
                </form>
            </div>
        );
    }
}

export default Login;
