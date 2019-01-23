require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 8000;

const app = express();
const models = require("./models/");

app.use(logger("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/users"));

// models.sequelize.sync().then(function() {
app.listen(PORT, () => console.log(`Open localhost:${PORT}`));
// })
