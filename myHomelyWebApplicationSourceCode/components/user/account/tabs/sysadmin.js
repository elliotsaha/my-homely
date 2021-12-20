import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../components/states";
import { useRouter } from "next/router";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { TextField as formikTextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import NoExpandCard from "../../../../components/buyproperty/itemCardNoExpand";

export default function SysAdmin() {
  const classes = useStyles();
  const authLocalState = useRecoilValue(authState);

  // Back to login if not sysadmin
  const router = useRouter();
  if (authLocalState.user.role !== "sysadmin") {
    router.push("/login");
  }

  // MUI Tabs
  const [tabVal, setTabVal] = useState(0);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={classes.tabPanel}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // Getting All Administrators
  const [adminCounter, setAdminCounter] = useState(0);
  const [allAdmin, setAllAdmin] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/business/getAllAdmin`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllAdmin(res.data);
      })
      .catch((err) => console.log(err));
  }, [adminCounter]);

  // Get All Users
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/getAllUsers`,
        {
          query: "",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminCounter]);

  // Get All Photographers
  const [allPhotographers, setAllPhotographers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/getAllPhotographyers`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAllPhotographers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminCounter]);
  // Get All Lawyers
  const [allLawyers, setAllLawyers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/business/getAllLawyers`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllLawyers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminCounter]);

  // EContracts
  const [eContracts, setEContracts] = useState([]);
  const [propertyEContracts, setPropertyEContracts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getAllEcontracts`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setEContracts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < eContracts.length; i++) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/getFormByID`,
          { id: eContracts[i].propertyId },
          { withCredentials: true }
        )
        .then((res) => {
          arr.push({
            property: res.data,
            url: eContracts[i].url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setPropertyEContracts(arr);
  }, [eContracts]);

  const [counterRefresh, setCounterRefresh] = useState([]);
  const [listings, setListings] = useState([]);

  const [allListings, setAllListings] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewAllListings`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setAllListings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewUnapprovedListings`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, [counterRefresh]);

  // User Dialog
  const [userDialog, setUserDialog] = useState(null);

  const onAccept = (i) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/approveListing`,
        { id: i._id },
        { withCredentials: true }
      )
      .then((res) => {
        let repli = [...counterRefresh];
        repli.push(1);
        setCounterRefresh(repli);
      })
      .catch((err) => console.log(err));
  };

  const onDecline = (i) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/disapproveListing`,
        { id: i._id },
        { withCredentials: true }
      )
      .then((res) => {
        let repli = [...counterRefresh];
        repli.push(1);
        setCounterRefresh(repli);
      })
      .catch((err) => console.log(err.response));
  };

  const [unapprovedIDUsers, setUnapprovedIDUsers] = useState([]);
  const [unapprovedIDCounter, setUnapprovedIDCounter] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getUnapprovedIDs`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("TEAWFAWD", res.data);
        setUnapprovedIDUsers(res.data);
      })
      .catch((err) => console.log("AWDAWD", err.response));
  }, [unapprovedIDCounter]);

  const approveID = (i) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/approveID`,
        { email: i.email },
        { withCredentials: true }
      )
      .then((res) => {
        let repli = [...unapprovedIDCounter, 1];
        setUnapprovedIDCounter(repli);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const declineID = (i) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/declineID`,
        { email: i.email },
        { withCredentials: true }
      )
      .then((res) => {
        let repli = [...unapprovedIDCounter, 1];
        setUnapprovedIDCounter(repli);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>Administrator Dashboard</div>
      <Tabs
        value={tabVal}
        onChange={(e, newVal) => setTabVal(newVal)}
        className={classes.muiTabs}
        classes={{
          indicator: classes.muiTabs__indicator,
        }}
      >
        <Tab label="Admin" {...a11yProps(0)} className={classes.muiTabs__tab} />
        <Tab label="Users" {...a11yProps(1)} className={classes.muiTabs__tab} />
        <Tab
          label="Approval"
          {...a11yProps(2)}
          className={classes.muiTabs__tab}
        />
        <Tab
          label="Listings"
          {...a11yProps(3)}
          className={classes.muiTabs__tab}
        />
        <Tab
          label="ID Approval"
          {...a11yProps(4)}
          className={classes.muiTabs__tab}
        />
      </Tabs>
      {/*ADMIN TAB PANEL START*/}
      <TabPanel value={tabVal} index={0}>
        <div className={classes.adminTab}>
          {[
            ["Administrators", "admin"],
            ["Photographers", "photography"],
            ["Lawyers", "lawyer"],
          ].map((i) => {
            return (
              <div>
                <div className={classes.adminTab__header}>Add {i[0]}</div>
                <div>
                  <Formik
                    enableReinitialize
                    initialValues={{ val: "" }}
                    onSubmit={(values, { resetForm }) => {
                      axios
                        .post(
                          `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/changeRole`,
                          { email: values.val, role: i[1] },
                          { withCredentials: true }
                        )
                        .then((res) => {
                          resetForm({});
                          setAdminCounter(adminCounter + 1);
                          console.log(res.data);
                        })
                        .catch((err) => console.log(err));
                    }}
                    validationSchema={Yup.object().shape({
                      val: Yup.string()
                        .required("Invalid Email")
                        .email("Invalid Email"),
                    })}
                  >
                    {({ values, setFieldValue, errors, setErrors }) => (
                      <Form>
                        <Field
                          component={formikTextField}
                          name="val"
                          label="Enter Email Address"
                          variant="outlined"
                          InputProps={{
                            className: classes.textField,
                          }}
                          InputLabelProps={{
                            className: classes.textField,
                          }}
                        />

                        <Button
                          type="submit"
                          className={classes.adminTab__button}
                        >
                          Make {i[0].slice(0, -1)}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                  <div className={classes.removeRoleContainer}>
                    <div className={classes.adminTab__header}>
                      Remove {i[0]}
                    </div>

                    <div className={classes.adminTab__allAdmin__root}>
                      <div className={classes.adminTab__allAdmin__header}>
                        <div>Icon</div>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Phone</div>
                      </div>
                    </div>

                    <div>
                      {i[1] === "admin" && (
                        <div>
                          {allAdmin.map((i) => {
                            return (
                              <div
                                className={classes.adminTab__allAdmin__inner}
                              >
                                <img
                                  src={i.icon}
                                  alt="icon"
                                  className={classes.adminTab__allAdmin__icon}
                                />
                                <div>{i.name}</div>
                                <div>{i.email}</div>
                                <div>{i.phone}</div>
                                <div
                                  className={
                                    classes.adminTab__allAdmin__iconButtonContainer
                                  }
                                >
                                  <IconButton
                                    size="small"
                                    className={
                                      classes.adminTab__allAdmin__iconButton
                                    }
                                    onClick={() => {
                                      axios
                                        .post(
                                          `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/removeAdmin`,
                                          { email: i.email },
                                          { withCredentials: true }
                                        )
                                        .then((res) => {
                                          setAdminCounter(adminCounter - 1);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {i[1] === "photography" && (
                        <div>
                          {allPhotographers.map((i) => {
                            return (
                              <div
                                className={classes.adminTab__allAdmin__inner}
                              >
                                <img
                                  src={i.icon}
                                  alt="icon"
                                  className={classes.adminTab__allAdmin__icon}
                                />
                                <div>{i.name}</div>
                                <div>{i.email}</div>
                                <div>{i.phone}</div>
                                <div
                                  className={
                                    classes.adminTab__allAdmin__iconButtonContainer
                                  }
                                >
                                  <IconButton
                                    size="small"
                                    className={
                                      classes.adminTab__allAdmin__iconButton
                                    }
                                    onClick={() => {
                                      axios
                                        .post(
                                          `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/removeAdmin`,
                                          { email: i.email },
                                          { withCredentials: true }
                                        )
                                        .then((res) => {
                                          setAdminCounter(adminCounter - 1);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {i[1] === "lawyer" && (
                        <div>
                          {allLawyers.map((i) => {
                            return (
                              <div
                                className={classes.adminTab__allAdmin__inner}
                              >
                                <img
                                  src={i.icon}
                                  alt="icon"
                                  className={classes.adminTab__allAdmin__icon}
                                />
                                <div>{i.name}</div>
                                <div>{i.email}</div>
                                <div>{i.phone}</div>
                                <div
                                  className={
                                    classes.adminTab__allAdmin__iconButtonContainer
                                  }
                                >
                                  <IconButton
                                    size="small"
                                    className={
                                      classes.adminTab__allAdmin__iconButton
                                    }
                                    onClick={() => {
                                      axios
                                        .post(
                                          `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/removeAdmin`,
                                          { email: i.email },
                                          { withCredentials: true }
                                        )
                                        .then((res) => {
                                          setAdminCounter(adminCounter - 1);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/*

          <div>
            <div className={classes.adminTab__header}>Add Administrators</div>
            <div>
              <Formik
                enableReinitialize
                initialValues={{ adminEmail: "" }}
                onSubmit={(values, { resetForm }) => {
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/changeRole`,
                      { email: values.adminEmail },
                      { withCredentials: true }
                    )
                    .then((res) => {
                      resetForm({});
                      setAdminCounter(adminCounter + 1);
                    })
                    .catch((err) => console.log(err));
                }}
                validationSchema={Yup.object().shape({
                  adminEmail: Yup.string()
                    .required("Invalid Email")
                    .email("Invalid Email"),
                })}
              >
                {({ values, setFieldValue, errors, setErrors }) => (
                  <Form>
                    <Field
                      component={formikTextField}
                      name="adminEmail"
                      label="Enter Email Address"
                      variant="outlined"
                      InputProps={{
                        className: classes.textField,
                      }}
                      InputLabelProps={{
                        className: classes.textField,
                      }}
                    />

                    <Button type="submit" className={classes.adminTab__button}>
                      Make Admin
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div>
            <div className={classes.adminTab__header}>
              Remove Administrators
            </div>
            <div className={classes.adminTab__allAdmin__root}>
              <div className={classes.adminTab__allAdmin__header}>
                <div>Icon</div>
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
              </div>
              {allAdmin.map((i) => {
                return (
                  <div>
                    <img
                      src={i.icon}
                      alt="icon"
                      className={classes.adminTab__allAdmin__icon}
                    />
                    <div>{i.name}</div>
                    <div>{i.email}</div>
                    <div>{i.phone}</div>
                    <div
                      className={
                        classes.adminTab__allAdmin__iconButtonContainer
                      }
                    >
                      <IconButton
                        size="small"
                        className={classes.adminTab__allAdmin__iconButton}
                        onClick={() => {
                          axios
                            .post(
                              `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/removeAdmin`,
                              { email: i.email },
                              { withCredentials: true }
                            )
                            .then((res) => {
                              setAdminCounter(adminCounter - 1);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={classes.adminTab}>
            <div>
              <div className={classes.adminTab__header}>Add Administrators</div>
              <div>
                <Formik
                  enableReinitialize
                  initialValues={{ adminEmail: "" }}
                  onSubmit={(values, { resetForm }) => {
                    axios
                      .post(
                        `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/addAdmin`,
                        { email: values.adminEmail },
                        { withCredentials: true }
                      )
                      .then((res) => {
                        resetForm({});
                        setAdminCounter(adminCounter + 1);
                      })
                      .catch((err) => console.log(err));
                  }}
                  validationSchema={Yup.object().shape({
                    adminEmail: Yup.string()
                      .required("Invalid Email")
                      .email("Invalid Email"),
                  })}
                >
                  {({ values, setFieldValue, errors, setErrors }) => (
                    <Form>
                      <Field
                        component={formikTextField}
                        name="adminEmail"
                        label="Enter Email Address"
                        variant="outlined"
                        InputProps={{
                          className: classes.textField,
                        }}
                        InputLabelProps={{
                          className: classes.textField,
                        }}
                      />

                      <Button
                        type="submit"
                        className={classes.adminTab__button}
                      >
                        Make Admin
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div>
              <div className={classes.adminTab__header}>
                Remove Administrators
              </div>
              <div className={classes.adminTab__allAdmin__root}>
                <div className={classes.adminTab__allAdmin__header}>
                  <div>Icon</div>
                  <div>Name</div>
                  <div>Email</div>
                  <div>Phone</div>
                </div>
                {allAdmin.map((i) => {
                  return (
                    <div>
                      <img
                        src={i.icon}
                        alt="icon"
                        className={classes.adminTab__allAdmin__icon}
                      />
                      <div>{i.name}</div>
                      <div>{i.email}</div>
                      <div>{i.phone}</div>
                      <div
                        className={
                          classes.adminTab__allAdmin__iconButtonContainer
                        }
                      >
                        <IconButton
                          size="small"
                          className={classes.adminTab__allAdmin__iconButton}
                          onClick={() => {
                            axios
                              .post(
                                `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/removeAdmin`,
                                { email: i.email },
                                { withCredentials: true }
                              )
                              .then((res) => {
                                setAdminCounter(adminCounter - 1);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          */}
        </div>
      </TabPanel>
      {/*ADMIN TAB PANEL END*/}
      {/*USERS TAB PANEL START*/}
      <TabPanel value={tabVal} index={1}>
        <div>
          <Formik
            enableReinitialize
            initialValues={{ search: "" }}
            onSubmit={(values, { resetForm }) => {
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/getAllUsers`,
                  { query: values.search },
                  { withCredentials: true }
                )
                .then((res) => {
                  setAllUsers(res.data);
                  resetForm({});
                })
                .catch((err) => console.log(err));
            }}
          >
            {({ values, errors, setErrors }) => (
              <Form>
                <Field
                  component={formikTextField}
                  name="search"
                  label="Search Email Addresses"
                  variant="outlined"
                  InputProps={{
                    className: classes.textField,
                  }}
                  InputLabelProps={{
                    className: classes.textField,
                  }}
                />

                <Button type="submit" className={classes.adminTab__button}>
                  Search
                </Button>
              </Form>
            )}
          </Formik>
          <div className={classes.userTab__profiles}>
            <div className={classes.adminTab__allAdmin__root}>
              <div className={classes.adminTab__allAdmin__header}>
                <div>Icon</div>
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
              </div>
              {allUsers.map((i) => {
                return (
                  <div>
                    <img
                      src={i.icon}
                      alt="icon"
                      className={classes.adminTab__allAdmin__icon}
                    />
                    <div>{i.name}</div>
                    <div>{i.email}</div>
                    <div>{i.phone}</div>
                    <div
                      className={
                        classes.adminTab__allAdmin__iconButtonContainer
                      }
                    >
                      <IconButton
                        size="small"
                        className={classes.userTab__iconButton}
                        onClick={() => {
                          setUserDialog(i);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TabPanel>
      {/*USERS TAB PANEL END*/}
      {/*APPROVAL TAB PANEL START*/}

      <TabPanel value={tabVal} index={2}>
        <div className={classes.approve}>
          {listings.map((i) => (
            <div className={classes.approve__card}>
              <div className={classes.approve__imageContainer}>
                <img
                  src={i?.query?.HouseImages[0]}
                  alt="house"
                  className={classes.approve__image}
                />
              </div>
              <div className={classes.cardText}>
                <div className={classes.approve__price}>
                  ${i?.query?.AskingPrice.toLocaleString("en")}
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
                      {i?.query?.HouseSize?.area
                        .toFixed(2)
                        .toLocaleString("en")}{" "}
                      sqft
                    </span>
                  </div>
                </div>
                <div className={classes.approve__StreetAddress}>
                  {i?.query?.StreetAddress}
                </div>
                <div>
                  <Button
                    className={classes.acceptButton}
                    onClick={() => onAccept(i)}
                  >
                    Accept
                  </Button>
                  <Button
                    className={classes.declineButton}
                    onClick={() => onDecline(i)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabPanel>
      {/*APPROVAL TAB PANEL END*/}
      {/*LISTINGS TAB PANEL START*/}
      <TabPanel value={tabVal} index={3}>
        <div className={classes.listingGrid}>
          {allListings.map((i) => (
            <NoExpandCard
              onClick={() => null}
              href={`/viewproperty/?query=${i._id}`}
              itemData={i}
            />
          ))}
        </div>
      </TabPanel>
      {/*LISTINGS TAB PANEL END*/}
      <TabPanel value={tabVal} index={4}>
        {unapprovedIDUsers.map((i) => {
          return (
            <div className={classes.userRoot}>
              <div className={classes.userInner}>
                <div className={classes.userDetails}>
                  <div>
                    <img
                      src={i.icon}
                      alt="icon"
                      className={classes.userImage}
                    />
                  </div>
                  <div>
                    <div className={classes.contactHeader}>CONTACT</div>
                    <div>{i.email}</div>
                    <div>{i.phone}</div>
                  </div>
                </div>
                <div>
                  <img src={i.ID} alt="ID" className={classes.id} />
                </div>
              </div>
              <div className={classes.approveDeclineContainer}>
                <Button
                  className={classes.acceptButton}
                  onClick={() => approveID(i)}
                >
                  Approve
                </Button>
                <Button
                  className={classes.declineButton}
                  onClick={() => declineID(i)}
                >
                  Decline
                </Button>
              </div>
            </div>
          );
        })}
      </TabPanel>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: "2.5rem",
    },
    header: {
      fontWeight: "bold",
      fontSize: "2rem",
      marginBottom: "0.75rem",
    },
    muiTabs: {
      marginBottom: "0.25rem",
    },
    muiTabs__tab: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    muiTabs__indicator: {
      backgroundColor: "black",
      borderRadius: "0.25rem",
    },
    tabPanel: {
      fontFamily: "Gilroy, sans-serif",
      marginLeft: "-1.5rem",
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
      },
    },
    textField: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    adminTab: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    adminTab__header: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    adminTab__button: {
      background: "black",
      "&:hover": {
        background: "black",
      },
      color: "white",
      fontWeight: 600,
      fontFamily: "Gilroy, sans-serif",
      marginLeft: "0.5rem",
      padding: "1rem",
    },
    adminTab__allAdmin__root: {
      width: "67.5rem",
      "& > div": {
        display: "grid",
        gridTemplateColumns: "6rem 10rem 17rem 9rem 5rem",
        marginBottom: "0.5rem",
      },
    },
    adminTab__allAdmin__inner: {
      width: "67.5rem",
      display: "grid",
      gridTemplateColumns: "6rem 10rem 17rem 9rem 5rem",
      marginBottom: "0.5rem",
    },
    adminTab__allAdmin__header: {
      fontWeight: "bold",
    },
    adminTab__allAdmin__icon: {
      width: "2.5rem",
      height: "2.5rem",
      objectFit: "cover",
    },
    adminTab__allAdmin__iconButtonContainer: {
      position: "relative",
    },
    adminTab__allAdmin__iconButton: {
      background: "#FF6961",
      "&:hover": {
        background: "#FF6961",
      },
      color: "white",
      position: "absolute",
      top: "-0.35rem",
    },
    adminTab__allAdmin__text: {},
    userTab__profiles: {
      marginTop: "2rem",
    },
    userTab__iconButton: {
      background: "black",
      color: "white",
      "&:hover": {
        background: "black",
      },
    },
    eContracts: {
      marginLeft: "2rem",
    },
    eContract__card: {
      position: "relative",
      borderRadius: "0.5rem",
      overflow: "hidden",
      width: "22.5rem",
      display: "flex",
      flexDirection: "column",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
    },
    eContract__card__price: {
      fontWeight: "bold",
      fontSize: "2.5rem",
    },
    eContract__card__image: {
      width: "22.5rem",
      height: "12.5rem",
      objectFit: "cover",
    },
    eContract__card__address: {
      color: "grey",
      fontWeight: 650,
    },
    eContract__card__viewDoc: {
      background: "#249FFB",
      padding: "0.9rem",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      marginTop: "2rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    eContract__card__text: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    approve: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      maxWidth: "90rem",
      marginLeft: "2rem",
    },
    approve__card: {
      display: "flex",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      background: "white",
      borderRadius: "1.25rem",
      flexDirection: "column",
      width: "25rem",
    },
    approve__imageContainer: {},
    approve__image: {
      objectFit: "cover",
      width: "25rem",
      height: "12.5rem",
      borderTopLeftRadius: "1.25rem",
      borderTopRightRadius: "1.25rem",
    },
    approve__price: {
      fontWeight: "bold",
      fontSize: "1.75rem",
    },
    approve__button: {},
    approve__Description: {},
    approve__StreetAddress: {
      color: "grey",
      fontWeight: "bold",
    },
    removeRoleContainer: {
      marginTop: "1rem",
    },
    flexIcons: {
      display: "flex",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
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
    cardText: {
      margin: "1.25rem",
    },
    acceptButton: {
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid black",
      fontWeight: "bold",
      marginRight: "0.5rem",
      marginTop: "1rem",
    },
    declineButton: {
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid black",
      fontWeight: "bold",
      marginTop: "1rem",
    },
    listingGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      position: "relative",
      gap: "1rem",
      maxWidth: "85rem",
    },
    userRoot: {
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      display: "flex",
      flexDirection: "column",
      maxWidth: "50rem",
      background: "white",
      borderRadius: "0.35rem",
      justifyContent: "center",
    },
    userDetails: {
      fontWeight: "bold",
      color: "grey",
      padding: "1rem",
    },
    userImage: {
      borderRadius: "0.5rem",
      width: "10rem",
      height: "10rem",
    },
    userInner: {
      display: "flex",
    },
    contactHeader: {
      letterSpacing: "0.25rem",
      color: "black",
    },
    id: {
      width: "24rem",
    },
    approveDeclineContainer: {
      padding: "0.5rem",
      marginTop: "-2rem",
    },
  })
);
