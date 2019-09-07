import React, { Component } from 'react';
import Tweet from './Tweet';

class Tweets extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.tweets.map(tweet => (
                    <Tweet
                        key={tweet._id}
                        tweet={tweet}
                        handleDeleteTweet={this.props.handleDeleteTweet}
                    />
                ))}
            </ul>
        );
    }
}

export default Tweets;
