import React, { Component } from 'react';
import axios from 'axios';

import User from './User';
import Feed from './Feed';

class Profile extends Component {
    state = {
        id: this.props.match.params.id,
        user: {},
        tweets: [],
    };

    componentDidMount() {
        axios
            .get(`/users/${this.state.id}`)
            .then((res) => {
                this.setState({ user: res.data.user });
                axios
                    .get(`/tweets/user/${this.state.id}`)
                    .then((res) => {
                        this.setState({ tweets: res.data.tweets });
                    })
                    .catch((err) => {});
            })
            .catch((err) => {
                this.setState({ user: false });
            });
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="back-button mb-4"
                    onClick={() => window.history.back()}
                >
                    &#8249;
                </button>
                {this.state.user ? (
                    <React.Fragment>
                        <User user={this.state.user} />
                        <Feed tweets={this.state.tweets} />
                    </React.Fragment>
                ) : (
                    <div className="card card-body bg-light">
                        <h1>404 Not Found</h1>
                        <p>No user found.</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Profile;
