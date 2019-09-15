import React, { Component } from 'react';

class Tweets extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.tweets.map(tweet => (
                    <li key={tweet._id} className="list-group-item">
                        <h6>@{tweet.username}</h6>
                        <p>{tweet.tweet}</p>
                        <div className="d-flex justify-content-between">
                            <small
                                className="text-muted"
                                style={{ fontSize: '0.7rem' }}
                            >
                                {tweet._id}
                            </small>
                            <small>
                                {new Date(tweet.date).toLocaleString(
                                    undefined,
                                    {
                                        dateStyle: 'medium',
                                        timeStyle: 'medium',
                                        hour12: 'false'
                                    }
                                )}
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Tweets;
