const router = require("express").Router();

const Customer = require("../models/CustomerSchema");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/toys", (req, res) => {
	res.render("toys");
});

router.get("/electronics", (req, res) => {});

router.post("/toys/createCustomer", (req, res) => {
	const { email, name, address, phoneNumber, dob } = req.body;

	const newCustomer = new Customer({
		email,
		name,
		address,
		phoneNumber,
		dob,
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
