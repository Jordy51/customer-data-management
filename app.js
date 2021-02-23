const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("This is project assignment fot MuxEmail.");
});

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
