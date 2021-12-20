import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Card from "../../../../components/buyproperty/itemCardFavourites";
import Link from "next/link";
import StarIcon from "@material-ui/icons/Star";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

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
      justifyContent: "flex-start",
      marginRight: "auto",
      gap: "0.5rem",
      fontSize: "1.75rem",
      color: "#08184A",
      fontWeight: "bold",
    },
    icon: {
      fontSize: "2rem",
      color: "#08184A",
    },
    nothingFoundContainer: {
      marginTop: "5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.3rem",
      textAlign: "center",
    },
    nothingFoundHeader: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    nothingFoundSub: {
      fontSize: "1.2rem",
      marginBottom: "1.1rem",
      color: "grey",
    },
    startBrowsing: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      background: "#249FFB",
      textTransform: "none",
      padding: "1.25rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
  })
);

export default function Favourites() {
  const [favourites, setFavourites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/getFavourites`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFavourites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        {loading ? (
          <div className={classes.grid}>
            <div className={classes.gridLoadingChild}>
              <CircularProgress />
            </div>
          </div>
        ) : !loading && favourites.length === 0 ? (
          <div className={classes.nothingFoundContainer}>
            <div className={classes.nothingFoundHeader}>
              You Have No Favourites Yet
            </div>
            <div className={classes.nothingFoundSub}>
              Start Browsing our collection of Homes
            </div>
            <div>
              <Button
                onClick={() => router.push("/buyproperty")}
                className={classes.startBrowsing}
              >
                Start Browsing Homes
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.grid}>
            {favourites.map((i, index) => {
              console.log(i);
              if (i !== null) {
                return (
                  <div key={index}>
                    <Link href={`/viewproperty?id=${i._id}`} passHref>
                      <Card itemData={i} />
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
