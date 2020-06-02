import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Feed = (props) => {
    return (
        <div>
            {props.tweets.map((tweet) => (
                <Link to={`/tweet/${tweet._id}`}>
                    <div key={tweet._id}>
                        <h3>@{tweet.user.username}</h3>
                        <p>{tweet.tweet}</p>
                        <p>{moment.unix(tweet.date).fromNow(false)}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
