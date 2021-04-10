import {
  Grid,
  makeStyles,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveContactAction } from "../../redux/actions/User";

const useStyle = makeStyles((theme) => ({
  gridmargin: {
    margin: "10px",
    padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  typoDiv: {
    width: "100%",
    padding: "5px",
  },
  typo: {
    fontSize: "1.3em",
  },
  divider: {
    background: "white",
  },
  contactsbackground: {
    overflowY: "scroll",
  }, //yet pending
}));

export default function ContactsList(props) {
  const dispatch = useDispatch();

  const classes = useStyle();
  console.log(props.contacts);

  const [count, setcount] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/all-messages`).then((media) => {
      setcount(media.data);
    });
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          {props.contacts.map((contact) => (
            <Grid
              container
              onClick={() => dispatch(setActiveContactAction(contact))}
            >
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Grid container className={classes.gridmargin}>
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={3}
                    xl={3}
                    className={classes.avatarAlignment}
                  >
                    <Avatar
                      alt="current-user-photo"
                      className={classes.small}
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    />
                  </Grid>
                  <Grid xs={9} md={9} lg={9} xl={9}>
                    <div className={classes.typoDiv}>
                      <Typography
                        variant="subtitle1"
                        align="left"
                        className={classes.typo}
                      >
                        {contact}
                      </Typography>
                      {/* {console.log(
                        "plssssss",
                        count.filter(
                          (x) =>
                            x.senderId === contact && x.status === "RECIEVED"
                        ).length
                      )} */}
                      {/* {count.filter(
                        (x) => x.senderId === contact && x.status === "RECIEVED"
                      ).length > 0 ? ( */}
                      <Typography>
                        {/* {
                            count.filter(
                              (x) =>
                                x.senderId === contact &&
                                x.status === "RECIEVED"
                            ).length
                          } */}
                        {/* new messages */}
                      </Typography>
                      {/* ) : null} */}
                    </div>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridmargin}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Divider className={classes.divider} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
