import React, { Component } from 'react';
import Form from './Form';
import Tweets from './Tweets';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Form
                    handleNewTweet={this.props.handleNewTweet}
                    token={this.props.token}
                    auth={this.props.auth}
                />
                <Tweets
                    tweets={this.props.tweets}
                    handleDeleteTweet={this.props.handleDeleteTweet}
                />
            </React.Fragment>
        );
    }
}

export default Dashboard;
