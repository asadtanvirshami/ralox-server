const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const db = require("../../models");

//Login API
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

//Signup API
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

exports.loginAdmin = (req, res) => {};

//JWT Verification Authorization
exports.verifyToken = (req, res) => {
  res.status(200).json({ status: "success", isAuthorized: true });
};

//JWT Verification
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
        req.user.username = decode.username;
        next(); //if token verified run to the JWT Verification Authorization
      }
    );
  } else {
    res.status(500).json({ status: "error", message: "token-not-verified" });
  }
};
