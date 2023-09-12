import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    fontFamily: "Gilroy, sans-serif",
    boxShadow: "0.2rem 0.2rem 3rem 0.2rem #ccc",
    borderRadius: "1.25rem",
  },
  imageContainer: {
    marginBottom: "-0.25rem",
  },
  image: {
    width: "25rem",
    margin: 0,
    borderTopRightRadius: "1.25rem",
    borderTopLeftRadius: "1.25rem",
    height: "18.7rem",
    objectFit: "cover",
    [theme.breakpoints.down("1695")]: {
      width: "22rem",
    },
    [theme.breakpoints.down("744")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("520")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("330")]: {
      width: "18rem",
    },
  },
  textContainer: {
    background: "white",
    paddingBottom: "1.5rem",
    paddingTop: "0.75rem",
    borderBottomRightRadius: "1.25rem",
    borderBottomLeftRadius: "1.25rem",
    width: "25rem",
    height: "11rem",
    [theme.breakpoints.down("1695")]: {
      width: "22rem",
    },
    [theme.breakpoints.down("744")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("520")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("330")]: {
      width: "18rem",
    },
  },
  price: {
    fontSize: "2.5rem",
    marginBottom: "0.25rem",
  },
  flexIcons: {
    display: "flex",
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
  },
  filterIcon: {
    width: "1.5rem",
  },
  filterText: {
    marginLeft: "0.25rem",
    marginRight: "1rem",
    marginTop: "0.1rem",
    color: "grey",
    fontSize: "0.9rem",
  },
  address: {
    fontSize: "1rem",
    marginTop: "0.5rem",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  textInner: {
    marginLeft: "1.1rem",
    marginRight: "1.1rem",
  },
}));

const itemCard = React.forwardRef(({ onClick, href, itemData }, ref) => {
  const classes = useStyles();
  const i = itemData;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <a href={href} onClick={onClick} ref={ref} className={classes.link}>
          <img
            src={i?.HouseImages[0].image}
            alt="building"
            className={classes.image}
          />
        </a>
      </div>
      <div className={classes.textContainer}>
        <div className={classes.textInner}>
          <a href={href} onClick={onClick} ref={ref} className={classes.link}>
            <div className={classes.price}>
              ${(i?.AskingPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </div>
            <div className={classes.flexIcons}>
              <div className={classes.filter}>
                <img
                  src="/Icons/bed.svg"
                  alt="bed"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>{i?.Bedrooms} Beds</span>
              </div>
              <div className={classes.filter}>
                <img
                  src="/Icons/bath.svg"
                  alt="bath"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>{i?.Bathrooms} Baths</span>
              </div>
              <div className={classes.filter}>
                <img
                  src="/Icons/sqft.svg"
                  alt="sqft"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>
                  {(i?.HouseSize.width * i?.HouseSize.length)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  sqft
                </span>
              </div>
            </div>

            <div className={classes.address}>{i?.StreetAddress}</div>
          </a>
        </div>
      </div>
    </div>
  );
});

export default itemCard;
