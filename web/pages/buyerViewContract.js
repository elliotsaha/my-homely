import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Layout from "../components/layout";
import axios from "axios";
import BuyerView from "../components/econtract/buyerView";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "40rem",
    },
  })
);

export default function buyerViewContract() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { query } = router;
  const classes = useStyles();
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
        <BuyerView state={open} setState={() => null} data={data} />
      </div>
    </Layout>
  );
}
