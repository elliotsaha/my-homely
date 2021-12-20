const router = require("express").Router();
const User = require("../model/User");
const EContract = require("../model/EContract");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const {
  registerValidation,
  loginValidation,
  passwordValidation,
} = require("../validation/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "962991925701-hrfbaapid0i1dg6iaaebgi5jjsofm46c.apps.googleusercontent.com"
);
const phone = require("phone");
const fetch = require("node-fetch");
const telnyx = require("telnyx")(process.env.TELNYX_KEY);
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

exports.checkIfLogged = async (req, res) => {
  try {
    const userID = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    // Check If User Is Already In Database
    const user = await User.findOne({ _id: userID });
    if (user) {
      res.json({
        auth: true,
        user: user,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      });
    } else {
      res.json({ auth: false, user: null });
    }
  } catch (e) {
    res.json({ auth: false, user: null });
  }
};

exports.registerCheck = async (req, res) => {
  // Validation Before User Creation
  const { error } = registerValidation(req.body);
  if (req.body.confirmPassword !== req.body.password) {
    res.status(400).send("Passwords don't match");
    return;
  }

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res
      .status(400)
      .send("User Already Exists, Redirecting To Sign In Page...");
  }

  return res.status(200).send("Success");
};

exports.register = async (req, res) => {
  // Validation Before User Creation
  const { error } = registerValidation(req.body);
  if (req.body.confirmPassword !== req.body.password) {
    res.status(400).send("Passwords don't match");
    return;
  }

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res
      .status(400)
      .send("User Already Exists, Redirecting To Sign In Page...");
  }

  // Hashing Password in bcrypt 12 Rounds
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const pipeDriveData = await axios.post(
    "https://api.pipedrive.com/v1/persons?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      visible_to: 3,
    }
  );

  await axios.post(
    "https://api.pipedrive.com/v1/leads?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
    {
      title: `${req.body.name} Has Signed up for myHomely`,
      person_id: pipeDriveData.data.data.id,
    }
  );

  // Create New User
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword,
    icon: req.body.icon,
    pipeDriveId: pipeDriveData.data.data.id,
  });

  // Async SendGrid
  jwt.sign(
    { user: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" },
    (err, emailToken) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const url = `${process.env.CLIENT_URL}/user/emailValidation?token=${emailToken}`;

      const msg = {
        to: user.email,
        from: "info@myhomely.io",
        templateId: "d-d6f23fcc10244d95ab948a1f8bb344d3",
        dynamicTemplateData: {
          URL: url,
          LINK: process.env.CLIENT_URL,
        },
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("SendGrid Email Sent");
        })
        .catch((err) => {
          console.log(err);
        });

      if (err) {
        return res.status(400).send(err);
      }
    }
  );

  jwt.sign(
    { user: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: "2d" },
    (err, phoneToken) => {
      const url = `${process.env.CLIENT_URL}/user/phoneVerification?token=${phoneToken}`;

      // Telnyx
      telnyx.messages.create(
        {
          from: "+12897973697",
          to: phone(user.phone, "CA")[0],
          text:
            "Thank you for Signing up with myHomely. Please verify your mobile number by clicking this link: " +
            url,
        },
        function (err, response) {
          if (err) console.log(err.raw.errors);
          console.log(response);
        }
      );

      if (err) {
        return res.status(400).send(err);
      }
    }
  );

  // Try Catch Block To Check for Errors
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2d",
    });
    res
      .cookie("auth-token", token, { domain: process.env.LOCAL, path: "/" })
      .status(200)
      .send("Successfully Registered");
  } catch (err) {
    console.log(err);
  }
};

