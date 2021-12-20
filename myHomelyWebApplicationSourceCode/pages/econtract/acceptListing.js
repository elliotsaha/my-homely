import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import Link from "next/link";
import axios from "axios";
import { Dialog } from "@material-ui/core";
import initials from "initials";

const useStyles = makeStyles((theme) => ({
  height: {
    height: "40rem",
  },
  root: {},
  paper: {
    padding: "3rem",
    maxWidth: "60rem",
    borderRadius: "0.35rem",
    fontFamily: "Gilroy, sans-serif",
  },
}));

export default function AcceptListing() {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  const [open, setOpen] = useState(true);
  const [iframe, setIframe] = useState("");
  const [form, setForm] = useState();
  const [signers, setSigners] = useState();
  const [property, setProperty] = useState();

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getFormByID`,
        {
          id: query.id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    if (form) {
      const BuyerName = axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getNameFromEmail`,
        {
          email: form.buyerEmail,
        },
        { withCredentials: true }
      );

      const SellerName = axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getNameFromEmail`,
        {
          email: form.sellerEmail,
        },
        { withCredentials: true }
      );

      axios
        .all([BuyerName, SellerName])
        .then(
          axios.spread((...res) => {
            const users = [
              {
                role: "Buyer",
                email: form.buyerEmail,
                name: res[0].data,
              },
              {
                role: "Seller",
                email: form.sellerEmail,
                name: res[1].data,
              },
            ];
            setSigners(users);
          })
        )
        .catch((err) => console.log(err));
    }
  }, [form]);

  useEffect(() => {
    if (form) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/getFormByID`,
          {
            id: form.propertyUUID,
          },
          { withCredentials: true }
        )
        .then((res) => setProperty(res.data))
        .catch((err) => console.log(err));
    }
  }, [form]);

  useEffect(() => {
    if (signers && query && property) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getLink`, {
          signers: signers,
          form: form,
          buyerInitials: initials.parse(signers[0].name),
          sellerInitials: initials.parse(signers[1].name),
          property: property,
        })
        .then((res) => {
          console.log(res.data);
          setIframe(res.data.signers[query.order].embedded_signing_url);
        })
        .catch((err) => console.log(err));
    }
  }, [signers, query, property]);

  return (
    <Layout>
      <div className={classes.height}>
        <Dialog
          open={open}
          onClose={() => null}
          classes={{ paper: classes.paper }}
        >
          <div className={classes.root}>
            <iframe width="600" height="900" src={iframe} />
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}
