import React, { Component } from 'react';
import Tweet from './Tweet';

class Tweets extends Component {
    render() {
        return (
            <div className="">
                <ul className="list-group">
                    {this.props.tweets.map(tweet => (
                        <Tweet
                            key={tweet._id}
                            tweet={tweet}
                            handleDelete={this.props.handleDelete}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Tweets;
