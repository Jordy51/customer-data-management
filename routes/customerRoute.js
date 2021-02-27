const router = require("express").Router();
const { ToyStoreCustomer, ElectronicsStoreCustomer } = require("../models/Customer");
const { ToyStoreCustomField, ElectronicsStoreCustomField } = require("../models/CustomField");

// const createCustomer  = (Customer, body) => {
// 	const { email, name, address, phoneNumber, dob } = body;
// 	console.log(req.body);
// 	if (await Customer.findOne({ email: email })) {
// 		res.send("Email already exists!");
// 	} else {
// 		const newCustomer = new Customers({
// 			email,
// 			name,
// 			phoneNumber,
// 			address,
// 			dob: Date(dob),
// 		});

// 		newCustomer
// 			.save()
// 			.then(() => {
// 				res.send("New Customer created" + newCustomer);
// 			})
// 			.catch((err) => console.log(err));
// 	}
// }

router.get("/toyStore", async (req, res) => {
	const customers = await ToyStoreCustomer.find({});
	res.send("Toy Store Customer View Page", { customers: customers });
});

router.get("/electronicsStore", async (req, res) => {
	const customers = await ElectronicsStoreCustomer.find({});
	res.send("Electronics Store Customer View Page", { customers: customers });
});

router.get("/createCustomer", async (req, res) => {
	const fields = await ToyStoreCustomField.find({});
	res.render("createCustomer", { fields: fields });
});

router.post("/createCustomer", async (req, res) => {
	const { email, name, address, phoneNumber, dob, store } = req.body;

	console.log(req.body);

	console.log(store === "ElectronicsStore");

	if (store === "ToyStore") {
		// createCustomer(ToyStoreCustomer, req.body)

		if (await ToyStoreCustomer.findOne({ email: email })) {
			res.send("Email already exists!");
		} else {
			const newCustomer = new ToyStoreCustomer({
				email,
				name,
				phoneNumber,
				address,
				dob: Date(dob),
			});

			newCustomer
				.save()
				.then(() => {
					res.send("New Customer created" + newCustomer);
				})
				.catch((err) => console.log(err));
		}
	} else if (store === "ElectronicsStore") {
		console.log("ElectronicsStore");
		// createCustomer(ElectronicsStoreCustomer, req.body)

		if (await ElectronicsStoreCustomer.findOne({ email: email })) {
			res.send("Email already exists!");
		} else {
			const newCustomer = new ElectronicsStoreCustomer({
				email,
				name,
				phoneNumber,
				address,
				dob: Date(dob),
			});

			newCustomer
				.save()
				.then(() => {
					res.send("New Customer created" + newCustomer);
				})
				.catch((err) => console.log(err));
		}
	}
});

router.post("/deleteCustomer", async (req, res) => {
	if (req.body.store === "ToyStore") {
		const customer = await ToyStoreCustomer.findOneAndDelete({ email: req.body.email });
		res.send(customer);
	} else if (req.body.store === "ElectronicsStore") {
		const customer = await ElectronicsStoreCustomer.findOneAndDelete({ email: req.body.email });
		res.send(customer);
	}
});

module.exports = router;
