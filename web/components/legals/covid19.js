import React, { useState, useEffect, useRef } from "react";
import { Dialog, Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      borderRadius: "0.5rem",
      height: "38.5rem",
      position: "relative",
    },
    root: {
      fontFamily: "Gilroy, sans-serif",
      padding: "3rem",
      overflowY: "scroll",
      maxHeight: "50rem",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    absoluteContainer: {
      position: "sticky",
      width: "100%",
      background: "#F3F3F3",
      padding: "1.25rem",
      bottom: 0,
      display: "flex",
      justifyContent: "flex-end",
    },
    acceptButton: {
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      color: "#249FFB",
      border: "0.125rem solid #249FFB",
    },
  })
);

export default function TOS({ open, setOpen, callback }) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(true);

  const [referenceNode, setReferenceNode] = useState();

  useEffect(() => {
    if (referenceNode) {
      return () => referenceNode.removeEventListener("scroll", handleScroll);
    }
  }, [referenceNode]);

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      setDisabled(false);
    }
  }

  const paneDidMount = (node) => {
    if (node) {
      node.addEventListener("scroll", handleScroll);
      setReferenceNode(node);
    }
  };

  return (
    <Dialog
      onClose={() => setOpen(false)}
      classes={{ paper: classes.dialog }}
      open={open}
    >
      <div className={classes.root} ref={paneDidMount}>
        <div className={classes.header}>myHomely COVID-19 Notice to Users</div>
        <div id="agreement">
          <div className={classes.inner}>
            <p>
              In this unprecedented time of the Coronavirus COVID-19 Pandemic,
              it’s important for users of MyHomely to be aware of the potential
              health risks relating to showing homes, open houses, in-person
              inspections, final walkthroughs, and any other necessary
              interaction while you buy, sell, or search for homes. It is
              important that our users understand that according to the Public
              Health Agency of Canada (PHAC), World Health Organization, and
              other health organizations, there are actions that can be taken to
              help slow the spread and limit the risk of exposure to COVID-19.
              Here is a link to the PHAC with specific information regarding
              protective measures you can take in order to protect yourself and
              others, and slow the spread of COVID-19:{" "}
              <a
                href="https://www.canada.ca/en/public-health.html"
                className={classes.link}
              >
                https://www.canada.ca/en/public-health.html
              </a>
              . MyHomely encourages all of its users to keep informed by
              regularly visiting the PHAC’s website and encourages all users to
              ensure compliance with any local, state, federal, or other
              governmental orders pursuant to coronavirus related restrictions.
            </p>
            <p>
              MyHomely recommends you follow all safety protocol as outlined by
              the PHAC, and your own physician’s advice as to seeking medical
              care. Other practical things you can do to protect yourself and
              others from COVID-19 include, but are not limited to, the
              following:
            </p>
            <ul>
              <li>
                Use Video Live Tours, 3D Virtual Tours, and photos to narrow the
                field of homes you are considering before scheduling a Live
                In-Person tour. You may schedule these through MyHomely’s
                messaging feature, the Tour Scheduler, or by using a third-party
                video chat application of your choice.
              </li>
              <li>
                Only schedule or attend In-Person tours if deemed necessary, and
                do so at your own risk.
              </li>
              <li>
                If you have symptoms of any illness, especially the ones
                outlined by the PHAC related to the COVID-19, you should avoid
                all contact with any potential buyers, sellers, vendors, or
                anyone else related to the sale or purchase of real estate using
                MyHomely’s platform and services. We also recommend if you are
                selling a home listed on MyHomely’s platform and services and
                you have any such symptoms, that you not allow any person in
                your home.
              </li>
            </ul>
            <p>
              All users agree to take the necessary precautions to protect
              yourself and others to mitigate the risk of infection, including
              the following:
            </p>
            <ol type="1">
              <li>
                Wear shoe coverings, rubber gloves, face masks, eye protection,
                and wash your hands with soap and water or use hand sanitizer.
                Do not touch your face, eyes, nose, or mouth.
              </li>
              <li>
                Practice social distancing by remaining at least 6 feet away
                from any other person present. Do not touch anything unless
                necessary and consider the risks of doing so first.
              </li>
              <li>
                Properly discard any protective equipment including masks,
                gloves, shoe coverings, or anything else used for protection
                during the visit.
              </li>
              <li>
                Follow all local, State, and Federal guidelines and Stay Home
                Orders and keep yourself up to date of any changes to such
                guidelines.
              </li>
              <li>
                Consider your own personal health risks including age and
                underlying health conditions, travel history, and prior exposure
                to Coronavirus COVID-19 before deciding to go see a property. Do
                not visit any property if you have symptoms that could be
                related to Coronavirus COVID-19.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className={classes.absoluteContainer}>
        <Button
          className={classes.acceptButton}
          disabled={disabled}
          onClick={callback}
        >
          Continue
        </Button>
      </div>
    </Dialog>
  );
}
