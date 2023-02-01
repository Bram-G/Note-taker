const express = require("express");
const app = express();
const PORT = process.env.PORT || "3000";
const path = require("path");
const fs = require("fs");
const routes = require("./controllers/indexcontroller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
