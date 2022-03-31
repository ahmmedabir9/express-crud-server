const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("./src/config/database");
const app = express();
const http = require("http").createServer(app);

try {
  connect(
    database,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Database Connected");
    }
  );
} catch (err) {
  console.log("Database Connection Error");
}

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require("./src/routes/user.routes");

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("<div><h1>The Server is Running ------ </h1></div>");
});

var port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log("Server is Running on " + port);
});