// Resend Confirmation Email
exports.resendConfirmEmail = async (req, res) => {
  // Checking if Email exists in Database
  const user = await User.findOne({ email: res.locals.user.email });

  console.log("USER", user);

  if (!user) {
    return res.status(400).send("It appears that you haven't registered yet");
  }

  if (user.emailVerified) {
    return res
      .status(400)
      .send("It looks like you've already confirmed your email");
  }

  // Async Nodemail
  jwt.sign(
    { user: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" },
    (err, emailToken) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const url = `${process.env.CLIENT_URL}/user/emailValidation?token=${emailToken}`;

      const msg = {
        to: user.email,
        from: "info@myhomely.io",
        templateId: "d-d6f23fcc10244d95ab948a1f8bb344d3",
        dynamicTemplateData: {
          URL: url,
        },
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("SendGrid Email Sent");
        })
        .catch((err) => {
          console.log(err);
        });

      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    }
  );
  // Try Catch Block To Check for Errors
  try {
    const savedUser = await user.save();
    res.send({
      userInfo: savedUser,
      userMessage:
        "Please Confirm Your Email With The Link We Sent to Your Inbox",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.resendSMSVerification = async (req, res) => {
  try {
    const user = await User.findOne({ email: res.locals.user.email });
    console.log(user);
    if (!user) {
      return res.status(400).send("It appears that you haven't registered yet");
    }

    if (user.phoneVerified) {
      return res
        .status(400)
        .send("It looks like you've already confirmed your phone number");
    }

    jwt.sign(
      { user: res.locals.user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "2d" },
      (err, phoneToken) => {
        const url = `${process.env.CLIENT_URL}/user/phoneVerification?token=${phoneToken}`;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        // Telnyx
        telnyx.messages.create(
          {
            from: "+12897973697",
            to: phone(res.locals.user.phone, "CA")[0],
            text: "Verify Your Phone Number By Clicking This Link: " + url,
          },
          function (err, response) {
            if (err) {
              res.status(400).send(err);
              console.log(err);
            } else {
              res.status(200).send(response);
            }
          }
        );

        if (err) {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// Email Verification
exports.emailconfirmation = async (req, res) => {
  try {
    console.log(req.body);
    // Take Link parameter and verify JWT Token
    console.log("USER TOKEN", req.body.token);
    const userID = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    console.log("USERID", userID);
    // Take User Model, Find ID and Update Email Confirmation to True
    User.findByIdAndUpdate(
      userID.user,
      // Target Confirmation Bool in Schema
      { emailVerified: true },
      // Show Update in Database
      { new: true, upsert: true },

      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          return res.json({
            error: err,
            success: false,
          });
        } else {
          return res.json({
            success: true,
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
      success: false,
    });
  }
};

// Email Verification
exports.phoneconfirmation = async (req, res) => {
  try {
    // Take Link parameter and verify JWT Token
    const userID = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    // Take User Model, Find ID and Update Email Confirmation to True
    User.findByIdAndUpdate(
      userID.user,
      // Target Confirmation Bool in Schema
      { phoneVerified: true },
      // Show Update in Database
      { new: true },

      (err, result) => {
        if (err)
          return res.json({
            error: err,
            success: false,
          });
        return res.json({
          success: true,
        });
      }
    );
  } catch (e) {
    res.json({
      error: e,
      success: false,
    });
  }
};

// Login
exports.login = async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({
      errType: error.details[0].context.label,
      errorMsg: error.details[0].message,
    });
  }

  // Check If Email Exists in Database
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      errType: "all",
      errorMsg: "Email Or Password is Wrong",
    });

  // Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({
      errType: "password",
      msg: "Invalid Password",
    });

  // Create and Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "2d",
  });
  res
    .cookie("auth-token", token, { domain: process.env.LOCAL, path: "/" })
    .status(200)
    .send("Successfully Logged In");
};

// Leading to Change Password Page
exports.forgotPassword = async (req, res) => {
  // Check if Email Exists in Database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Sorry, We Couldn't Find Your Email");

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Nodemailer Server Ready To Send Forget Password Email");
    }
  });

  // Async Nodemail
  jwt.sign(
    { user: user._id },
    process.env.RESET_PASSWORD_TOKEN_SECRET,
    { expiresIn: "20m" },
    (err, emailToken) => {
      const url = `${process.env.CLIENT_URL}/resetpassword/${emailToken}`;
      return user.updateOne({ resetLink: emailToken }, (err, success) => {
        if (err) {
          return res.status(400).send("Reset Password Link Error");
        } else {
          transporter
            .sendMail({
              to: user.email,
              subject: "forgot your password?",
              html: `Please click here to reset your password: <a href="${url}">${url}</a>`,
            })
            .then(() => {
              return res.status(200).send("Reset Link Sent");
            });
        }
      });
    }
  );
};

