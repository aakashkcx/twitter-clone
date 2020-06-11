import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Link,
    Paper,
} from '@material-ui/core';
import {
    Favorite as FavoriteIcon,
    ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';

class Tweet extends Component {
    state = { tweet: null, msg: '' };

    componentDidMount() {
        axios
            .get(`/tweets/${this.props.match.params.id}`)
            .then(({ data: { tweet } }) => this.setState({ tweet }))
            .catch(({ response }) => {
                if (response.status === 404)
                    this.setState({ msg: response.data.msg });
                if (response.status === 500)
                    this.setState({ msg: 'Internal Server Error' });
            });
    }

    render() {
        const { tweet, msg } = this.state;
        const { user } = this.props;
        const liked =
            user &&
            tweet &&
            tweet.likes.filter((like) => like._id === user._id).length;
        return (
            <>
                <Box my={2}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </Box>
                <Box my={2}>
                    {tweet ? (
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" paragraph>
                                    <Link
                                        component={RouterLink}
                                        to={`/user/${tweet.user._id}`}
                                        color="inherit"
                                    >
                                        @{tweet.user.username}
                                    </Link>
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {tweet.tweet}
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="body2">
                                        {moment.unix(tweet.date).format('LLLL')}
                                        <br />
                                        {tweet.likes.length} Like
                                        {tweet.likes.length !== 1 && 's'}
                                    </Typography>
                                    <Button
                                        variant={
                                            liked ? 'contained' : 'outlined'
                                        }
                                        color="secondary"
                                        startIcon={<FavoriteIcon />}
                                        onClick={this.like}
                                    >
                                        {liked ? 'Liked' : 'Like'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent>
                                <Typography variant="h4">Error</Typography>
                                <Typography>{msg}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </>
        );
    }
}

export default Tweet;
