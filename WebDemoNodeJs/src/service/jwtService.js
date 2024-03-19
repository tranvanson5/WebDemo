const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../model/user');
const Role = require("../model/role");

const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;

const jwtService = {
  generateToken: (payload) => {
    try {
      return jwt.sign(payload, secretKey, { expiresIn:(expiresIn*24*30) });
    } catch (error) {
      throw new Error('Token generation failed: ' + error.message);
    }
  },

  verifyToken: (req) => {
    return new Promise((resolve, reject) => {
      try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token is provided in the header
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      } catch (error) {
        reject(new Error('Token verification failed: ' + error.message));
      }
    });
  },

  getUsernameFromToken: (req) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token is provided in the header
      const decoded = jwt.verify(token, secretKey);
      return decoded.username;
    } catch (error) {
      throw new Error('Failed to extract username from token: ' + error.message);
    }
  },
};


module.exports = {jwtService};

