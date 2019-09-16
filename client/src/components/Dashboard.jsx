import React, { Component } from 'react';
import axios from 'axios';

import User from './User';
import Form from './Form';
import Feed from './Feed';

class Dashboard extends Component {
    state = {
        tweets: []
    };

    componentDidMount() {
        axios
            .get('/api/tweets')
            .then(res => this.setState({ tweets: res.data.tweets }))
            .catch(err => console.log(err));
    }

    handleNewTweet = newTweet => {
        this.setState({
            tweets: [newTweet, ...this.state.tweets]
        });
        this.props.handleNewTweet();
    };

    render() {
        return (
            <React.Fragment>
                {this.props.auth && <User user={this.props.user} />}

                <Form
                    handleNewTweet={this.handleNewTweet}
                    token={this.props.token}
                    auth={this.props.auth}
                />
                <Feed tweets={this.state.tweets} />
            </React.Fragment>
        );
    }
}

export default Dashboard;
