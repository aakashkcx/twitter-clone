import React, { Component } from 'react';
import axios from 'axios';

import Feed from '../components/Feed';
import NewTweet from '../components/NewTweet';

class Dashboard extends Component {
    state = {
        tweets: [],
    };

    componentDidMount() {
        axios
            .get('/tweets')
            .then(({ data: { tweets } }) => this.setState({ tweets }))
            .catch((err) => console.log(err));
    }

    newTweet = (tweet) =>
        this.setState({ tweets: [tweet, ...this.state.tweets] });

    render() {
        return (
            <div>
                <NewTweet token={this.props.token} newTweet={this.newTweet} />
                <Feed tweets={this.state.tweets} />
            </div>
        );
    }
}

export default Dashboard;
