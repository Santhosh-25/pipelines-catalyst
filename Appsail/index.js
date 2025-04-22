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

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {});

module.exports = app;
