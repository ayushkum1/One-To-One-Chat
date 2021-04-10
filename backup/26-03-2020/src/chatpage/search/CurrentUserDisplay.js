import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  typoDiv: {
    width: "100%",
    padding: "5px",
  },
  typo: {
    fontSize: "1.7em",
  },
  avatarMargin: {
    margin: "5px",
  },
  //   shadow: {
  //     boxShadow: "2px 2px rgb(247, 247, 247, 0.5)",
  //     borderRadius: "10px",
  //     outline: "none",
  //   },
}));

export default function CurrentUserDisplay(props) {
  const classes = useStyles();
  console.log(props.current);
  return (
    <div>
      <Grid container>
        <Grid item xs={2} md={2} lg={2} xl={2} className={classes.avatarMargin}>
          <Avatar
            alt="current-user-photo"
            className={classes.large}
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          />
        </Grid>
        <Grid item xs={9} md={9} lg={9} xl={9}>
          <div className={classes.typoDiv}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              {props.current}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
