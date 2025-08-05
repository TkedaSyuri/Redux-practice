const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}))
app.use("/api/v1",require("./src/v1/routes"))

const PORT = 8080;

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("Connectting to DB...");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中");
});
