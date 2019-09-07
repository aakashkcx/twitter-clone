import React, { Component } from 'react';

class Tweet extends Component {
    render() {
        return (
            <li className="list-group-item">
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
