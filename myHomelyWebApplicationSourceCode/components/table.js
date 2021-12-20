import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  tableRoot: {
    background: "white",
    maxWidth: "70rem",
    borderRadius: "1rem",
    paddingBottom: "0.25rem",
    marginBottom: "3rem",
    boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
    [theme.breakpoints.down("990")]: {
      maxWidth: "50rem",
    },
  },
  tableContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gridTemplateRows: "15",
    "& div": {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
    },
  },
  title: {
    fontSize: "2.75rem",
    color: "#08184A",
    textAlign: "center",
    [theme.breakpoints.down("930")]: {
      fontSize: "2.4rem",
    },
    [theme.breakpoints.down("730")]: {
      fontSize: "1.8rem",
    },
  },
  lighterSpan: {
    color: "#249FFB",
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15rem",
    background: "#249FFB",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
    [theme.breakpoints.down("990")]: {
      width: "10rem",
    },
    [theme.breakpoints.down("675")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "7rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "5.65rem",
      fontSize: "0.95rem",
    },
  },
  trad: {
    display: "flex",
    background: "#249FFB",
    justifyContent: "center",
    alignItems: "center",
    width: "15rem",

    color: "white",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
    borderTopRightRadius: "1rem", // BORDERRADIUS RIGHT
    [theme.breakpoints.down("990")]: {
      width: "10rem",
    },
    [theme.breakpoints.down("675")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "7rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "5.65rem",
      fontSize: "0.95rem",
    },
  },
  mainCheck: {
    backgroundColor: "#F3FAFF",
    textAlign: "center",
  },
  icon: {
    color: "#249FFB",
    marginTop: "auto",
    marginBottom: "auto",
  },
  headerSegment: {
    background: "#249FFB",
    paddingBottom: "3.5rem!important",
    borderTopLeftRadius: "1rem", // BORDERRADIUS LEFT
  },
  iconContainer: {
    borderBottom: "1px dotted grey",
    display: "flex",
    justifyContent: "center",
  },
  tableTitle: {
    paddingLeft: "1.5rem",
    borderBottom: "1px dotted grey",
    width: "30rem",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#505254",
    [theme.breakpoints.down("990")]: {
      width: "25rem",
    },
    [theme.breakpoints.down("850")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("660")]: {
      width: "15rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "10rem",
      fontSize: "0.9rem",
      paddingLeft: "0.85rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "8rem",
    },
  },

  iconNoDots: {
    color: "#249FFB",
    marginTop: "auto",
    marginBottom: "auto",
  },
  iconContainerNoDots: {
    display: "flex",
    justifyContent: "center",
  },
  tableTitleNoDots: {
    paddingLeft: "1.5rem",
    width: "30rem",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#505254",
    [theme.breakpoints.down("990")]: {
      width: "25rem",
    },
    [theme.breakpoints.down("850")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("660")]: {
      width: "15rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "10rem",
      fontSize: "0.9rem",
      paddingLeft: "0.85rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "8rem",
    },
  },

  tableTitleHeader: {
    paddingLeft: "1.5rem",
    backgroundColor: "#F3FAFF",
    width: "30rem",
    fontWeight: 800,
    fontSize: "1.5rem",
    color: "#08184A",
    [theme.breakpoints.down("990")]: {
      width: "25rem",
    },
    [theme.breakpoints.down("850")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("660")]: {
      width: "15rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "10rem",
      fontSize: "1.1rem",
      paddingLeft: "0.85rem",
    },
    [theme.breakpoints.down("400")]: {
      fontSize: "0.95rem",
      width: "8rem",
    },
  },
  iconContainerHeader: {
    backgroundColor: "#F3FAFF",
    display: "flex",
    justifyContent: "center",
  },
  iconHeader: {
    backgroundColor: "#F3FAFF",
    color: "#249FFB",
    marginTop: "auto",
    marginBottom: "auto",
  },
  iconContainerHeader: {
    backgroundColor: "#F3FAFF",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  zeroDollars: {
    color: "#FFC000",
  },
}));
export default function table() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        An All-in-One Solution with{" "}
        <span className={classes.lighterSpan}>MyHomely</span>
      </h1>
      <div className={classes.tableRoot}>
        <div className={classes.tableContainer}>
          <div className={classes.headerSegment}></div>
          <div className={classes.name}>MyHomely</div>
          <div className={classes.trad}>Traditional Agent</div>

          {/*Special tableTitle*/}
          <div className={classes.tableTitleHeader}>
            <span className={classes.zeroDollars}>$0</span> Commissions
          </div>
          <div className={classes.iconContainerHeader}>
            <CheckCircleIcon className={classes.iconHeader} />
          </div>
          <div className={classes.iconContainerHeader}></div>

          <div className={classes.tableTitle}>
            Your Home on Leading Websites
          </div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>

          <div className={classes.tableTitle}>For Sale Sign</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>

          <div className={classes.tableTitle}>Live Support</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>

          <div className={classes.tableTitle}>No Listing Contract</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}></div>

          <div className={classes.tableTitleNoDots}>
            Direct Buyer / Seller Communication
          </div>
          <div className={classes.iconContainerNoDots}>
            <CheckCircleIcon className={classes.iconNoDots} />
          </div>
          <div className={classes.iconContainerNoDots}></div>

          {/*Special tableTitle*/}
          <div className={classes.tableTitleHeader}>
            Offers Made Online Directly to Sellers
          </div>
          <div className={classes.iconContainerHeader}>
            <CheckCircleIcon className={classes.iconHeader} />
          </div>
          <div className={classes.iconContainerHeader}></div>

          <div className={classes.tableTitle}>Instant Chat on Platform</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}></div>

          <div className={classes.tableTitle}>Listing & Offering Dashboard</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}></div>

          <div className={classes.tableTitle}>Buyer ID Verification</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}></div>

          <div className={classes.tableTitleNoDots}>
            Smart Lockbox with Live Reporting
          </div>
          <div className={classes.iconContainerNoDots}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainerNoDots}></div>

          {/*Special tableTitle*/}
          <div className={classes.tableTitleHeader}>
            Automatic Contract Creation Tool
          </div>
          <div className={classes.iconContainerHeader}>
            <CheckCircleIcon className={classes.iconHeader} />
          </div>
          <div className={classes.iconContainerHeader}></div>

          <div className={classes.tableTitle}>Digital Purchase Contract</div>
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={classes.icon} />
          </div>
          <div className={classes.iconContainer}></div>

          <div className={classes.tableTitleNoDots}>
            Easy Step-by-Step Process
          </div>
          <div className={classes.iconContainerNoDots}>
            <CheckCircleIcon className={classes.iconNoDots} />
          </div>
          <div className={classes.iconContainerNoDots}></div>
        </div>
      </div>
    </div>
  );
}
