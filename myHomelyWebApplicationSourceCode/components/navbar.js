import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "./states.js";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import { useTheme } from "@material-ui/core/styles";
import BookRoundedIcon from "@material-ui/icons/BookRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import GavelRoundedIcon from "@material-ui/icons/GavelRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import WorkIcon from "@material-ui/icons/Work";

import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import ApartmentIcon from "@material-ui/icons/Apartment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Popover from "@material-ui/core/Popover";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import HouseRoundedIcon from "@material-ui/icons/HouseRounded";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    position: "fixed",
    backgroundColor: "transparent",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    transition: "all 0.1s ease",
    [theme.breakpoints.down("1050")]: {
      display: "none",
    },
  },
  appBarSolidNav: {
    width: "100%",
    position: "fixed",
    backgroundColor: "white",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    transition: "all 0.1s ease",
    [theme.breakpoints.down("1050")]: {
      display: "none",
    },
  },
  appBarScroll: {
    width: "100%",
    position: "fixed",
    backgroundColor: "white",
    fontFamily: "Gilroy, sans-serif",
    transition: "all 0.1s ease",
    [theme.breakpoints.down("1050")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: "auto",
    marginLeft: "1rem",
  },
  appBarMobile: {
    display: "none",
    [theme.breakpoints.down("1050")]: {
      transition: "all 0.1s ease",
      display: "flex",
      backgroundColor: "transparent",
      flexDirection: "row",
    },
  },
  appBarMobileSolidNav: {
    display: "none",
    [theme.breakpoints.down("1050")]: {
      transition: "all 0.1s ease",
      display: "flex",
      backgroundColor: "white",
      flexDirection: "row",
    },
  },

  appBarMobileScroll: {
    display: "none",
    [theme.breakpoints.down("1050")]: {
      transition: "all 0.1s ease",
      display: "flex",
      backgroundColor: "white",
      flexDirection: "row",
    },
  },

  appBarMobileInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "& div": {
      marginLeft: "1rem",
      "& img": {
        width: "10rem",
      },
    },
  },

  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "5rem",
    paddingLeft: "9rem",
    [theme.breakpoints.down("1300")]: {
      paddingRight: "2rem",
      paddingLeft: "2rem",
    },
  },
  image: {
    width: "15rem",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginRight: "1.3rem",
    marginLeft: "1.3rem",
    fontSize: "1.1rem",
    color: "#050202",
    fontWeight: 500,
    cursor: "pointer",
    [theme.breakpoints.down("1135")]: {
      marginRight: "1rem",
      marginLeft: "1rem",
      fontSize: "1rem",
    },
  },
  dropdownLink: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    marginRight: "1.3rem",
    marginLeft: "1.1rem",
    fontSize: "1.1rem",
    color: "#050202",
    fontWeight: 500,
    zIndex: 9999,
    position: "relative",
    height: "4rem",
    [theme.breakpoints.down("1135")]: {
      marginRight: "1rem",
      marginLeft: "1rem",
      fontSize: "1rem",
    },
  },
  dropdownItem: {
    fontWeight: "bold",
    display: "flex",
    gap: "1rem",
  },
  dropdownLinkIcon: {
    color: "#050202",
    fontSize: "1.2rem",
  },
  dropdownRoot: {
    width: "22.5rem",
    position: "absolute",
    top: "2.5rem",
    marginLeft: "-10rem",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
    transition: "all 0.25s ease-in-out",
    padding: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    gap: "0.5rem",
    flexDirection: "column",
    background: "white",
  },
  hr: {
    width: "16.5rem",
    background: "#d3d3d3",
    height: "0.15rem",
    marginTop: "0.15rem",
    marginBottom: "0.15rem",
  },
  moveDownDropdown: {
    position: "absolute",
    marginTop: "-2rem",
    zIndex: 9999,
    width: "9rem",
    left: "-5rem",
  },
  linkTag: {
    color: "inherit",
    textDecoration: "none",
    "& > span": {
      fontWeight: 900,
    },
  },
  signUp: {
    background: "#E8219C",
    "&:hover": {
      background: "#E8219C",
    },
    padding: "0.75rem",
    paddingRight: "0.9rem",
    paddingLeft: "0.9rem",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
    width: "6rem",
  },
  login: {
    "&:hover": {
      background: "#249FFB",
    },
    background: "#249FFB",
    padding: "0.75rem",
    paddingRight: "0.9rem",
    paddingLeft: "0.9rem",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
    width: "6rem",
  },
  buttonContainer: {
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
  },
  links: {
    marginRight: "0.75rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  drawer: {
    flexShrink: 0,
    width: "240px",
  },
  drawerPaper: {
    backgroundColor: "#E3F3FF",
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
    color: "#08184A",
  },
  sideBarImage: {
    marginRight: "1rem",
    marginBottom: "1rem",
    marginLeft: "0.5rem",
  },
  sideBarImageInner: {
    width: "13rem",
  },
  svgIcon: {
    color: "#08184A",
  },
  sideBarText: {
    color: "#08184A",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    fontSize: "0.95rem",
  },
  divider: {
    backgroundColor: "#D6EBFA",
  },
  accountButton: {
    marginLeft: "-0.75rem",
  },
  accountIcon: {
    color: "#08184A",
    width: "2.5rem",
    height: "2.5rem",
  },
  rootLink: {
    fontWeight: 600,
  },
  logoLink: {
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  },
  popoverButton: {
    fontFamily: "Gilroy, sans-serif",
    width: "100%",
    textAlign: "left",
    justifyContent: "flex-start",
    textTransform: "none",
    fontWeight: "bold",
  },
  popoverInner: {
    padding: "0.7rem",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  displayNone: {
    display: "none",
  },
}));