exports.resetPassword = async (req, res) => {
  const { resetLink, newPassword, confirmPassword } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_TOKEN_SECRET,
      (err, token) => {
        if (err) {
          return res.status(401).send("Incorrect Token or Expired Token");
        }
        User.findOne({ resetLink }, async (err, user) => {
          if (err || !user) {
            return res.status(400).send("User with this token does not exist");
          }
          // Validation
          const { error } = passwordValidation({ password: newPassword });
          if (confirmPassword !== newPassword) {
            res.status(400).send("Passwords don't match");
          } else if (error) {
            return res.status(400).send(error.details[0].message);
          } else if (confirmPassword === newPassword && !error) {
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(newPassword, salt); // Hashing Password in bcrypt 12 Rounds

            const obj = {
              password: hashPassword,
              resetLink: "",
            };

            user = _.extend(user, obj);
            user.save((err, result) => {
              if (err) {
                return res.status(401).send("Incorrect Token or Expired Token");
              } else {
                return res
                  .status(200)
                  .send("Your password has been reset")
                  .clearCookie("auth-token", {
                    domain: process.env.LOCAL,
                    path: "/",
                  });
              }
            });
          } else {
            return res.status(401).send("Authentication Error");
          }
        });
      }
    );
  } else {
    return res.status(401).send("Authentication Error");
  }
};

exports.logout = async (req, res) => {
  // Destroying Token on Client Side & Redirecting to Homepage
  // TODO: CHECK AUTH-TOKEN BEFORE CLEARING TO ENSURE ACCOUNT IS LOGGED IN
  try {
    res.clearCookie("auth-token", { domain: process.env.LOCAL, path: "/" });
    return res.status(200).send("success");
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.oldGoogleLogin = async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec(async (err, user) => {
          if (err) {
            const salt = await bcrypt.genSalt(12);
            const password = await bcrypt.hash(
              jwt.sign(email, process.env.TOKEN_SECRET),
              salt
            );
            let newUser = new User({ name, email, password });
            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "Something Went Wrong...",
                });
              } else {
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.TOKEN_SECRET,
                  { expiresIn: "7d" }
                );
                const { _id, name, email } = data;
                res
                  .cookie("auth-token", token, {
                    domain: process.env.LOCAL,
                    path: "/",
                  })
                  .status(200)
                  .send("Successfully Logged In");
              }
            });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.TOKEN_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, name, email } = user;

              res
                .cookie("auth-token", token)
                .status(200)
                .send("Successfully Logged In");
            } else {
            }
          }
        });
      }
    });
};

exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            res.status(400).send("An Unexpected Error has Occured");
          }
          if (!user) {
            res.status(400).send("This Account Does Not Exist In Our Database");
          }
          if (user) {
            const token = jwt.sign(
              { _id: user._id },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "2d",
              }
            );
            res
              .cookie("auth-token", token, {
                domain: process.env.LOCAL,
                path: "/",
              })
              .status(200)
              .send("Successfully Logged In");
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.googleSignup = async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;
      // Check if user already exists
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          res.status(400).send("An Unexpected Error has Occured");
        }
        if (user) {
          res.status(400).send("User Already Exists, Try Logging In Instead.");
        }
        if (!user) {
          const salt = await bcrypt.genSalt(12);
          const password = await bcrypt.hash(
            jwt.sign({ email }, process.env.TOKEN_SECRET),
            salt
          );
          const icon = req.body.icon;

          const pipeDriveData = await axios.post(
            "https://api.pipedrive.com/v1/persons?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
            {
              name: name,
              email: email,
              visible_to: 3,
            }
          );

          let pipeDriveId = pipeDriveData.data.data.id;

          await axios.post(
            "https://api.pipedrive.com/v1/leads?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
            {
              title: `${name} Has Signed up for myHomely`,
              person_id: pipeDriveId,
            }
          );

          const newUser = new User({
            name,
            email,
            password,
            icon,
            pipeDriveId,
          });

          newUser.save((err, data) => {
            if (err) {
              console.log(err);
              return res.status(400).send("Something Went Wrong...");
            } else {
              const token = jwt.sign(
                { _id: data._id },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              res
                .cookie("auth-token", token, {
                  domain: process.env.LOCAL,
                  path: "/",
                })
                .status(200)
                .send("Successfully Logged In");
            }
          });
        }
      });
    });
};

