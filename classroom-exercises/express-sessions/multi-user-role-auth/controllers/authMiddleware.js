const config = require("../config/default.json");
const { verify } = require("jsonwebtoken");
const { AES, enc } = require("crypto-js");

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if(!token) {
    return res.status(401).json({"Error": "Unauthorized! No access token in header"});
  }
  try {
    const bytes = AES.decrypt(token, config.CRYPTO.SECRET_KEY);
    const decryptedToken = bytes.toString(enc.Utf8);
    console.log(decryptedToken);
    const decodedToken = await verify(decryptedToken, config.JWT.SECRET_KEY);
    if(decodedToken.role === 'customer') {
      req.customer = decodedToken;
    } else {
      req.admin = decodedToken;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({"Error": "Token expired. Login again!"});
  }
};

module.exports = auth;