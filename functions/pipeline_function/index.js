var express = require("express");
var app = express();
var catalyst = require("zcatalyst-sdk-node");
app.use(express.json());

app.get("/test", (req, res) => {
  try {
    console.log("test");

    res.status(200).send("success");
  } catch (error) {
    console.log("error :", error);
    res.status(500).send(error);
  }
});

module.exports = app;
