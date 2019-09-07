import React, { Component } from 'react';

class Tweets extends Component {
    render() {
        return (
            <div className="">
                <ul className="list-group">
                    {this.props.tweets.map(tweet => (
                        <li className="list-group-item">
                            <p>{tweet.tweet}</p>
                            <small className="float-right">
                                {new Date(tweet.date).toLocaleString()}
                            </small>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Tweets;
