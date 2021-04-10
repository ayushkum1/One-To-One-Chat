import { Button, Grid, makeStyles, TextareaAutosize } from "@material-ui/core";
import React from "react";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
  textarea: {
    width: "100%",
    padding: "1em",
    borderRadius: "10px",
    outline: "none",
    border: "1px solid rgb(219, 219, 219)",
    fontSize: "1.5em",
    boxShadow: "5px 5px rgb(209, 207, 207, 0.8)",
  },
  textAreaPosition: {
    marginLeft: "10px",
  },
}));

export default function MessageTextArea() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.textAreaPosition}>
        <Grid item xs={9} md={9} lg={9} xl={9}>
          <TextareaAutosize
            rowsMin="1"
            placeholder="Type a message"
            className={classes.textarea}
          />
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
