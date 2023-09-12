import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../../components/states";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    textStyle: {
        fontFamily: "Gilroy, sans-serif",
    },
}));

function getSteps() {
    return ['Account', 'ID', 'Offers', 'Insepction', 'Closing'];
}

export default function ProfileTracker() {
    const authLocalState = useRecoilValue(authState);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [userInfo, setUserInfo] = useState({});
    const [type, setType] = useState({});
    const [buyerInfo, setBuyerInfo] = useState({});
    const [sellerInfo, setSellerInfo] = useState({});


    useEffect(() => {
        if (authLocalState && authLocalState.user.email) {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getPorfileTracker`,
                    {
                        userEmail: authLocalState?.user?.email,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    setBuyerInfo(res.data && res.data.buyerInfo ? res.data.buyerInfo : null);
                    setType(res.data.type);
                    setUserInfo(res.data.userInfo);
                    setSellerInfo(res.data && res.data.sellerInfo ? res.data.sellerInfo : null);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const isStepOptional = (step) => {
        return step === 1;
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (type == 'buyer') {
                        if ((userInfo.emailVerified == true && index == 0) || (userInfo.IDVerified == 'Validated' && index == 1)) {
                            stepProps.completed = true;
                        }
                    } else {
                        if ((userInfo.emailVerified == true && index == 0) || (userInfo.IDVerified == 'Validated' && index == 1)) {
                            stepProps.completed = true;
                        }
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} className={classes.textStyle}>{label}</StepLabel>
                        </Step>
                    );
                })
                }

            </Stepper>

        </div>
    );
}