exports.facebookSignup = async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(async (response) => {
      const { email, name } = response;

      // Check if user already exists
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          res.status(400).send("An Unexpected Error has Occured");
        }
        if (user) {
          res.status(400).send("User Already Exists");
        }
        if (!user) {
          const salt = await bcrypt.genSalt(12);
          const password = await bcrypt.hash(
            jwt.sign({ email }, process.env.TOKEN_SECRET),
            salt
          );
          const icon = req.body.icon;

          const pipeDriveData = await axios.post(
            "https://api.pipedrive.com/v1/persons?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
            {
              name: name,
              email: email,
              visible_to: 3,
            }
          );

          let pipeDriveId = pipeDriveData.data.data.id;

          await axios.post(
            "https://api.pipedrive.com/v1/leads?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
            {
              title: `${name} Has Signed up for myHomely`,
              person_id: pipeDriveId,
            }
          );

          const newUser = new User({
            name,
            email,
            password,
            icon,
            pipeDriveId,
          });

          newUser.save((err, data) => {
            if (err) {
              return res.status(400).json({
                error: "Something Went Wrong...",
              });
            } else {
              const token = jwt.sign(
                { _id: data._id },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              res
                .cookie("auth-token", token, {
                  domain: process.env.LOCAL,
                  path: "/",
                })
                .status(200)
                .send("Successfully Logged In");
            }
          });
        }
      });
    });
};

exports.oldfacebookLogin = async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email }).exec(async (err, user) => {
        if (err) {
          return res.status(400).send("Something Went Wrong...");
        } else {
          if (user) {
            const token = jwt.sign(
              { _id: user._id },
              process.env.TOKEN_SECRET,
              { expiresIn: "7d" }
            );
            const { _id, name, email } = user;
            return res.json({
              token,
              user: { _id, name, email },
            });
          } else {
            const salt = await bcrypt.genSalt(12);
            const password = await bcrypt.hash(
              jwt.sign({ email }, process.env.TOKEN_SECRET),
              salt
            );
            let newUser = new User({ name, email, password });
            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "Something Went Wrong...",
                });
              } else {
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.TOKEN_SECRET,
                  { expiresIn: "7d" }
                );
                const { _id, name, email } = data;
                return res.json({
                  token,
                  user: { _id, name, email },
                });
              }
            });
          }
        }
      });
    });
};

