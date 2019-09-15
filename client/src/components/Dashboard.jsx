import React, { Component } from 'react';
import axios from 'axios';
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
    };

    render() {
        return (
            <React.Fragment>
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
