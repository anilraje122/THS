const jwt = require("jsonwebtoken");
const { AES, enc } = require("crypto-js");
const config = require("../config/default.json");

auth = async (req, res, next) => {
  try {
    // Get auth token from request header
    const token = req.header("auth-token");
    if (!token) {
      return res
        .status(400)
        .json({ Error: "Unauthorized! No access token in header" });
    }
    // Decrypt token with crypto-js and decode token with jwt
    const bytes = AES.decrypt(token, config.JWT.SECRET);
    const originalToken = bytes.toString(enc.Utf8);
    const decoded = await jwt.verify(originalToken, config.JWT.SECRET);
    console.log(decoded);
    // Attach decoded payload to request
    if (decoded.role === "customer") {
      req.customer = decoded;
    } else {
      req.admin = decoded;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Token expired. Login again" });
  }
};

module.exports = auth;
