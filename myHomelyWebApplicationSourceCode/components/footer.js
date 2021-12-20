import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import { waitForNone } from "recoil";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    width: "100%",
    background: "#DAEFFF",
    clipPath: "polygon(0 7%, 100% 0, 100% 100%, 0 100%)",
    paddingTop: "7.5rem",
    fontFamily: "Gilroy, sans-serif",
    marginTop: "2rem",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("1164")]: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  button: {
    background: "#249FFB",
    color: "white",
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    padding: "1rem",
    marginTop: "0.5rem",
    "&:hover": {
      background: "#249FFB",
    },
  },
  terms: {
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
  image: {
    padding: 0,
    margin: 0,
    marginBottom: "-1rem",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("1164")]: {
      display: "grid",
      gridTemplateColumns: "0.95fr 0.55fr",
      gridTemplateRows: "1fr 1fr",
    },
    [theme.breakpoints.down("675")]: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr 0.9fr 0.4fr 0.4fr",
    },
  },
  logo: {
    width: "15rem",
    margin: 0,
  },
  companyName: {
    fontWeight: "bold",
  },
  companyDescription: {
    maxWidth: "23rem",
  },
  linksContainer: {
    marginTop: "3rem",
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    "& div": {
      paddingBottom: "1rem",
    },
    [theme.breakpoints.down("770")]: {
      display: "none",
    },
  },
  smallLink: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    marginTop: "1rem",
    "& div": {
      paddingBottom: "1rem",
    },
    [theme.breakpoints.up("770")]: {
      display: "none",
    },
  },
  linkTitle: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  googlePlay: {
    width: "9.75rem",
    margin: 0,
    marginTop: "-0.55rem",
  },
  flexBoxBadges: {
    display: "flex",
    flexDirection: "row",
  },
  contact: {
    marginTop: "-1.5rem",
  },
  link: {
    color: "#4e4f52",
    fontWeight: 400,
    [theme.breakpoints.down("770")]: {
      padding: "0.3rem",
      marginTop: "0.2rem",
    },
  },
  hr: {
    color: "white",
    width: "50.5rem",
    marginTop: "1.5rem",
    backgroundColor: "white",
    height: "0.15rem",
    borderTop: "1px solid white",
    borderLeft: "1px solid white",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("1164")]: {
      width: "40rem",
    },
    [theme.breakpoints.down("770")]: {
      width: "75%",
      marginTop: "-10rem",
    },
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("675")]: {
      flexDirection: "column",
      justifyContent: "left",
      alignItems: "left",
    },
  },
  socialContainer: {
    display: "flex",
    marginLeft: "0.2rem",
    marginTop: "-0.5rem",
    gap: "1rem",
    [theme.breakpoints.down("770")]: {
      order: -1,
      marginTop: "0.2rem",
      marginLeft: "1rem",
    },
  },
  footerContainer: {
    maxWidth: "56rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("1164")]: {
      maxWidth: "auto",
    },
  },
  social: {},
  rights: {
    fontWeight: "bold",
    marginLeft: "2rem",
    [theme.breakpoints.down("1164")]: {
      marginRight: "2rem",
    },
    [theme.breakpoints.down("675")]: {
      marginRight: 0,
    },
  },
  madeWithHeart: {
    fontWeight: "bold",
    marginRight: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("1164")]: {
      marginLeft: "2rem",
    },
    [theme.breakpoints.down("675")]: {
      marginLeft: "0.3rem",
    },
  },
  heartIcon: {
    fontSize: "1.1rem",
    marginLeft: "0.3rem",
    marginRight: "0.3rem",
  },
  quickLinks: {},
  termsLinks: {},
  downloadNowContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    gridColumnStart: 1,
    gridRowStart: 2,
  },
  companyInfoContainer: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
  },
  email: {
    marginTop: "-1rem",
    marginRight: "0.2rem",
    color: "#4e4f52",
  },
  phone: {
    marginTop: "-1rem",
    marginRight: "0.5rem",
    color: "#4e4f52",
  },
}));
export default function footer() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <div className={classes.companyInfoContainer}>
          <img src="/logo.png" className={classes.logo} />
          <div className={classes.companyDescription}>
            <span className={classes.companyName}>myHomely </span>
            is not offering any home for sale and not representing any user. All
            the properties are listed directly by users and information about
            the properties are not guaranteed to be accurate. Visit{" "}
            <Link href="/termsofuse">
              <span className={classes.terms}>Terms of Use</span>
            </Link>{" "}
            for more details.
          </div>
          <div className={classes.loginContainer}>
            <Button
              onClick={() => {
                router.push("/photographerlogin");
              }}
              className={classes.button}
            >
              Photographer Login
            </Button>
          </div>
        </div>

        <div className={classes.termsLinks}>
          <div className={classes.linksContainer}>
            <div className={classes.linkTitle}>Terms & Policy</div>
            <div className={classes.link}>
              <Link href="/termsofuse">Terms of Use</Link>
            </div>
            <div className={classes.link}>
              <Link href="/privacypolicy">Privacy Policy</Link>
            </div>
            <div className={classes.link}>
              <Link href="/copyRight">Copyright Policy</Link>
            </div>
            <div className={classes.link}>
              <Link href="/covid19notice">Covid 19 Notice</Link>
            </div>
          </div>
        </div>
        <div className={classes.downloadNowContainer}>
          <div className={classes.smallLink}>
            <Box display="flex" justifyContent="between">
              <Box mr={5}>
                <div className={classes.linkTitle}>Social Media</div>
                <div className={classes.socialContainer}>
                  <img
                    src="/facebook.svg"
                    alt="facebook"
                    className={classes.social}
                  />
                  <img
                    src="/twitter.svg"
                    alt="twitter"
                    className={classes.social}
                  />
                  <img
                    src="/instagram.svg"
                    alt="instagram"
                    className={classes.social}
                  />
                </div>
              </Box>

              <Box ml={5}>
                <div className={classes.linkTitle}>Contact Us</div>
                <div className={classes.email}>hi@myhomely.io</div>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-start">
              <div className={classes.linkTitle}>Terms & Policy</div>
              <div className={classes.link}>
                <Link href="/termsofuse">Terms of Use</Link>
              </div>
              <div className={classes.link}>
                <Link href="/privacypolicy">Privacy Policy</Link>
              </div>
              <div className={classes.link}>
                <Link href="/copyrightpolicy">Copyright Policy</Link>
              </div>
              <div className={classes.link}>
                <Link href="/covid19notice">Covid 19 Notice</Link>
              </div>
            </Box>
          </div>

          <div className={classes.linksContainer}>
            <div className={classes.linkTitle}>Social Media</div>
            <div className={classes.socialContainer}>
              <a href="https://m.facebook.com/MyHomelyio-107368471487540/">
                <img
                  src="/facebook.svg"
                  alt="facebook"
                  className={classes.social}
                />
              </a>
              <a href="https://twitter.com/myhomely_io">
                <img
                  src="/twitter.svg"
                  alt="twitter"
                  className={classes.social}
                />
              </a>
              <a href="https://www.instagram.com/myhomely.io">
                <img
                  src="/instagram.svg"
                  alt="instagram"
                  className={classes.social}
                />
              </a>
            </div>

            <div className={classes.linkTitle}>Contact Us</div>
            <div className={classes.email}>hi@myhomely.io</div>
            <div className={classes.phone}>+1 888-900-7080</div>
          </div>
        </div>
      </div>
      <hr className={classes.hr} />
      <div className={classes.footerContainer}>
        <div className={classes.footer}>
          <div className={classes.rights}>
            &copy; {new Date().getFullYear()} A3 Digital Corp. All Rights
            Reserved.
          </div>
          <div className={classes.madeWithHeart}>
            Made with <FavoriteIcon className={classes.heartIcon} /> in Canada
          </div>
        </div>
      </div>

      <img src="/footer.svg" alt="footer" className={classes.image} />
    </div>
  );
}
