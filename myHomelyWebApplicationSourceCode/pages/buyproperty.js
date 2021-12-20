import React, { useState, useRef, useEffect, useCallback } from "react";
import Layout from "../components/layout";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
// Map Styles
import mapStyles from "../components/mapStyles";
import Pagination from "@material-ui/lab/Pagination";
import Link from "next/link";
import Axios from "axios";
import SearchBar from "../components/buyproperty/SearchBar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "@material-ui/core";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import formatCash from "../components/FormatCash";
import PaginationItem from "@material-ui/lab/PaginationItem";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { useRecoilValue } from "recoil";
import { authState } from "../components/states";
import SignInModal from "../components/signin";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "7rem",
    fontFamily: "Gilroy, sans-serif",
    "& .Mui-selected": {
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
      color: "white",
    },
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
    [theme.breakpoints.down("1000")]: {
      display: "block",
      width: "100%",
    },
  },
  mainHeader: {
    fontSize: "2.25rem",
    fontWeight: "bold",

    [theme.breakpoints.down("1125")]: {
      fontSize: "2rem",
      marginRight: "0.45rem",
    },
  },
  cardPanelRoot: {
    marginLeft: "3.5rem",
  },
  searchBarContainer: {
    marginTop: "1rem",
    marginBottom: "4rem",
  },
  cardRoot: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    marginBottom: "-0.2rem",
    marginRight: "1rem",
  },
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "15.5rem",
    marginBottom: "-0.5rem",
    width: "22rem",
    [theme.breakpoints.down("1630")]: {
      width: "18rem",
    },
    [theme.breakpoints.down("1330")]: {
      width: "13.5rem",
    },
  },
  cardAskingPrice: {
    fontWeight: "bold",
    fontSize: "2.4rem",
    marginTop: "2.5rem",
    [theme.breakpoints.down("1125")]: {
      fontSize: "2.15rem",
    },
    [theme.breakpoints.down("1000")]: {
      fontSize: "2.6rem",
    },
  },
  cardDetails: {
    color: "grey",
    fontSize: "1rem",
    marginTop: "0.5rem",
    [theme.breakpoints.down("1850")]: {
      fontSize: "0.9rem",
      lineHeight: "1.25rem",
    },

    [theme.breakpoints.down("1630")]: {
      fontSize: "0.9rem",
      lineHeight: "1.25rem",
      marginRight: "0.5rem",
    },

    [theme.breakpoints.down("1125")]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down("1000")]: {
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
  },
  cardAddress: {
    fontWeight: 600,
    fontSize: "1.5rem",
    maxWidth: "25rem",
    marginBottom: "0.25rem",
    lineHeight: "1.75rem",
    [theme.breakpoints.down("1850")]: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },

    [theme.breakpoints.down("1630")]: {
      fontSize: "1.45rem",
      lineHeight: "1.9rem",
    },

    [theme.breakpoints.down("1125")]: {
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
    },

    [theme.breakpoints.down("1000")]: {
      fontSize: "1.5rem",
      lineHeight: "1.7rem",
    },

    [theme.breakpoints.down("725")]: {
      fontSize: "1.3rem",
      lineHeight: "1.5rem",
    },
  },
  cardText: {},
  cardButton: {
    background: "white",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    borderRadius: "0.5rem",
    height: "100%",
    width: "51.5rem",
    fontFamily: "Gilroy, sans-serif",
    textAlign: "left",
    textTransform: "none",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    cursor: "pointer",
    marginBottom: "1.5rem",

    [theme.breakpoints.down("1850")]: {
      width: "46rem",
    },

    [theme.breakpoints.down("1630")]: {
      width: "42rem",
    },

    [theme.breakpoints.down("1330")]: {
      width: "36rem",
    },

    [theme.breakpoints.down("1125")]: {
      width: "30rem",
    },

    [theme.breakpoints.down("1000")]: {
      width: "48rem",
    },

    [theme.breakpoints.down("850")]: {
      width: "40rem",
    },

    [theme.breakpoints.down("725")]: {
      width: "35rem",
    },
  },
  googleMapContainer: {
    position: "sticky",
    width: "100%",
    height: "93.5rem",

    [theme.breakpoints.down("1630")]: {
      width: "90%",
      marginLeft: " auto",
    },
    [theme.breakpoints.down("1330")]: {
      width: "92%",
    },

    [theme.breakpoints.down("1000")]: {
      display: "none",
    },
  },
  smGoogleMapContainer: {
    position: "none",
    width: "100%",
    height: "30rem",
    [theme.breakpoints.down("1000")]: {
      display: "block",
      paddingRight: "3rem",
    },
  },
  disabledHover: {
    background: "transparent",
    "&:hover": {
      background: "transparent",
    },
  },

  overlay: {
    position: "relative",
  },
  modal: {
    width: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: "3rem",
  },
  modalImage: {
    width: "16rem",
    height: "13rem",
    objectFit: "cover",
    borderTopRightRadius: "0.5rem",
    borderTopLeftRadius: "0.5rem",
  },
  modalText: {
    marginTop: "-0.35rem",
    fontFamily: "Gilroy, sans-serif",
    width: "16rem",
    background: "white",
    borderBottomLeftRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
    padding: "0.5rem",

    boxShadow:
      " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
  },
  modalAddress: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
  modalAskingPrice: {
    fontSize: "1rem",
    color: "#38A838",
    fontWeight: "bold",
    marginTop: "0.2rem",
    marginBottom: "0.25rem",
  },
  modalBathroomsBedrooms: {
    fontSize: "0.85rem",
    display: "flex",
    gap: "0.75rem",
    paddingBottom: "0.75rem",
    "& span": {
      fontWeight: "bold",
    },
  },
  overlayMarker: {
    background: "white",
    borderRadius: "0.25rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    transition: "all 0.25s ease-in-out",
    boxShadow:
      " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      transition: "all 0.25s ease-in-out",
      background: "black",
      color: "white",
    },
  },
  overlayMarkerCircle: {
    background: "white",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    transition: "all 0.25s ease-in-out",
    borderRadius: "50%",
    width: "2.1rem",
    height: "2.1rem",
    boxShadow:
      " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      transition: "all 0.25s ease-in-out",
      background: "black",
      color: "white",
    },
  },
  paginationItem: {
    marginTop: "2rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
  },
  cardStarButton: {
    zIndex: 9999,
    position: "absolute",
    top: 0,
    right: 0,
    "& > *": {
      fontFamily: "Gilroy, sans-serif",
      color: "black",
    },
  },
  noResults: {
    fontSize: "1.25rem",
    color: "grey",
    fontWeight: "bold",
  },
}));
export default function buyproperty() {
  const classes = useStyles();
  const [rawBuyerInput, setRawBuyerInput] = useState("");
  const [buyerData, setBuyerData] = useState([]);
  const [defaultCards, setDefaultCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [paginationTotal, setPaginationTotal] = useState(1);

  const [signIn, setSignIn] = useState(false);
  const authLocalState = useRecoilValue(authState);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const [disabledFavourites, setDisabledFavourites] = useState(true);
  const [favourites, setFavourites] = useState([]);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (authLocalState?.auth === false) {
      setNeedsLogin(true);
      setNeedsVerification(false);
    }
    if (
      authLocalState?.emailVerified === false ||
      authLocalState?.phoneVerified === false
    ) {
      setNeedsVerification(true);
      setNeedsLogin(false);
    }
  }, [authLocalState]);

  useEffect(() => {
    if (buyerData.length !== 0) {
      setLoading(false);
    }
  }, [buyerData]);

  const ParentSetterRawBuyerInput = (input) => {
    setRawBuyerInput(input);
  };

  const ParentSetterBuyerData = (input) => {
    setBuyerData(input);
  };

  const ParentSetterPaginationTotal = (input) => {
    setPaginationTotal(input);
  };

  const Card = (data) => {
    let req = data.data;
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const commaNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    const onStar = (data) => {
      if (
        authLocalState.auth === false ||
        authLocalState.emailVerified === false ||
        authLocalState.phoneVerified === false
      ) {
        setSignIn(true);
        return;
      }
      if (favourites.includes(data.data._id)) {
        Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/removeFavourite`,
          {
            id: req._id,
          },
          { withCredentials: true }
        )
          .then((res) => {
            setFavourites(res.data.favourites);
          })
          .catch((err) => console.log(err));
      } else {
        Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/setFavourite`,
          {
            id: req._id,
          },
          { withCredentials: true }
        )
          .then((res) => {
            setFavourites(res.data.favourites);
          })
          .catch((err) => console.log(err));
      }
    };

    useEffect(() => {
      if (disabledFavourites && !authLocalState.auth) {
        setDisabledFavourites(false);
      }

      if (disabledFavourites && authLocalState.auth) {
        Axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/getFavourites`,
          {
            withCredentials: true,
          }
        )
          .then((res) => {
            let arr = [];
            res.data.map((i) => {
              buyerData.map((j) => {
                if (j._id === i._id) {
                  arr.push(i._id);
                }
              });
            });

            setFavourites(arr);
            setDisabledFavourites(false);
          })
          .catch((err) => console.log(err));
      }
    }, [data, buyerData]);

    return (
      <div
        className={classes.cardButton}
        onClick={() => {
          router.push({
            pathname: "/viewproperty",
            query: { id: req._id },
          });
        }}
      >
        <div className={classes.cardStarButton}>
          <IconButton
            disabled={disabledFavourites}
            onClick={(e) => {
              e.stopPropagation();
              onStar(data);
            }}
          >
            {favourites.includes(data.data._id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
        <div className={classes.cardRoot}>
          <div>
            <img
              src={req?.query?.HouseImages?.[0]}
              alt="building"
              className={classes.cardImage}
            />
          </div>
          <div className={classes.cardText}>
            <div className={classes.cardAskingPrice}>
              {formatter.format(req?.query?.AskingPrice)}
            </div>
            <div className={classes.cardAddress}>
              {req?.query?.StreetAddress}
            </div>
            <div className={classes.cardDetails}>
              {req?.query?.Bedrooms} Bedrooms &bull; {req?.query?.Bathrooms}{" "}
              Bathrooms &bull;{" "}
              {commaNumber(
                req?.query?.HouseSize.length * req?.query?.HouseSize.width
              )}{" "}
              {req?.query?.HouseSize?.unit === "Square Meter" ? "sqm" : "sft"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Google Maps

  const [zoom, setZoom] = useState(15);
  const [libraries] = useState(["places", "geometry", "directions"]);

  // Load Google Maps Script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) {
    console.log(loadError);
  }

  // center of Ontario
  const googleMapsCenter = {
    lat: 50.0,
    lng: -85.0,
  };
  // Google maps options
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    gestureHandling: "greedy",
  };

  const mapContainerStyles = {
    borderRadius: "0.75rem",
    width: "100%",
    height: "100%",
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [centerFirst, setCenterFirst] = useState({
    lat: 50,
    lng: -85,
  });

  useEffect(() => {
    if (buyerData.length !== 0) {
      setCenterFirst({
        lat: parseFloat(buyerData?.[0]?.location?.lat),
        lng: parseFloat(buyerData?.[0]?.location?.lng),
      });
    } else {
      setCenterFirst({
        lat: 50,
        lng: -85,
      });
    }
  }, [buyerData]);

  const [openModal, setOpenModal] = useState(null);

  const [zoomIn, setZoomIn] = useState(15);
  const [smallOverlay, setSmallOverlay] = useState(false);

  useEffect(() => {
    if (zoomIn < 10) {
      setOpenModal(null);
      setSmallOverlay(true);
    }
    if (zoomIn >= 10) {
      setSmallOverlay(false);
    }
  }, [zoomIn]);

  useEffect(() => {
    if (activePage !== 1) {
      setActivePage(1);
    }
  }, [rawBuyerInput]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={classes.root}>
        <SignInModal
          open={signIn}
          handleClose={() => setSignIn(false)}
          NeedsVerification={needsVerification}
        />
        <div className={classes.inner}>
          <div className={classes.cardPanelRoot}>
            <div className={classes.mainHeader}>
              Find Your Favourite Home Today
            </div>
            <div className={classes.searchBarContainer}>
              <SearchBar
                setBuyerData={ParentSetterBuyerData}
                setRawBuyerInput={setRawBuyerInput}
                rawBuyerInput={rawBuyerInput}
                setPaginationTotal={ParentSetterPaginationTotal}
                activePage={activePage}
                buyerData={buyerData}
                setCenterFirst={setCenterFirst}
                setOpenModal={setOpenModal}
                query={query}
              />
            </div>

            <div className={classes.cardGrid}>
              {buyerData.map((i, index) => {
                return <Card data={i} key={index} />;
              })}
              {buyerData.length === 0 && !loading && (
                <div className={classes.noResults}>
                  No Results. Try broadening your search query.
                </div>
              )}
            </div>
            <div>
              {buyerData.length !== 0 && (
                <Pagination
                  page={activePage}
                  count={Math.ceil(paginationTotal / 5)}
                  size={"large"}
                  renderItem={(item) => (
                    <PaginationItem
                      className={classes.paginationItem}
                      {...item}
                      onClick={() => {
                        setActivePage(item.page);
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                      }}
                    ></PaginationItem>
                  )}
                />
              )}
            </div>
          </div>
          <div className={classes.googleMapContainer}>
            <GoogleMap
              mapContainerStyle={mapContainerStyles}
              zoom={zoom}
              onZoomChanged={() => setZoomIn(mapRef?.current?.getZoom())}
              center={centerFirst}
              options={options}
              onLoad={onMapLoad}
            >
              {buyerData.map((i) => {
                return (
                  <OverlayView
                    position={{
                      lat: parseFloat(i.location.lat),
                      lng: parseFloat(i.location.lng),
                    }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div className={classes.overlay}>
                      <div
                        className={classes.modal}
                        onClick={() => {
                          router.push(
                            `${process.env.NEXT_PUBLIC_CLIENT_URL}/viewproperty?id=${i._id}`
                          );
                        }}
                      >
                        {openModal === i._id ? (
                          <div>
                            <img
                              src={i.query.HouseImages[0]}
                              alt="house"
                              className={classes.modalImage}
                            />
                            <div className={classes.modalText}>
                              <div className={classes.modalAddress}>
                                {i.query.StreetAddress}
                              </div>
                              <div className={classes.modalAskingPrice}>
                                $
                                {new Intl.NumberFormat("en-US").format(
                                  i.query.AskingPrice
                                )}
                              </div>
                              <div className={classes.modalBathroomsBedrooms}>
                                <div>
                                  Bedrooms: <span>{i.query.Bedrooms}</span>
                                </div>

                                <div>
                                  Bathrooms: <span>{i.query.Bathrooms}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      {smallOverlay ? (
                        <IconButton
                          disableRipple
                          className={classes.overlayMarkerCircle}
                          onClick={() => {
                            if (openModal === i._id) {
                              setOpenModal(null);
                            } else {
                              setOpenModal(i._id);
                            }
                          }}
                        >
                          <HomeRoundedIcon />
                        </IconButton>
                      ) : (
                        <Button
                          disableRipple
                          className={classes.disabledHover}
                          onClick={() => {
                            if (openModal === i._id) {
                              setOpenModal(null);
                            } else {
                              setOpenModal(i._id);
                            }
                          }}
                        >
                          <div className={classes.overlayMarker}>
                            {formatCash(i.query.AskingPrice)}
                          </div>
                        </Button>
                      )}
                    </div>
                  </OverlayView>
                );
              })}
            </GoogleMap>
          </div>
        </div>
      </div>
    </Layout>
  );
}
