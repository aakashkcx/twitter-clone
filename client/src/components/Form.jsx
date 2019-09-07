import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <div className="card mb-4 bg-light">
                <div className="card-body">
                    <form
                        onSubmit={this.props.handleTweetSubmit}
                        onReset={this.props.handleTweetReset}
                    >
                        <textarea
                            value={this.props.tweet}
                            onChange={this.props.handleTweetChange}
                            className="form-control form-control-lg"
                            placeholder="Your tweet here..."
                            rows="3"
                        ></textarea>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">
                                {this.props.tweet.length} character
                                {this.props.tweet.length !== 1 && 's'}
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
