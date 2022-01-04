import cors from "cors";
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Route from "./routes/route.js";
import User from "./models/SignUp.js";
import transactionRoute from "./routes/transactionRoute.js";

dotenv.config();
// App initialization

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Default config
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).json({});
  }
  next();
});
app.use(express.static(path.join(__dirname, "build")));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

// Mongoose Initialization
const promise = mongoose.connect(process.env.LOCALMONGOURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

/* image Storage engine */
const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "UsersProfileImages",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
/* image Storage engine */

//mongoose Initialization
const db = mongoose.connection;
let gfs;
db.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "UsersProfileImages",
  });
  // Routes
  app.use("/user", Route);
  app.use("/user", transactionRoute);

  // Update user profile image
  app.post("/user/profile/upload", upload.single("file"), (req, res, next) => {
    const files = req.file;
    fs.readFile("userProfileImage.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(400).json({ success: false, user: "Save id error" });
        return;
      }
      const { id } = JSON.parse(data);

      User.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        {
          profileImg: req.file.filename,
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: " Not found" });
          }
          console.log(doc);
          return res.status(200).json({ message: " Uploaded" });
        }
      );
    });

    console.log(files);
  });

  //  Get a particular song or image
  app.get("/user/display/:filename", (req, res) => {
    const fileName = req.params.filename;
    gfs.find({ filename: fileName }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "file not found",
        });
      } else {
        gfs.openDownloadStreamByName(fileName).pipe(res);
      }
    });
  });
  console.log("Database fully connected");

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});

db.on("error", console.error.bind(console, "connection error:"));
