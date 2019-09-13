import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    state = {
        tweet: '',
        msg: ''
    };

    handleTweetChange = event => {
        this.setState({ tweet: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { tweet } = this.state;
        axios
            .post(
                '/api/tweets',
                { tweet },
                {
                    headers: { 'X-Auth-Token': this.props.token }
                }
            )
            .then(res => {
                this.props.handleNewTweet(res.data.createdTweet);
                this.setState({ tweet: '', msg: '' });
            })
            .catch(err => {
                const { response } = err;
                if (response.status === 400 || response.status === 401)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: JSON.stringify(response.data) });
            });
    };

    handleReset = event => {
        event.preventDefault();
        this.setState({ tweet: '' });
    };

    render() {
        return (
            <React.Fragment>
                <div
                    className={
                        'alert alert-danger alert-dismissible fade ' +
                        (this.state.msg ? 'show' : 'my-0 py-0')
                    }
                    role="alert"
                >
                    {this.state.msg}
                    <button
                        className="close"
                        onClick={() => this.setState({ msg: '' })}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="card mb-4 bg-light">
                    <div className="card-body">
                        <form
                            onSubmit={this.handleSubmit}
                            onReset={this.handleReset}
                        >
                            <textarea
                                value={this.state.tweet}
                                onChange={this.handleTweetChange}
                                placeholder="Tweet ..."
                                className="form-control form-control-lg"
                                rows="4"
                                required
                            ></textarea>
                            <div className="d-flex justify-content-between mt-3">
                                <small className="text-muted">
                                    {this.state.tweet.length} character
                                    {this.state.tweet.length !== 1 && 's'}
                                </small>
                                <div>
                                    <input
                                        type="reset"
                                        value="Reset"
                                        className="btn btn-danger mx-2"
                                        disabled={!this.state.tweet}
                                    />
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-primary"
                                        disabled={!this.props.auth}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Form;
