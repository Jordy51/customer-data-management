const router = require("express").Router();

const Customer = require("../models/CustomerSchema");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/toys", (req, res) => {});

router.get("/electronics", (req, res) => {});

router.post("/createCustomer", (req, res) => {
	const { email, name, phoneNumber } = req.body;

	const newCustomer = new Customer({
		email,
		name,
		phoneNumber,
	});

	newCustomer
		.save()
		.then((customer) => {
			console.log(newCustomer);
			res.send("New Customer created" + newCustomer);
		})
		.catch((err) => console.log(err));
});

module.exports = router;
