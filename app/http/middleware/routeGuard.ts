import express from "express";
import config from "../../config/config";
import * as jwt from "jsonwebtoken";

export const ProtectedRoutes = express.Router();

ProtectedRoutes.use((req, res, next) => {
  const token: string = req.headers["access-token"];
  if (token) {
    jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ type: 'error', message: "invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      type: 'error',
      message: "No token provided."
    });
  }
});
