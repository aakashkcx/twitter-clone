import React, { Component } from 'react';

class Tweet extends Component {
    render() {
        return (
            <li className="list-group-item">
                <h6>{this.props.tweet.username}</h6>
                <button
                    onClick={event => {
                        this.props.handleDeleteTweet(this.props.tweet._id);
                    }}
                    className="close"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>{this.props.tweet.tweet}</p>
                <small className="float-right text-muted">
                    {new Date(this.props.tweet.date).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                        hour12: 'false'
                    })}
                </small>
            </li>
        );
    }
}

export default Tweet;
