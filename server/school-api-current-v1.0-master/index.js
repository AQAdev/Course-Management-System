const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const morgan = require("morgan");

// Middlwares
const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

// .env
const port = process.env.PORT || 8000;

// connection
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected..."))
  .catch((er) => console.log(er));

app.use("/v1", require("./router/member"));
app.use("/v1", require("./router/admin"));
app.use("/v1", require("./router/student"));
app.use("/v1", require("./router/announcemment"));
app.use("/v1", require("./router/scholership"));
app.use("/v1", require("./router/teacher"));
app.use("/v1", require("./router/program"));
app.use("/v1", require("./router/batch"));
app.use("/v1", require("./router/selectedcourse"));
app.use("/v1", require("./router/department"));
app.use("/v1", require("./router/scholership"));
app.use("/v1", require("./router/section"));
app.use("/v1", require("./router/topic"));
app.use("/v1", require("./router/courses"));
app.use("/v1", require("./router/attendance"));
app.use("/v1", require("./router/timeTable"));
app.use("/v1", require("./router/registration-status"));

app.get("/", (req, res) => {
  console.log("data");
  res.status(200).json({
    message: "Api Working",
  });
});
app.listen(port, () => {
  console.log("server Activited");
});
