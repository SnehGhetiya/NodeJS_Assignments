// importing files
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const { request } = require("http");
const { response } = require("express");
const app = express();
const port = 3000;

// output formatting
app.use(bodyParser.json());

// encoding the url
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// makeing static path to store and retrieve the images easily
app.use(express.static(__dirname + "/upload/images"));

// using multer to define the location of the image and to make storage for the images
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },
  // defining the extensions that are valid to upload
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    // making the name of the image based on date
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
var upload = multer({ storage: storage });

// making upload api for the image uploadation
app.post("/upload", upload.single("file"), function (req, res, next) {
  const id = req.body.id;
  const image = "http://localhost:3000/" + req.file.filename;
  const createdDate = new Date();
  if (!req.file) {
    res.status(500);
    return next(err);
  }
  // uploading the image redirecting to the url at which
  // image saved and showing the preview
  db.uploadImage(id, image, createdDate, res);
  res.writeHead(301, {
    Location: "http://localhost:3000/" + req.file.filename,
  });
  res.end();
});

// request methods formatting
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express and Postgres API" });
});

// list of APIs and which method that will call
app.get("/cars", db.getCars);
app.get("/car/:id", db.getCarById);
app.post("/cars", db.createCar);
app.delete("/car/:id", db.deleteCar);
app.put("/car/:id", db.updateCar);

// running port and application
app.listen(port, () => {
  console.log(`Good to go on port ${port}.`);
});
