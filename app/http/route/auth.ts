import express, { Request, Response } from "express";

const router: express.Router = express.Router();

export function authRouter() {
  router.get(
    "/", (req, res) => {
        res.json({});
      }
  );
  return router;
}


