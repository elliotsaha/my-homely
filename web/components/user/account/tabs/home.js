import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../components/states";
import SeeMoreCard from "../../../../components/user/account/seeMoreCard";
import ProfileTracker from "../../../../components/user/account/profileTracker";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import AccountIcon from "@material-ui/icons/AccountCircle";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";
import MyListings from "../../account/myListings";
import Favourites from "../../account/favourties";
import ContactMailIcon from "@material-ui/icons/ContactMail";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    aboveFold: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "0.75rem",
      marginBottom: "2rem",

      marginRight: "2.5rem",
    },
    cardsGridContainer: {
      marginRight: "2rem",
      display: "flex",
      justifyContent: "center",
    },
    userIcon: {
      width: "8rem",
      height: "8rem",
      borderRadius: "1rem",
    },
    welcome: {
      fontSize: "2.5rem",
      textAlign: "center",
      color: "#08184A",
      fontWeight: 600,
      marginBottom: "-0.5rem",
    },
    aboveFold_sub: {
      color: "#848484",
      fontWeight: 500,
      fontSize: "1.1rem",
      maxWidth: "30rem",
      textAlign: "center",
    },
    cardsGrid: {
      display: "flex",
      gap: "1.25rem",
      maxWidth: "80rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1.5rem",
      [theme.breakpoints.down("1300")]: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      },
    },
    myListingsContainer: {
      position: "relative",
      marginLeft: "auto",
      marginRight: "auto",
    },
  })
);

export default function Home({ getIndex }) {
  const authLocalState = useRecoilValue(authState);
  const classes = useStyles();

  const cards = [
    {
      icon: <FaceRoundedIcon />,
      title: "Personalize Details and Settings",
      para:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat pulvinar dolor, non tempus mi porttitor ac. ",
      seeContext: "Manage Profile",
      contextIndex: 1,
    },

    {
      icon: <GradeRoundedIcon />,
      title: "See Your Favourite Listings",
      para:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat pulvinar dolor, non tempus mi porttitor ac. ",
      seeContext: "See Favourites",
      contextIndex: 2,
    },
    {
      icon: <ApartmentRoundedIcon />,
      title: "See Your Properties For Sale",
      para:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat pulvinar dolor, non tempus mi porttitor ac. ",
      seeContext: "See Listings",
      contextIndex: 3,
    },

    {
      icon: <ContactMailIcon />,
      title: "Manage iPurchase Agreements",
      para:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat pulvinar dolor, non tempus mi porttitor ac. ",
      seeContext: "Manage Agreements",
      contextIndex: 4,
    },
  ];

  if (authLocalState?.auth === true) {
    const user = authLocalState.user;
    return (
      <div className={classes.root}>
        <div className={classes.aboveFold}>
          <img className={classes.userIcon} src={user.icon} alt="icon" />
          <div className={classes.welcome}>Welcome, {user.name}</div>
          <div className={classes.aboveFold_sub}>
            Manage account data, your favourite listings, and your properties
            for sale here.
          </div>
        </div>
        {/*
        <div className={classes.root}>
          <ProfileTracker />
        </div>
        */}
        <div className={classes.cardsGridContainer}>
          <div className={classes.cardsGrid}>
            {cards.map((i) => {
              return (
                <div className={classes.cardOuter}>
                  <SeeMoreCard
                    icon={i.icon}
                    title={i.title}
                    para={i.para}
                    seeContext={i.seeContext}
                    contextIndex={i.contextIndex}
                    getIndex={getIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/*
        <div className={classes.myListingsContainer}>
          <MyListings />
        </div>

        <div className={classes.myListingsContainer}>
          <Favourites />
        </div>
        */}
      </div>
    );
  }
  return null;
}
