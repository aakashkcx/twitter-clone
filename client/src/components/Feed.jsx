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
                            <Typography variant="body1" gutterBottom>
                                {tweet.tweet}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                {moment.unix(tweet.date).fromNow(false)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default Feed;
