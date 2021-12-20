import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import properties from "../../../testmaps.json";
import Card from "../../../../components/buyproperty/itemCardNoExpand";
import Link from "next/link";
import ScheduleIcon from "@material-ui/icons/Schedule";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    inner: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "2rem",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.75rem",
      color: "#08184A",
      fontWeight: "bold",
    },
    icon: {
      fontSize: "2rem",
      color: "#08184A",
    },
  })
);

export default function History() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <ScheduleIcon className={classes.icon} />
          History
        </div>
        <div className={classes.grid}>
          {properties.map((i, index) => {
            return (
              <div key={index}>
                <Link href={`/viewproperty?id=${i.id}`} passHref>
                  <Card itemData={i} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
