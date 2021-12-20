import React, { useEffect, useState } from "react";
import { computeDistanceBetween } from "spherical-geometry-js";
import allMarkers from "../testmaps.json";
import Card from "../buyproperty/itemCardNoExpand";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile, isTablet } from "react-device-detect";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
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
    dots: {
      "& .react-multi-carousel-dot--active button": {
        background: "#08184A",
      },
    },
    header: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "2.5rem",
      marginLeft: "1.5rem",
      marginTop: "6rem",
    },
    bar: {
      width: "3.5rem",
      height: "0.35rem",
      background: "#08184A",
      marginLeft: "1.5rem",
      borderRadius: "0.15rem",
    },
  })
);
export default function OtherProperty({ data }) {
  const classes = useStyles();
  const [range, setRange] = useState([]);
  const handleQuery = (lat, lng) => {
    const origin = new google.maps.LatLng(lat, lng);
    const organize = [];
    allMarkers.map((i) => {
      const endpoint = new google.maps.LatLng(i["latitude"], i["longitude"]);
      organize.push({
        distance: computeDistanceBetween(origin, endpoint),
        item: i,
      });
    });
    const sorted = organize
      .slice()
      .sort((a, b) => a.distance - b.distance)
      .slice();
    setRange(sorted);
  };

  useEffect(() => {
    handleQuery(data.latitude, data.longitude);
  }, [data.latitude, data.longitude]);
  console.log(range.slice(1));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 5000, min: 1500 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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

  return (
    <div>
      <div className={classes.header}>Other Property You May Like</div>
      <div className={classes.bar}></div>
      <Carousel
        swipeable={!isMobile || !isTablet ? true : false}
        arrows={!isMobile ? true : false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={isMobile || isTablet ? true : false}
        autoPlaySpeed={2500}
        keyBoardControl={true}
      >
        {range.slice(1, 10).map((i, index) => {
          return (
            <div key={index} className={classes.inner}>
              <Link href={`/viewproperty?id=${i.item.id}`} passHref>
                <Card itemData={i.item} />
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
