import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

import Feed from "../components/Feed";
import Error from "../components/Error";

const User = ({ match: { params } }) => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`/users/${params.id}`)
      .then(({ data: { user } }) => setUser(user))
      .catch(({ response }) => {
        if (response.status === 404) setMsg(response.data.msg);
        if (response.status === 500) setMsg("Internal Server Error");
      });
    axios
      .get(`/tweets/user/${params.id}`)
      .then(({ data: { tweets } }) => setTweets(tweets))
      .catch((err) => console.log(err));
  }, [params.id]);

  if (!user) return <Error title="Error" msg={msg} />;

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
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" paragraph>
              @{user.username}
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body2" paragraph>
              Joined {moment.unix(user.date).format("LLL")}
            </Typography>
            <Typography variant="body1">
              {tweets.length} Tweet{tweets.length !== 1 && "s"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Feed tweets={tweets} />
    </>
  );
};

export default User;
