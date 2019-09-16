import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Tweet extends Component {
    state = {
        id: this.props.match.params.id,
        tweet: false
    };

    componentDidMount() {
        axios
            .get(`/api/tweets/${this.state.id}`)
            .then(res => {
                this.setState({ tweet: res.data.tweet });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { tweet } = this.state;
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg mb-4"
                    onClick={() => window.history.back()}
                    style={{
                        textDecoration: 'none',
                        padding: '4px 16px'
                    }}
                >
                    &#8249;
                </button>
                <div className="card card-body bg-light">
                    {this.state.tweet ? (
                        <React.Fragment>
                            <h3 className="mb-4">
                                <Link to="/" className="text-body">
                                    @{tweet.username}
                                </Link>
                            </h3>
                            <h4 className="mb-4">{tweet.tweet}</h4>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">
                                    {tweet._id}
                                </small>
                                <h6 className="my-0">
                                    {new Date(tweet.date).toLocaleString(
                                        undefined,
                                        {
                                            dateStyle: 'medium',
                                            timeStyle: 'medium',
                                            hour12: 'false'
                                        }
                                    )}
                                </h6>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h1>404 Not Found</h1>
                            <p>No tweet found.</p>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default Tweet;
