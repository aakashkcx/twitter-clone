import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tweets extends Component {
    render() {
        return (
            <div className="list-group">
                {this.props.tweets.map(tweet => (
                    <Link
                        key={tweet._id}
                        to={`/tweet/${tweet._id}`}
                        className="list-group-item list-group-item-action"
                    >
                        <h6>@{tweet.username}</h6>
                        <p>{tweet.tweet}</p>
                        <small className="float-right">
                            {new Date(tweet.date).toLocaleString(undefined, {
                                dateStyle: 'medium',
                                timeStyle: 'medium',
                                hour12: 'false'
                            })}
                        </small>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Tweets;