exports.facebookLogin = async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          res.status(400).send("User Does Not Exist");
        } else {
          const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "2d",
          });
          res
            .cookie("auth-token", token, {
              domain: process.env.LOCAL,
              path: "/",
            })
            .status(200)
            .send("Successfully Logged In");
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = res.locals.user;

    User.findOneAndDelete({ _id: user._id }, (err, response) => {
      if (err) {
        return res.status(400).send(err);
      }

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: "info@myhomely.io",
        subject: "Your Account Has Been Deleted",
        html: `This is a notice that your myHomely account has been deleted`,
      };

      sgMail
        .send(msg)
        .then(() => {
          res.status(200).send("Success").clearCookie("auth-token", {
            domain: process.env.LOCAL,
            path: "/",
          });
        })
        .catch((err) => console.log(err));
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.getNameFromEmail = async (req, res) => {
  try {
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    res.status(200).send(user.name);
  } catch (err) {
    console.log(err);
  }
};

exports.changeProfile = async (req, res) => {
  try {
    const {
      changeEmail,
      changeID,
      changeImage,
      changeName,
      changePhone,
    } = req.body;
    const usersEmail = res.locals.user.email;

    const user = await User.findOne({ email: usersEmail });

    if (user.email !== changeEmail) {
      const checkEmail = await User.findOne({ email: changeEmail });
      if (checkEmail === null) {
        const updateEmail = await User.findOneAndUpdate(
          { email: usersEmail },
          { email: changeEmail, emailVerified: false },
          { new: true, upsert: true }
        );
        console.log(updateEmail);

        // Async SendGrid
        jwt.sign(
          { user: res.locals.user._id },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" },
          (err, emailToken) => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const url = `${process.env.CLIENT_URL}/user/emailValidation?token=${emailToken}`;

            const msg = {
              to: user.email,
              from: "info@myhomely.io",
              templateId: "d-d6f23fcc10244d95ab948a1f8bb344d3",
              dynamicTemplateData: {
                URL: url,
              },
            };

            sgMail
              .send(msg)
              .then(() => {
                console.log("SendGrid Email Sent");
              })
              .catch((err) => {
                console.log(err);
              });

            if (err) {
              return res.status(400).send(err);
            }
          }
        );
      } else {
        res.status(400).send("This Email Address Already Exists");
      }
    }

    if (changePhone !== res.locals.user.phone) {
      const updatePhone = await User.findOneAndUpdate(
        { email: usersEmail },
        { phone: changePhone, phoneVerified: false },
        { new: true, upsert: true }
      );

      jwt.sign(
        { user: res.locals.user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "2d" },
        (err, phoneToken) => {
          const url = `${process.env.CLIENT_URL}/user/phoneVerification?token=${phoneToken}`;

          // Telnyx
          telnyx.messages.create(
            {
              from: "+12897973697",
              to: phone(changePhone, "CA")[0],
              text: "Verify Your Phone Number By Clicking This Link: " + url,
            },
            function (err, response) {
              if (err) console.log(err);
              console.log(response);
            }
          );

          if (err) {
            return res.status(400).send(err);
          }
        }
      );
    }

    const s3Bucket = new aws.S3({
      params: { Bucket: "myhomelyimages" },
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
      region: "us-east-2",
    });

    if (changeID.substring(0, 4) === "data") {
      let uuidID = uuidv4();

      let bufID = Buffer.from(
        changeID.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      let dataID = {
        Key: "ID/" + uuidID,
        Body: bufID,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
      };

      let IDLink = `https://myhomelyimages.s3.us-east-2.amazonaws.com/ID/${uuidID}`;

      s3Bucket.putObject(dataID, async function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error uploading data", data);
          return res.status(400).send("An unexpected error has occured");
        } else {
          console.log("success");
          const updatedUser = await User.findOneAndUpdate(
            { email: usersEmail },
            { ID: IDLink, IDVerified: "Pending Verification" },
            { new: true, upsert: true }
          );
          console.log(updatedUser);
        }
      });
    }

    if (changeImage !== user.icon) {
      const updated = await User.findOneAndUpdate(
        { email: usersEmail },
        { icon: changeImage },
        { new: true, upsert: true }
      );
    }

    return res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(400).send("An Error Has Occured");
  }
};

exports.getUnapprovedIDs = async (req, res) => {
  try {
    const users = await User.find({ IDVerified: "Pending Verification" });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.approveID = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { email: req.body.email },
      { IDVerified: "Validated" },
      (err, doc) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(doc);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.denyID = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { email: req.body.email },
      { IDVerified: "Failed Validation. Retry" },
      (err, doc) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(doc);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getProfileTracker = async (req, res) => {
  try {
    const userInfo = await User.findOne(
      { email: req.body.userEmail },
      { emailVerified: 1, role: 1, IDVerified: 1 }
    );

    const sellerInfo = await EContract.findOne(
      { sellerEmail: req.body.userEmail },
      { offerList: 1 }
    );
    if (sellerInfo != null) {
      res.status(200).send({
        userInfo: userInfo,
        sellerInfo: sellerInfo,
        type: "seller",
        status: true,
      });
    } else {
      const buyerInfo = await EContract.findOne(
        { buyerEmail: req.body.userEmail },
        { offerList: 1 }
      );
      res.status(200).send({
        userInfo: userInfo,
        buyerInfo: buyerInfo,
        type: "buyer",
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.requestAccountData = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "contact@myhomely.io",
    from: "info@myhomely.io",
    subject: `${res.locals.user.email} is requesting account data`,
    html: `${res.locals.user.email} is requesting all their account data`,
  };

  sgMail
    .send(msg)
    .then((result) => res.status(200).send("Success"))

    .catch((err) => res.status(400).send(err));
};

exports.facebookCheck = async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(async (response) => {
      const { email, name } = response;

      // Check if user already exists
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return res.status(400).send("An Unexpected Error has Occured");
        }
        if (user) {
          return res.status(400).send("User Already Exists");
        }

        if (!user && !err) {
          return res.status(200).send("Success");
        }
      });
    });
};

exports.googleCheck = async (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;

      // Check if user already exists
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return res.status(400).send("An Unexpected Error has Occured");
        }
        if (user) {
          return res
            .status(400)
            .send("User Already Exists, Try Logging In Instead.");
        }

        if (!err && !user) {
          return res.status(200).send("Success");
        }
      });
    });
};
