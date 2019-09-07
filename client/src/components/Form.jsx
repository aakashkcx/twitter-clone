import React, { Component } from 'react';

class Form extends Component {
    state = {
        username: '',
        tweet: ''
    };

    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
    };

    handleTweetChange = event => {
        this.setState({ tweet: event.target.value });
    };

    handleSubmit = event => {
        const { username, tweet } = this.state;
        event.preventDefault();
        this.props.handleNewTweet({ username, tweet });
        this.setState({ tweet: '' });
    };

    render() {
        return (
            <div className="card mb-4 bg-light">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                            value={this.state.tweet}
                            onChange={this.handleTweetChange}
                            placeholder="Tweet ..."
                            className="form-control form-control-lg"
                            rows="3"
                        ></textarea>
                        <small className="text-muted float-right">
                            {this.state.tweet.length} character
                            {this.state.tweet.length !== 1 && 's'}
                        </small>
                        <div className="input-group">
                            <input
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                placeholder="Username"
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-primary"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
