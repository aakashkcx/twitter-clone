import React, { Component } from 'react';
import Form from './Form';
import Feed from './Feed';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Form
                    handleNewTweet={this.props.handleNewTweet}
                    token={this.props.token}
                    auth={this.props.auth}
                />
                <Feed tweets={this.props.tweets} />
            </React.Fragment>
        );
    }
}

export default Dashboard;