export default function navbar({ solidNav }) {
  // Check Authentication State
  const authLocalState = useRecoilValue(authState);
  const classes = useStyles();
  const [scrollClass, setScrollClass] = useState(classes.appBar);
  const [scrollMobileClass, setScrollMobileClass] = useState(
    classes.appBarMobile
  );
  const [shadow, setShadow] = useState(0);

  // Auth Popover
  const [authPopover, setAuthPopover] = useState(null);

  // Dropdown
  const [dropdown, setDropdown] = useState(false);

  // Mobile Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const itemsList = [
    {
      text: "Home",
      icon: <HomeRoundedIcon className={classes.svgIcon} />,
      link: "/",
      onClick: () => {
        handleDrawerToggle();
      },
    },
    {
      text: "Buy Property",
      icon: <ShoppingCartIcon className={classes.svgIcon} />,
      link: "/buyproperty",
      onClick: () => {
        handleDrawerToggle();
      },
    },
    {
      text: "Sell Property",
      link: "/sellproperty",
      icon: <WorkIcon className={classes.svgIcon} />,
      onClick: () => {
        handleDrawerToggle();
      },
    },
  ];

  const accountButton = [
    {
      text: "Account",
      link: "/user/account",
      icon: <AccountCircleIcon className={classes.svgIcon} />,
      onClick: () => {
        handleDrawerToggle();
      },
    },
  ];

  //Drawer
  const drawer = (
    <div>
      <List>
        <div className={classes.sideBarImage}>
          <img
            className={classes.sideBarImageInner}
            src="/logo.png"
            alt="logo"
          />
        </div>
        <Divider className={classes.divider} />
        {accountButton.map((item, index) => {
          const { text, icon, link, onClick } = item;
          return (
            <Link href={link} key={index}>
              <ListItem
                button
                key={text}
                onClick={onClick}
                className={classes.sideBarText}
              >
                {icon && (
                  <ListItemIcon className={classes.sideBarInactive}>
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  disableTypography
                  primary={text}
                  className={classes.sideBarText}
                />
              </ListItem>
            </Link>
          );
        })}

        <Divider className={classes.divider} />
        {itemsList.map((item, index) => {
          const { text, icon, link, onClick } = item;
          return (
            <Link href={link} key={index}>
              <ListItem
                button
                key={text}
                onClick={onClick}
                className={classes.sideBarText}
              >
                {icon && (
                  <ListItemIcon className={classes.sideBarInactive}>
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  disableTypography
                  primary={text}
                  className={classes.sideBarText}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  useEffect(() => {
    if (solidNav) {
      setScrollClass(classes.appBarSolidNav);
      setScrollMobileClass(classes.appBarMobileSolidNav);
    } else {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
          setScrollClass(classes.appBarScroll);
          setScrollMobileClass(classes.appBarMobileScroll);
          setShadow(2);
        } else {
          setScrollClass(classes.appBar);
          setScrollMobileClass(classes.appBarMobile);
          setShadow(0);
        }
      });
    }
  }, []);

  const theme = useTheme();

  const router = useRouter();

  const viewAccount = () => {
    router.push("/user/account");
  };

  const chatMessages = () => {
    router.push("/messages/list");
  };

  const onLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        router.push("/");
        router.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={scrollClass} elevation={shadow}>
        <div className={classes.root}>
          <div>
            <Link href="/" className={classes.logoLink}>
              <img src="/logo.png" alt="logo" className={classes.image} />
            </Link>
          </div>
          <div className={classes.linkContainer}>
            <div className={classes.links}>
              <div className={classes.link}>
                <Link href="/buyproperty" className={classes.linkTag}>
                  <span className={classes.rootLink}>Browse Homes</span>
                </Link>
              </div>
              <div className={classes.link}>
                <Link href="/sellproperty" className={classes.linkTag}>
                  <span className={classes.rootLink}>Sell Property</span>
                </Link>
              </div>

              <div className={classes.link}>
                <Link href="/homeestimate" className={classes.linkTag}>
                  <span className={classes.rootLink}>Home Estimate</span>
                </Link>
              </div>

              {/*
<div
                className={classes.dropdownLink}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <div className={classes.rootLink}>Calculators</div>
                <ExpandMoreIcon className={classes.dropdownLinkIcon} />
                {dropdown && (
                  <div className={classes.moveDownDropdown}>
                    <div className={classes.dropdownRoot}>
                      <div className={classes.dropdownItem}>
                        <div>
                          <HouseRoundedIcon />
                        </div>
                        <Link href="/mortgageCalculator">
                          Mortgage Calculator
                        </Link>
                      </div>
                      <div className={classes.dropdownItem}>
                        <div>
                          <AccountBalanceRoundedIcon />
                        </div>
                        <Link href="/homeestimate">
                          Property Value Estimate
                        </Link>
                      </div>

                      <div className={classes.dropdownItem}>
                        <div>
                          <AttachMoneyRoundedIcon />
                        </div>
                        <Link href="/lttCalculator">
                          Land Transport Tax Calculator
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              */}
            </div>

            {authLocalState === null ? null : authLocalState.auth === true ? (
              <div className={classes.accountButton}>
                <IconButton
                  onClick={(e) => {
                    setAuthPopover(e.currentTarget);
                  }}
                  className={classes.accountIcon}
                >
                  <img
                    src={authLocalState?.user?.icon}
                    className={classes.accountIcon}
                  />
                </IconButton>
                <Popover
                  open={Boolean(authPopover)}
                  onClose={() => setAuthPopover(null)}
                  anchorEl={authPopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  disableScrollLock
                >
                  <div className={classes.popoverInner}>
                    <Button
                      onClick={viewAccount}
                      className={classes.popoverButton}
                    >
                      View Account
                    </Button>
                    <Button
                      onClick={chatMessages}
                      className={classes.popoverButton}
                    >
                      Chat Messages
                    </Button>
                    <Button
                      onClick={onLogout}
                      className={classes.popoverButton}
                    >
                      Logout
                    </Button>
                  </div>
                </Popover>
              </div>
            ) : (
              <>
                <div className={classes.buttonContainer}>
                  <Link href="/login" className={classes.linkTag}>
                    <Button className={classes.login}>Login</Button>
                  </Link>
                </div>
                <div className={classes.buttonContainer}>
                  <Link href="/signup" className={classes.linkTag}>
                    <Button className={classes.signUp}>Sign Up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </AppBar>

      <AppBar position="fixed" className={scrollMobileClass} elevation={shadow}>
        <div className={classes.appBarMobileInner}>
          <IconButton
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.shortLogoContainerAppbar}>
            <img
              className={classes.shortLogoContainerAppbarInner}
              src="/logo.png"
              alt="logo"
            />
          </div>
        </div>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden lgUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon className={classes.sideBarInactive} />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}
