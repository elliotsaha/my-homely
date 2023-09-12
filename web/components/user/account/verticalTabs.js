import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import UserSmallProfile from "../../../components/user/account/userSmallProfile";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      minWidth: "15rem",
    },
    activeTab: {
      textAlign: "center",
      cursor: "pointer",
      background: "#E8F0FE",
      color: "#1A73E8",
      fontSize: "1rem",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      borderTopRightRadius: "7rem",
      borderBottomRightRadius: "7rem",
      paddingLeft: "2rem",
      transition: "all 0.25s ease",
    },
    icon: {
      marginTop: "0.4rem",
    },
    title: {},
    inactiveTab: {
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.25s ease",
      color: "#848B94",
      "&:hover": {
        transition: "all 0.25s ease",
        backgroundColor: "#F1F1F1",
      },
      "&:active": {
        transition: "all 0.25s ease",
        backgroundColor: "#E4E4E4",
      },
      fontSize: "1rem",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      borderTopRightRadius: "7rem",
      borderBottomRightRadius: "7rem",
      paddingLeft: "2rem",
    },
  })
);

export default function verticalTabs({ tabs, getIndex, tabIndex }) {
  const classes = useStyles();
  const [active, setActive] = React.useState(tabIndex);

  React.useEffect(() => {
    setActive(tabIndex);
  }, [tabIndex]);
  const setActives = (index) => {
    // Set Local State
    setActive(index);
    // Set Global State
    getIndex(index);
  };

  const [localTabs, setLocalTabs] = React.useState(tabs);

  React.useEffect(() => {
    setLocalTabs(tabs);
  }, [tabs]);

  return (
    <div className={classes.root}>
      <div>
        <UserSmallProfile />
      </div>
      <div>
        {localTabs.map((i, index) => {
          if (index === active) {
            return (
              <div className={classes.activeTab}>
                <div className={classes.icon}>{i.icon}</div>
                <div className={classes.title}>{i.title}</div>
              </div>
            );
          }
          return (
            <div
              className={classes.inactiveTab}
              onClick={() => setActives(index)}
            >
              <div className={classes.icon}>{i.icon}</div>
              <div className={classes.title}>{i.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
