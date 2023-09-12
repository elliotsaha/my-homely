import React from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import VerticalTabs from "../../components/user/account/verticalTabs";

import QueryBuilderRoundedIcon from "@material-ui/icons/QueryBuilderRounded";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import Home from "../../components/user/account/tabs/home";
import Profile from "../../components/user/account/tabs/profile";
import Account from "../../components/user/account/tabs/account";
import Favourites from "../../components/user/account/tabs/favourites";
import Listings from "../../components/user/account/tabs/listings";
import SysAdmin from "../../components/user/account/tabs/sysadmin";
import Admin from "../../components/user/account/tabs/admin";
import EContract from "../../components/user/account/tabs/econtract";
import Loading from "../../components/loading";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Photography from "../../components/user/account/tabs/photography";
import Lawyer from "../../components/user/account/tabs/lawyer";
import ContactMailIcon from "@material-ui/icons/ContactMail";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      marginTop: "10rem",
    },
    inner: {
      display: "flex",
    },
    tabContainer: {},
    main: {
      width: "100%",
    },
  })
);

export default function account() {
  const authLocalState = useRecoilValue(authState);
  const router = useRouter();

  if (authLocalState !== null && authLocalState.auth === false) {
    router.push("/login");
  }

  // Get Index Position from tabs
  const [tabIndex, setTabIndex] = React.useState(0);

  const getIndex = (index) => {
    setTabIndex(index);
  };

  // Tabs
  let tabs = [
    {
      icon: <HomeRoundedIcon />,
      title: "Home",
    },
    {
      icon: <FaceRoundedIcon />,
      title: "Profile",
    },
    {
      icon: <GradeRoundedIcon />,
      title: "Favourites",
    },
    {
      icon: <ApartmentRoundedIcon />,
      title: "Listings",
    },
    {
      icon: <ContactMailIcon />,
      title: "Documents",
    },
  ];

  let tabRender = [
    {
      page: <Home getIndex={getIndex} />,
    },
    {
      page: <Profile />,
    },
    {
      page: <Favourites />,
    },
    {
      page: <Listings />,
    },
    {
      page: <EContract />,
    },
  ];

  if (authLocalState?.user?.role === "sysadmin") {
    tabs = [
      ...tabs,
      {
        icon: <SupervisorAccountIcon />,
        title: "SysAdmin",
      },
    ];
    tabRender = [
      ...tabRender,
      {
        page: <SysAdmin />,
      },
    ];
  }

  if (authLocalState?.user?.role === "admin") {
    tabs = [
      ...tabs,
      {
        icon: <SupervisorAccountIcon />,
        title: "Admin",
      },
    ];
    tabRender = [
      ...tabRender,
      {
        page: <Admin />,
      },
    ];
  }

  if (authLocalState?.user?.role === "photography") {
    tabs = [
      ...tabs,
      {
        icon: <SupervisorAccountIcon />,
        title: "Photography",
      },
    ];
    tabRender = [
      ...tabRender,
      {
        page: <Photography />,
      },
    ];
  }

  if (authLocalState?.user?.role === "lawyer") {
    tabs = [
      ...tabs,
      {
        icon: <SupervisorAccountIcon />,
        title: "Lawyer",
      },
    ];
    tabRender = [
      ...tabRender,
      {
        page: <Lawyer />,
      },
    ];
  }

  const classes = useStyles();

  if (!authLocalState || authLocalState?.auth === null) {
    return <Loading />;
  }

  const returnTab = (index) => {
    return tabRender[index].page;
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.tabContainer}>
            <VerticalTabs tabs={tabs} getIndex={getIndex} tabIndex={tabIndex} />
          </div>
          <div className={classes.main}>{returnTab(tabIndex)}</div>
        </div>
      </div>
    </Layout>
  );
}
