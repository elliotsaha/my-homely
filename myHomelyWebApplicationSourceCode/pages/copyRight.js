import React from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import { Dialog, Button, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      padding: "9rem",
      [theme.breakpoints.down("812")]: {
        padding: "1rem",
      },
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.2rem",
        marginTop: "1rem",
      },
    },
    textAlign: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.2rem",
      },
    },
    download: {
      fontSize: "1.2rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      marginLeft: "0.5rem",
      color: "grey",
      textTransform: "none",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.2rem",
        marginTop: "0.5rem",
      },
    },
    icon: {
      color: "grey",
      [theme.breakpoints.down("812")]: {
        marginTop: "0.8rem",
      },
    },

    downloadContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "2rem",
      marginBottom: "0.5rem",
    },
  })
);

export default function TermsOfService() {
  const classes = useStyles();

  const url =
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/LEGAL_INTERNAL/202104+Copyright+Policy.docx.pdf";
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.downloadContainer}>
          <div className={classes.header}>Copyright Policy</div>
          <a href={url} target="_blank">
            <Button>
              <LinkIcon className={classes.icon} />
              <div className={classes.download}>View Document</div>
            </Button>
          </a>
        </div>
        <div id="agreement">
          <div className={classes.inner}>
            <p className={classes.textAlign}>
              <b>
                <u>Notification of Copyright Infringement</u>
              </b>
            </p>
            <p>
              MyHomely.io (“myHomely”) respects the intellectual property rights
              of others and expects its users to do the same
            </p>
            <p>
              It is myHomely’s policy, in appropriate circumstances and at its
              discretion, to disable and/or terminate the accounts of users who
              repeatedly infringe the copyrights of others.
            </p>
            <p>
              In accordance with the Copyright Act (R.S.C., 1985), the text of
              which may be found on the Canada Copyright Act website at{" "}
              <a href="https://laws-lois.justice.gc.ca/eng/acts/c-42/FullText.html">
                https://laws-lois.justice.gc.ca/eng/acts/c-42/FullText.html
              </a>
              , myHomely will make reasonable efforts to expeditiously response
              the claims of copyright infringement committed using the myHomely
              website or mobile app or other online network accessible through a
              mobile device or other type of device (the “Site”) that are
              reported to myHomely’s designated Copyright Officer, identified in
              the sample notice below
            </p>
            <p>
              If you are a copyright owner, or are authorized to act on behalf
              of one, or authorized to act under any exclusive right under
              copyright, please report alleged copyright infringements taking
              place on or through the Site by completing the following CA Notice
              of Alleged Infringement and delivering it to myHomely’s designated
              Copyright Officer. Upon receipt of the Notice as described below,
              myHomely will take whatever action, in its sole discretion, it
              deems appropriate, including removal of the challenged material
              from the Sites.
            </p>
          </div>
          <p>CA Notice of Alleged Infringement (“Notice”)</p>
          <ul>
            <li>
              Identify the copyrighted work that you claim has been infringed,
              or - if multiple copyrighted works are covered by this Notice -
              you may provide a representative list of the copyrighted works
              that you claim have been infringed
            </li>
            <li>
              Identify the material that you claim is infringing (or to be the
              subject of infringing activity) and that is to be removed or
              access to which is to be disabled, and information reasonably
              sufficient to permit us to locate the material, including at a
              minimum, if applicable, the URL of the link shown on the Site(s)
              where such material may be found
            </li>
            <li>
              Provide your mailing address, telephone number, and, if available,
              email address
            </li>
          </ul>
          <p dir="ltr">
            Include both of the following statements in the body of the Notice:
          </p>

          <p dir="ltr">
            “I hereby state that I have a good faith belief that the disputed
            use of the copyrighted material is not authorized by the copyright
            owner, its agent, or the law (e.g., as a fair use).”
          </p>

          <p dir="ltr">
            “I hereby state that the information in this Notice is accurate and,
            under penalty of perjury, that I am the owner, or authorized to act
            on behalf of the owner, of the copyright or of an exclusive right
            under the copyright that is allegedly infringed.”
          </p>

          <p dir="ltr">
            Provide your full legal name and your electronic or physical
            signature.
          </p>
          <p>
            With all items completed, deliver the notice to myHomely on{" "}
            <a href="contact@myhomely.io">contact@myhomely.io</a>
          </p>
        </div>
      </div>
      {/* <div className="modal-footer">
      <button id="closeBtn" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" disabled>I Accept</button>
    </div> */}
    </Layout>
  );
}
