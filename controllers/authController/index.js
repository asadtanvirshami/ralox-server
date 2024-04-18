const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const sendEmailService = require("../../service/auth/sendLinkEmail/auth.service");

//----User-Login API----
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding the user from the table on behalf of the creds provided
    const userInfo = await db.Users.findOne({
      where: { email: email, password: password },
    });

    if (userInfo) {
      // If User exists, execute this condition
      if (userInfo.email == email && userInfo.password) {
        const payload = {
          // Payload to send and cache on the client-side
          fname: `${userInfo.fname}`,
          lname: ` ${userInfo.lname}`,
          username: `${userInfo.fname} ${userInfo.lname}`,
          loginId: `${userInfo.id}`,
          email: userInfo.email,
          isAdmin: false,
          isAuthorized: true,
        };
        jwt.sign(
          // JWT token with expiration time and payload
          payload,
          "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
          { expiresIn: "12h" },
          (err, token) => {
            if (err)
              return res.status(500).json({ status: "error", message: err });
            return res.status(200).json({
              status: "success",
              message: "authorized-user",
              token: "BearerSplit" + token,
            });
          }
        );
      }
    } else {
      // If User does not exist or wrong credentials, execute this condition
      return res
        .status(409)
        .json({ status: "failed", message: "account-not-exist" });
    }
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

//----Admin-Login API----
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding the user from the table on behalf of the creds provided
    const userInfo = await db.Admins.findOne({
      where: { email: email, password: password },
    });

    if (userInfo) {
      // If User exists, execute this condition
      if (userInfo.email == email && userInfo.password) {
        const payload = {
          // Payload to send and cache on the client-side
          fname: `${userInfo.fname}`,
          lname: ` ${userInfo.lname}`,
          username: `${userInfo.fname} ${userInfo.lname}`,
          loginId: `${userInfo.id}`,
          email: userInfo.email,
          isAdmin: true,
          isAuthorized: true,
        };
        jwt.sign(
          // JWT token with expiration time and payload
          payload,
          "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
          { expiresIn: "12h" },
          (err, token) => {
            if (err)
              return res.status(500).json({ status: "error", message: err });
            return res.status(200).json({
              status: "success",
              message: "authorized-user",
              token: "BearerSplit" + token,
            });
          }
        );
      }
    } else {
      // If User does not exist or wrong credentials, execute this condition
      return res
        .status(409)
        .json({ status: "failed", message: "account-not-exist" });
    }
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

//----Admin-Signup API----
exports.adminSignup = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    //Finding the user from the table on behalf of the creds provided
    const AdminInfo = await db.Admins.findOne({ where: { email: email } });
    if (AdminInfo) {
      //If User does not exist execute this condition
      res.status(409).json({ status: "failed", message: "account-exists" });
    }
    if (!AdminInfo) {
      //If User exist execute this condition
      await db.Admins.create({ ...req.body });
      res.status(200).json({ status: "success", message: "account-created" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

//----User-Signup API----
exports.signup = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    //Finding the user from the table on behalf of the creds provided
    const UserInfo = await db.Users.findOne({ where: { email: email } });
    if (UserInfo) {
      //If User does not exist execute this condition
      res.status(409).json({ status: "failed", message: "account-exists" });
    }
    if (!UserInfo) {
      //If User exist execute this condition
      await db.Users.create({ ...req.body });
      res.status(200).json({ status: "success", message: "account-created" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

//----Password-Reset-Link API----
exports.generateResetLink = async (req, res) => {
  try {
    // Extract token and user ID from request query
    const { email } = req.query;
    // Replace these placeholders with your actual client URL and reset token
    const clientURL = "http://localhost:3000";
    const userInfo = await db.Users.findOne({ where: { email: email } });

    if (!userInfo) {
      // If user is not found, return a 404 error response
      return res
        .status(404)
        .json({ status: "error", message: "user-not-found" });
    }

    const payload = {
      id: userInfo.id,
    };

    jwt.sign(
      payload,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      { expiresIn: "1min" },
      async (err, token) => {
        // Make the callback function async
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed to generate token" });
        }
        const link = `${clientURL}/passwordReset?id=${userInfo.id}&token=${
          "BearerSplit" + token
        }`;
        try {
          // await sendEmailService(link, userInfo.email);
          return res.status(200).json({
            status: "success",
            message: "Password reset link generated successfully.",
            link: link,
            token: "BearerSplit" + token,
          });
        } catch (error) {
          // Handle error if sendEmailService throws an exception
          console.error("Error sending password reset email:", error);
          return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
          });
        }
      }
    );
    // Construct the password reset link
  } catch (error) {
    console.error(error);
    // Return error response for any unexpected errors
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // Extract user ID from request query
    const { userId, password } = req.query;

    // Find user information from the database
    const userInfo = await db.Users.findOne({ where: { id: userId } });

    if (!userInfo) {
      // If user is not found, return a 404 error response
      return res
        .status(404)
        .json({ status: "error", message: "user-not-found" });
    }

    // Replace the placeholder with your actual password update logic
    const updatePassword = await db.Users.update(
      { password: password },
      { where: { id: userId } }
    );

    if (!updatePassword) {
      // If password update fails, return a 500 error response
      return res
        .status(500)
        .json({ status: "error", message: "Failed to update password" });
    }

    // Prepare payload for JWT token
    const payload = {
      // Payload to send and cache on the client-side
      fname: `${userInfo.fname}`,
      lname: ` ${userInfo.lname}`,
      username: `${userInfo.fname} ${userInfo.lname}`,
      loginId: `${userInfo.id}`,
      email: userInfo.email,
      isAdmin: false,
      isAuthorized: true,
    };
    jwt.sign(
      // JWT token with expiration time and payload
      payload,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      { expiresIn: "12h" },
      (err, token) => {
        if (err) return res.status(500).json({ status: "error", message: err });
        return res.status(200).json({
          status: "success",
          message: "password-updated",
          token: "BearerSplit" + token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    // Return error response for any unexpected errors
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

//*****Link Verification Process*******/

//----JWT LINK Verification Authorization API----
exports.verifyResetLinkToken = (req, res) => {
  res.status(200).json({ status: "success", verifiedLink: true });
};

//*****Session Verification Process*******/

//----JWT Verification Authorization API----
exports.verifyToken = (req, res) => {
  res.status(200).json({ status: "success", isAuthorized: true });
};

//----JWT Verification----
exports.verify = (req, res, next) => {
  //token recieved in the headers and spliting up
  const token = req.headers["x-access-token"]?.split("Split")[1];
  if (token) {
    //token recieved this condition executes
    jwt.verify(
      token,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      (err, decode) => {
        if (err) {
          //if token expired or broken this statement will be executed
          return res.json({
            status: "error",
            isAuthorized: false,
            message: "error-occured",
          });
        }
        req.user = {};
        req.user.id = decode.id;
        next(); //if token verified run to the JWT Verification Authorization
      }
    );
  } else {
    res.json({ status: "error", message: "token-not-verified" });
  }
};
