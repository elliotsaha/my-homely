import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../components/states";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../../../components/buyproperty/itemCardFavourites";
import markers from "../../../components/testmaps.json";
import { isMobile, isTablet } from "react-device-detect";
import Link from "next/link";
import ApartmentIcon from "@material-ui/icons/Apartment";
import GradeIcon from "@material-ui/icons/Grade";
import axios from "axios";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: "80rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#08184A",
      display: "flex",
      alignItems: "center",
      gap: "1.15rem",
      marginTop: "2.5rem",
      marginBottom: "-1.5rem",
    },
    inner: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      width: "25rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "3.5rem",
      paddingRight: "1.5rem",
      marginBottom: "3rem",
    },
    icon: {
      fontSize: "3rem",
      marginTop: "1rem",
    },
  })
);
export default function MyListings() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 5000, min: 1500 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  const authLocalState = useRecoilValue(authState);
  const classes = useStyles();
  if (authLocalState?.auth === true) {
    const user = authLocalState.user;

    const [favourites, setFavourites] = React.useState([]);
    React.useEffect(() => {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/getFavourites`, {
          withCredentials: true,
        })
        .then((res) => {
          setFavourites(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    console.log(favourites);
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <div>
            <GradeIcon className={classes.icon} />
          </div>
          <div>Favourites</div>
        </div>
        <Carousel
          swipeable={!isMobile || !isTablet ? true : false}
          arrows={!isMobile ? true : false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={isMobile || isTablet ? true : false}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          dotListClass={classes.dots}
        >
          {favourites.map((i, index) => {
            return (
              <div key={index} className={classes.inner}>
                <Link href={`/viewproperty?id=${i._id}`} passHref>
                  <Card itemData={i} />
                </Link>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }

  return null;
}
