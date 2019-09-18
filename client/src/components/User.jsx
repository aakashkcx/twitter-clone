import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="card card-body bg-light mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="text-left">
                        <h3>
                            <Link
                                to={`/user/${user._id}`}
                                className="text-body"
                            >
                                @{user.username}
                            </Link>
                        </h3>
                        <small>
                            Joined:{' '}
                            {new Date(user.date).toLocaleDateString(undefined, {
                                dateStyle: 'medium'
                            })}
                        </small>
                    </div>
                    <div className="text-center">
                        <h6>Tweets:</h6>
                        <h6>{user.numTweets}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
