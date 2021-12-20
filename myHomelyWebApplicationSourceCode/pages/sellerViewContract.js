import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Layout from "../components/layout";
import axios from "axios";
import SellerView from "../components/econtract/sellerView";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "40rem",
    },
  })
);
export default function sellerViewContract() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

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
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <Layout>
      <div className={classes.root}>
        <SellerView state={open} setState={() => null} data={data} />
      </div>
    </Layout>
  );
}
