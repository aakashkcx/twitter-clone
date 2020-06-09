import React, { Component } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@material-ui/core';

class NewTweet extends Component {
    state = { tweet: '', msg: '' };

    tweetChange = (e) => this.setState({ tweet: e.target.value });

    reset = () => this.setState({ tweet: '', msg: '' });

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

    render() {
        return (
            <section>
                {this.state.msg && <Typography>{this.state.msg}</Typography>}
                <form
                    onSubmit={this.submit}
                    onReset={this.reset}
                    autoComplete="off"
                >
                    <TextField
                        value={this.state.tweet}
                        onChange={this.tweetChange}
                        label="Tweet"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="secondary" type="reset">
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </section>
        );
    }
}

export default NewTweet;
