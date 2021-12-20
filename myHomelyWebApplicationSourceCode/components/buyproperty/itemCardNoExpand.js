import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    fontFamily: "Gilroy, sans-serif",
  },
  imageContainer: {
    marginBottom: "-0.25rem",
  },
  image: {
    width: "25rem",
    margin: 0,
    borderTopRightRadius: "1.25rem",
    borderTopLeftRadius: "1.25rem",
    height: "16.7rem",
    objectFit: "cover",
    [theme.breakpoints.down("1695")]: {
      width: "22rem",
    },
    [theme.breakpoints.down("520")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("450")]: {
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
    height: "13rem",
    [theme.breakpoints.down("1695")]: {
      width: "22rem",
    },
    [theme.breakpoints.down("520")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("450")]: {
      width: "18rem",
    },
  },
  price: {
    fontSize: "2.5rem",
    marginBottom: "0.25rem",
    fontWeight: 600,
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
  verified: {
    fontWeight: "bold",
    position: "absolute",
    bottom: "1rem",
  },
  verifiedChild: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    justifyContent: "center",
  },
  verifiedIconGreen: {
    width: "0.5rem",
    height: "0.5rem",
    background: "#13C946",
    borderRadius: "100%",
  },
  verifiedIconYellow: {
    width: "0.5rem",
    height: "0.5rem",
    background: "#eed202",
    borderRadius: "100%",
  },
  verifiedIconRed: {
    width: "0.5rem",
    height: "0.5rem",
    background: "#ff0033",
    borderRadius: "100%",
  },
}));

const itemCard = React.forwardRef(({ onClick, href, itemData }, ref) => {
  const classes = useStyles();
  const i = itemData;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const commaNumber = (num) => {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <a href={href} onClick={onClick} ref={ref} className={classes.link}>
          {i.query.HouseImages.length !== 0 ? (
            <img
              src={i?.query?.HouseImages[0]}
              alt="building"
              className={classes.image}
            />
          ) : (
            <img
              src="/defaultHouse.jpg"
              alt="building no picture"
              className={classes.image}
            />
          )}
        </a>
      </div>
      <div className={classes.textContainer}>
        <div className={classes.textInner}>
          <a href={href} onClick={onClick} ref={ref} className={classes.link}>
            <div className={classes.price}>
              {formatter.format(i?.query?.AskingPrice)}
            </div>
            <div className={classes.flexIcons}>
              <div className={classes.filter}>
                <img
                  src="/Icons/bed.svg"
                  alt="bed"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>
                  {i?.query?.Bedrooms} Beds
                </span>
              </div>
              <div className={classes.filter}>
                <img
                  src="/Icons/bath.svg"
                  alt="bath"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>
                  {i?.query?.Bathrooms} Baths
                </span>
              </div>
              <div className={classes.filter}>
                <img
                  src="/Icons/sqft.svg"
                  alt="sqft"
                  className={classes.filterIcon}
                />
                <span className={classes.filterText}>
                  {commaNumber(i?.query?.HouseSize?.area.toFixed(2))} sqft
                </span>
              </div>
            </div>

            <div className={classes.address}>{i?.query?.StreetAddress}</div>
            <div className={classes.verified}>
              {i?.approved === "True" ? (
                <div className={classes.verifiedChild}>
                  <div className={classes.verifiedIconGreen}></div>
                  <div>Approved</div>
                </div>
              ) : i?.approved !== "True" && i?.approved !== "False" ? (
                <div className={classes.verifiedChild}>
                  <div className={classes.verifiedIconYellow}></div>
                  <div>Pending Approval</div>
                </div>
              ) : (
                <div className={classes.verifiedChild}>
                  <div className={classes.verifiedIconRed}></div>
                  <div>Disapproved</div>
                </div>
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
});

export default itemCard;
