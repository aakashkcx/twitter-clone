import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@material-ui/core';

const Feed = (props) => {
    return (
        <Box my={3}>
            {props.tweets.map((tweet) => (
                <Card key={tweet._id} variant="outlined" square>
                    <CardActionArea component={Link} to={`/tweet/${tweet._id}`}>
                        <CardContent>
                            <Typography variant="h6">
                                @{tweet.user.username}
                            </Typography>
                            <Typography gutterBottom>{tweet.tweet}</Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {moment.unix(tweet.date).fromNow(false)}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    ❤ {tweet.likes.length}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default Feed;
