import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import axios from "axios";
import ContactsList from "./ContactsList";
import CurrentUserDisplay from "./CurrentUserDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserContacts } from "../../redux/actions/User";

const useStyle = makeStyles((theme) => ({
  divback: {
    background: "#ebebeb",
    height: "95vh",
    borderRadius: "10px",
  },
  gridmargin: {
    margin: "8px",
    paddingL: "4px",
  },
  divider: {
    background: "white",
  },
  currentuserbackground: {
    margin: "8px",
    paddingL: "4px",
    background: "#dedede",
    boxShadow: "2px 2px rgb(247, 247, 247, 0.5)",
    borderRadius: "10px",
    outline: "none",
  },
}));

export default function LeftPanel(props) {
  const classes = useStyle();

  const dispatch = useDispatch();

  const newState = useSelector((state) => state);
  useEffect(() => {
    // console.log(state);
    console.log(newState.currentUser.email);
    axios
      .get(`http://localhost:8080/all-contacts/${newState.currentUser.email}`) //currently hardcoded, set the state in previos useEffect, during sign in and then get the email of the current user
      .then((media) => {
        console.log(media.data);
        dispatch(setCurrentUserContacts(media.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container className={classes.divback}>
      <Grid item xs={11} md={11} lg={11} xl={11}>
        <Grid container className={classes.currentuserbackground}>
          <Grid xs={11} md={11} lg={11} xl={11}>
            <CurrentUserDisplay current={newState.currentUser.name} />
          </Grid>
        </Grid>

        <Grid container className={classes.gridmargin}>
          <Grid item xs={11} md={11} lg={11} xl={11}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>

        {/* blank for little seperation between main user and contacts */}
        <Grid container className={classes.gridmargin}>
          <Grid xs={11} md={11} lg={11} xl={11}></Grid>
        </Grid>
        {console.log("state ", newState)}
        <Grid container>
          <Grid xs={11} md={11} lg={11} xl={11}>
            <ContactsList
              contacts={newState.currentContactList}
              messageList={props.messageList}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
