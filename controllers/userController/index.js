const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const db = require("../../models");

//----profile-edit API----
exports.edit = async (req, res) => {
  console.log(req.body);
  try {
    //Updating the user from the table on behalf of the creds provided
    const userInfo = await db.Users.upsert({ ...req.body });
    if (userInfo) {
      const payload = {
        // Payload to send and cache on the client-side
        fname: req.body.fname,
        lname: req.body.lname,
        username: `${req.body.fname} ${req.body.lname}`,
        loginId: req.body.id,
        email: req.body.email,
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
            status: "updated",
            message: "account-updated",
            token: "BearerSplit" + token,
          });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

//----profile-get API----
exports.get = async (req, res) => {
  try {
    //getting the user from the table on behalf of the creds-id provided
    const UserInfo = await db.Users.findOne({
      where: { id: req.query.userId },
    });
    if (UserInfo) {
      res.status(200).json({
        status: "success",
        message: "profile-fetched",
        payload: UserInfo,
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};
