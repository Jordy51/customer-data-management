const router = require("express").Router();

const Customer = require("../models/CustomerSchema");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/toys", (req, res) => {
	res.render("toys");
});

router.get("/electronics", (req, res) => {});


router.post("/createCustomer", (req, res) => {
	const { email, name, address, phoneNumber, dob } = req.body;

	console.log(req.body)

	const newCustomer = new Customer({
		email,
		name,
		phoneNumber,
		address,
		dob: Date(dob),
	});

	newCustomer
		.save()
		.then((customer) => {
			res.send("New Customer created" + newCustomer);
		})
		.catch((err) => console.log(err));
});

router.delete("/deleteCustomer", async (req, res) => {
	const customer = await Customer.findOneAndDelete({ email: req.body.email })
	res.send(customer)
})

module.exports = router;
