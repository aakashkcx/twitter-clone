import React, { Component } from 'react';

class Tweet extends Component {
    render() {
        const { tweet } = this.props;
        return (
            <li className="list-group-item">
                <h6>@{tweet.username}</h6>
                <p>{tweet.tweet}</p>
                <div className="d-flex justify-content-between">
                    <small className="text-muted">{tweet._id}</small>
                    <small>
                        {new Date(tweet.date).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'medium',
                            hour12: 'false'
                        })}
                    </small>
                </div>
            </li>
        );
    }
}

export default Tweet;
