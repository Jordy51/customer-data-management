const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// DB Config
const db = process.env.MongoURI;

// Connect MongoDB
mongoose
	.connect(db + "MuxElectronicToys", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected!"))
	.catch((err) => console.log(err));

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));
app.use("/fields", require("./routes/fieldsRoute"));
app.use("/customers", require("./routes/customerRoute"));

app.listen(PORT, () => console.log(`Server is up and running on port http://localhost:${PORT}`));
