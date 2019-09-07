import React, { Component } from 'react';

class Form extends Component {
    state = {
        tweet: ''
    };

    handleChange = event => {
        this.setState({ tweet: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleNewTweet(this.state.tweet);
        this.setState({ tweet: '' });
    };

    handleReset = event => {
        event.preventDefault();
        this.setState({ tweet: '' });
    };

    render() {
        return (
            <div className="card mb-4 bg-light">
                <div className="card-body">
                    <form
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}
                    >
                        <textarea
                            value={this.state.tweet}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                            placeholder="Your tweet here..."
                            rows="3"
                        ></textarea>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">
                                {this.state.tweet.length} character
                                {this.state.tweet.length !== 1 && 's'}
                            </small>
                            <div className="mt-2">
                                <input
                                    type="reset"
                                    value="Reset"
                                    className="text-center btn btn-danger mr-2"
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="text-center btn btn-primary"
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
