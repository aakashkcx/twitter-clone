import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        msg: '',
        redirect: false
    };

    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const login = { username, password };
        axios
            .post('/api/auth', login)
            .then(res => {
                const { token } = res.data;
                axios
                    .get(`/api/users/${res.data.user_id}`)
                    .then(res => {
                        this.props.handleLogin(token, res.data.user);
                        this.setState({ redirect: true });
                    })
                    .catch(err => {
                        if (err.response.status === 500)
                            this.setState({ msg: 'Internal Server Error.' });
                    });
            })
            .catch(err => {
                if (err.response.status === 400)
                    this.setState({ msg: err.response.data.msg });
                if (err.response.status === 500)
                    this.setState({ msg: 'Internal Server Error.' });
            });
    };

    handleReset = event => {
        event.preventDefault();
        this.setState({ username: '', password: '', msg: '' });
    };

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            <React.Fragment>
                <div
                    className={
                        'alert alert-danger alert-dismissible fade ' +
                        (this.state.msg ? 'show' : 'my-0 py-0')
                    }
                    role="alert"
                >
                    {this.state.msg}
                    <button
                        className="close"
                        onClick={() => this.setState({ msg: '' })}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <h5 className="card-title">Login</h5>
                        <form
                            onSubmit={this.handleSubmit}
                            onReset={this.handleReset}
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    placeholder="Username"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    placeholder="Password"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary"
                                disabled={
                                    !(
                                        this.state.username &&
                                        this.state.password
                                    )
                                }
                            />
                            <input
                                type="reset"
                                value="Reset"
                                className="btn btn-danger mx-2"
                                disabled={
                                    !(
                                        this.state.username ||
                                        this.state.password
                                    )
                                }
                            />
                        </form>
                        <div className="small text-muted mt-2">
                            Don't have an account?{' '}
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
