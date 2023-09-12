import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../components/states";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import EmailRounded from "@material-ui/icons/EmailRounded";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    dialog: {
      padding: "3rem",
      fontWeight: "bold",
    },
  })
);

export default function SysAdmin() {
  const authLocalState = useRecoilValue(authState);
  const router = useRouter();
  if (authLocalState.user.role !== "sysadmin") {
    router.push("/login");
  }

  const [unapprovedListings, setUnapprovedListings] = React.useState([]);

  React.useEffect(() => {
    Axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewUnapprovedListings`,
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        setUnapprovedListings(res.data);
      })
      .catch((e) => console.log(e.details));
  }, [unapprovedListings]);

  const approveListing = (i) => {
    Axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/approveListing`,
      {
        id: i._id,
      },
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [disapproveListingReason, setDisapproveListingReason] = React.useState(
    ""
  );

  const disapproveListing = (i) => {
    Axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/disapproveListing`,
      {
        id: i._id,
        reason: disapproveListingReason,
      },
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [
    approveListingDialogOpen,
    setApproveListingDialogOpen,
  ] = React.useState(false);
  const [
    disapproveListingDialogOpen,
    setDisapproveListingDialogOpen,
  ] = React.useState(false);

  const [addAdminEmail, setAddAdminEmail] = React.useState([]);
  const [adminEmailCurrent, setAdminEmailCurrent] = React.useState("");

  const handleChipDelete = (chipToDelete) => () => {
    setAddAdminEmail((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const addAdmin = () => {
    addAdminEmail.map((i) => {
      Axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/addAdmin`,
        {
          email: i.email,
        },
        { withCredentials: true }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setAddAdminEmail([]);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>UNAPPROVED LISTINGS</div>
      {unapprovedListings.map((i) => {
        return (
          <div key={i._id}>
            <div>Sent By: {i.sentBy}</div>
            <div>{JSON.stringify(i.query)}</div>
            <div>
              <Button
                onClick={() => {
                  setApproveListingDialogOpen(true);
                }}
              >
                Approve
              </Button>
              <Dialog
                open={approveListingDialogOpen}
                onClose={() => {
                  setApproveListingDialogOpen(false);
                }}
              >
                <div className={classes.dialog}>
                  Approve
                  <div>
                    <Button
                      onClick={() => {
                        approveListing(i);
                        setApproveListingDialogOpen(false);
                      }}
                    >
                      Approve listing
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setApproveListingDialogOpen(false);
                      }}
                    >
                      {" "}
                      Go Back
                    </Button>
                  </div>
                </div>
              </Dialog>
              <Button
                onClick={() => {
                  setDisapproveListingDialogOpen(true);
                }}
              >
                Disapprove
              </Button>
              <Dialog
                open={disapproveListingDialogOpen}
                onClose={() => {
                  setDisapproveListingDialogOpen(false);
                }}
              >
                <div className={classes.dialog}>Disapprove</div>
                <TextField
                  label="provide reason"
                  value={disapproveListingReason}
                  onChange={(e) => {
                    setDisapproveListingReason(e.target.value);
                  }}
                />
                <div>
                  <Button
                    disabled={disapproveListingReason === ""}
                    onClick={() => {
                      disapproveListing(i);
                      setDisapproveListingReason(false);
                    }}
                  >
                    Disapprove listing
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setDisapproveListingReason(false);
                    }}
                  >
                    {" "}
                    Go Back
                  </Button>
                </div>
              </Dialog>
            </div>
          </div>
        );
      })}

      <div>
        <div>HIRE ADMIN</div>
        <TextField
          label="email address"
          onChange={(e) => {
            setAdminEmailCurrent(e.target.value);
          }}
          value={adminEmailCurrent}
        />
        <Button
          onClick={() => {
            addAdminEmail.push({
              key: addAdminEmail.length,
              email: adminEmailCurrent,
            });
            setAdminEmailCurrent("");
          }}
        >
          add
        </Button>
        {addAdminEmail.map((chip) => {
          return (
            <Chip
              icon={<EmailRounded />}
              label={chip.email}
              onDelete={handleChipDelete(chip)}
            />
          );
        })}
        <div>
          <Button
            onClick={() => {
              addAdmin();
            }}
          >
            Send Out Admin Privledges
          </Button>
        </div>
      </div>
    </div>
  );
}
