import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Tweets from './components/Tweets';

class App extends Component {
    state = {
        tweets: []
    };

    componentDidMount() {
        axios
            .get('/api/tweets')
            .then(res => this.setState({ tweets: res.data.tweets }))
            .catch(err => console.log(err));
    }

    handleNewTweet = tweet => {
        axios
            .post('/api/tweets', tweet)
            .then(res =>
                this.setState({
                    tweets: [res.data.createdTweet, ...this.state.tweets]
                })
            )
            .catch(err => console.log(err));
    };

    handleDeleteTweet = id => {
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
                    <Form handleNewTweet={this.handleNewTweet} />
                    <Tweets
                        tweets={this.state.tweets}
                        handleDeleteTweet={this.handleDeleteTweet}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
