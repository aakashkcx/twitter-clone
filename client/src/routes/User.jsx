import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Feed from '../components/Feed';

class User extends Component {
    state = {
        user: null,
        tweets: [],
        msg: '',
    };

    componentDidMount() {
        axios
            .get(`/users/${this.props.match.params.id}`)
            .then(({ data: { user } }) => this.setState({ user }))
            .catch(({ response }) => {
                if (response.status === 404)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: 'Internal Server Error' });
            });
        axios
            .get(`/tweets/user/${this.props.match.params.id}`)
            .then(({ data: { tweets } }) => this.setState({ tweets }));
    }
    render() {
        const { user, tweets, msg } = this.state;
        return (
            <div>
                <button type="button" onClick={() => window.history.back()}>
                    Back
                </button>
                {this.state.user ? (
                    <div>
                        <div>
                            <h3>@{user.username}</h3>
                            <h5>{user.email}</h5>
                            <p>{moment.unix(user.date).format('LLL')}</p>
                            <small>{user._id}</small>
                        </div>
                        <hr />
                        <Feed tweets={this.state.tweets} />
                    </div>
                ) : (
                    <div>{this.state.msg}</div>
                )}
            </div>
        );
    }
}

export default User;
