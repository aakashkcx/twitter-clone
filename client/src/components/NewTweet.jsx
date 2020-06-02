import React, { Component } from 'react';
import axios from 'axios';

class NewTweet extends Component {
    state = { tweet: '', msg: '' };

    tweetChange = (e) => this.setState({ tweet: e.target.value });

    submit = (e) => {
        e.preventDefault();
        axios
            .post(
                '/tweets',
                { tweet: this.state.tweet },
                { headers: { Authorization: `Bearer: ${this.props.token}` } }
            )
            .then(({ data: { tweet } }) => {
                this.props.newTweet(tweet);
                this.setState({ tweet: '', msg: '' });
            })
            .catch(({ response }) => {
                console.log(response);
                if (response.status === 400 || response.status === 401)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: 'Internal Server Error' });
            });
    };

    reset = () => this.setState({ tweet: '', msg: '' });

    render() {
        return (
            <div>
                {this.state.msg && <p>{this.state.msg}</p>}
                <form onSubmit={this.submit} onReset={this.reset}>
                    <textarea
                        value={this.state.tweet}
                        onChange={this.tweetChange}
                        placeholder="Tweet..."
                        rows="4"
                    ></textarea>
                    <input type="reset" value="Reset" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewTweet;
