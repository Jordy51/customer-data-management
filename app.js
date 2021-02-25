const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MongoURI;

// Connect MongoDB
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected!"))
	.catch((err) => console.log(err));

app.use("/", require("./routes/customerRoute"));
	
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
