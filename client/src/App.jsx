import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Tweets from './components/Tweets';

class App extends Component {
    state = {
        tweet: '',
        tweets: []
    };

    componentDidMount() {
        axios
            .get('/api/tweets')
            .then(res => this.setState({ tweets: res.data }))
            .catch(err => console.log(err));
    }

    handleTweetChange = event => {
        this.setState({ tweet: event.target.value });
    };

    handleTweetReset = event => {
        this.setState({ tweet: '' });
    };

    handleTweetSubmit = event => {
        event.preventDefault();
        axios
            .post('/api/tweets', { tweet: this.state.tweet })
            .then(res =>
                this.setState({ tweets: [res.data, ...this.state.tweets] })
            )
            .catch(err => console.log(err))
            .finally(() => this.setState({ tweet: '' }));
    };

    handleDelete = id => {
        axios
            .delete(`/api/tweets/${id}`)
            .then(res => {
                this.setState({
                    tweets: this.state.tweets.filter(tweet => tweet._id !== id)
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container">
                    <Form
                        tweet={this.state.tweet}
                        handleTweetChange={this.handleTweetChange}
                        handleTweetSubmit={this.handleTweetSubmit}
                        handleTweetReset={this.handleTweetReset}
                    />
                    <Tweets
                        tweets={this.state.tweets}
                        handleDelete={this.handleDelete}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
