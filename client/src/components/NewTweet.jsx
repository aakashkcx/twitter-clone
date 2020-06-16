import React, { useState, useContext } from "react";
import axios from "axios";
import { Box, Card, CardContent, TextField, Button } from "@material-ui/core";

import { AuthContext } from "../AuthContext";

const NewTweet = (props) => {
  const [tweet, setTweet] = useState("");
  const [msg, setMsg] = useState("");

  const { token } = useContext(AuthContext);

  const reset = () => {
    setTweet("");
    setMsg("");
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/tweets",
        { tweet },
        { headers: { Authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        props.newTweet(res.data.tweet);
        reset();
      })
      .catch(({ response }) => {
        if (response.status === 400 || response.status === 401)
          setMsg(response.data.msg);
        if (response.status === 500) setMsg("Internal Server Error");
      });
  };

  return (
    <Box my={3}>
      <Card variant="outlined">
        <CardContent>
          <form onSubmit={submit} onReset={reset} autoComplete="off">
            <TextField
              name="tweet"
              label="Tweet"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              error={msg}
              helperText={
                msg ||
                `${tweet.length} character${tweet.length === 1 ? "" : "s"}`
              }
              variant="outlined"
              margin="none"
              multiline
              rows={4}
              fullWidth
              required
            />
            <Box textAlign="right">
              <Button type="reset" variant="contained" color="secondary">
                Reset
              </Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewTweet;
