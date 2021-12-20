import React, { useState, useCallback, useEffect, useRef } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import formatCash from "../../components/FormatCash";
import mapStyles from "../../components/mapStyles";
import { useRouter } from "next/router";
import SearchBar from "../../components/home/mapSearchBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    searchContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      marginTop: "2.5rem",
    },
    googleMapsContainer: {
      width: "100%",
      height: "50rem",
    },

    overlayMarker: {
      background: "white",
      borderRadius: "0.3rem",
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
      paddingRight: "0.5rem",
      paddingLeft: "0.5rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      transition: "all 0.25s ease-in-out",
      overflow: "hidden",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        transition: "all 0.25s ease-in-out",
        background: "black",
        color: "white",
      },
    },
    disabledHover: {
      "&:hover": {
        background: "transparent",
      },
      background: "transparent",
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
  })
);
export default function googlemap() {
  const classes = useStyles();

  const router = useRouter();
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyles = {
    width: "100%",
    height: "100%",
  };

  // Google maps options
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    gestureHandling: "cooperative",
  };

  const [rawBuyerInput, setRawBuyerInput] = useState("");
  const [buyerData, setBuyerData] = useState([]);

  const [centerFirst, setCenterFirst] = useState({
    lat: 50,
    lng: -85,
  });
  console.log(buyerData);
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

  const [zoom, setZoom] = useState(8);
  useEffect(() => {
    if (zoom < 6) {
      setOpenModal(null);
    }
  }, [zoom]);
  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <SearchBar
          setBuyerData={setBuyerData}
          setRawBuyerInput={setRawBuyerInput}
          rawBuyerInput={rawBuyerInput}
          buyerData={buyerData}
          setCenterFirst={setCenterFirst}
          setOpenModal={setOpenModal}
        />
      </div>
      <div className={classes.googleMapsContainer}>
        <GoogleMap
          mapContainerStyle={mapContainerStyles}
          zoom={8}
          onZoomChanged={() => setZoom(mapRef?.current?.getZoom())}
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
                </div>
              </OverlayView>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}
