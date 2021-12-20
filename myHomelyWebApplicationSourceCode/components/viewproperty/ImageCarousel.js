import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile, isTablet } from "react-device-detect";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      marginRight: "5rem",
      marginLeft: "5rem",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "30rem",
      margin: "2rem",
      height: "27rem",
      objectFit: "cover",
      borderRadius: "1.2rem",
      [theme.breakpoints.down("1500")]: {
        marginRight: "1.25rem",
        marginLeft: "1.25rem",
      },
      [theme.breakpoints.down("1200")]: {
        height: "25rem",
      },
    },
    dots: {
      "& .react-multi-carousel-dot--active button": {
        background: "#08184A",
      },
    },
  })
);

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

export default function ImageCarousel({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
        {data ? (
          data.map((i, index) => {
            return (
              <div key={index} className={classes.imageContainer}>
                <img
                  src={i.image}
                  alt="Property Showcase"
                  className={classes.image}
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </Carousel>
    </div>
  );
}
