import React from "react";
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  gridMargin: {
    margin: "1em",
  },
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  typo: {
    width: "100%",
    padding: "5px",
  },
  textFont: {
    fontSize: "2em",
  },
}));

export default function ChatHeader() {
  const classes = useStyles();

  const activeContact = useSelector((state) => state.activeContact);

  return (
    <div>
      <Grid container spacing={1} className={classes.gridMargin}>
        <Grid item xs={1} md={1} lg={1} xl={1} className={classes.avatarGrid}>
          <Avatar
            alt="current-user-photo"
            className={classes.large}
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          />
        </Grid>
        <Grid item xs={11} md={11} lg={11} xl={11}>
          <div className={classes.typo}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.textFont}
            >
              {console.log("active contact ", activeContact)}
              {activeContact}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
