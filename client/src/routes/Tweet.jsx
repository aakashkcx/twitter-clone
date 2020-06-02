import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Tweet extends Component {
    state = {
        tweet: null,
        msg: '',
    };

    componentDidMount() {
        axios
            .get(`/tweets/${this.props.match.params.id}`)
            .then(({ data: { tweet } }) => this.setState({ tweet }))
            .catch(({ response }) => {
                if (response.status === 404)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: 'Internal Server Error' });
            });
    }

    render() {
        const { tweet, msg } = this.state;
        return (
            <div>
                <button type="button" onClick={() => window.history.back()}>
                    Back
                </button>
                {tweet ? (
                    <div>
                        <Link to={`/user/${tweet.user._id}`}>
                            <h3>@{tweet.user.username}</h3>
                        </Link>
                        <h4>{tweet.tweet}</h4>
                        <small>{moment.unix(tweet.date).format('LLL')}</small>
                        <small>{tweet._id}</small>
                    </div>
                ) : (
                    <div>{msg}</div>
                )}
            </div>
        );
    }
}

export default Tweet;
