import express, { Request, Response } from "express";
import { asyncWrapper } from "../../helper/asyncWrapper";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const fileTempArr = file.originalname.split(".");
    const extName = fileTempArr[fileTempArr.length - 1];
    if (
      extName.toLowerCase() === "png" ||
      extName.toLowerCase() === "jpg" ||
      extName.toLowerCase() === "jpeg"
    ) {
      cb(null, "static/uploads/images");
    } else {
      cb(null, "static/uploads/files");
    }
  },
  filename: function(req, file, cb) {
    const fileTempArr = file.originalname.split(".");
    const extName = fileTempArr[fileTempArr.length - 1];
    fileTempArr.splice(-1, 1);
    const name = fileTempArr.join("-").replace(" ", "-");
    cb(null, name + "-" + Date.now() + "." + extName);
  }
});

const upload = multer({ storage: storage });

const router: express.Router = express.Router();

export function uploadRouter() {
  router.get(
    "/images",
    asyncWrapper(async (_: Request, res: Response) => {
      fs.readdir("static/uploads/images", (err, files) => {
        for (let i = 0; i < files.length; i++) {
          files[i] = "uploads/images/" + files[i];
        }
        res.json(files);
      });
    })
  );
  router.get(
    "/files",
    asyncWrapper(async (_: Request, res: Response) => {
      fs.readdir("static/uploads/files", (err, files) => {
        for (let i = 0; i < files.length; i++) {
          files[i] = "uploads/files/" + files[i];
        }
        res.json(files);
      });
    })
  );
  router.post("/add", upload.single("image"), function(req, res) {
    res.json({
      filename: req.file.filename,
      path: req.file.path
    });
  });

  return router;
}
