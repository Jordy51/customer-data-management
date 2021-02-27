const router = require("express").Router();
const { ToyStoreCustomer, ElectronicsStoreCustomer } = require("../models/Customer");
const { ToyStoreCustomField, ElectronicsStoreCustomField } = require("../models/CustomField");

const createCustomer = async (Customer, body) => {
	const { email } = body;

	// No need to store StoreName
	delete body.store;

	if (await Customer.findOne({ email: email })) {
		return -1;
	} else {
		const newCustomer = new Customer({
			...body,
		});
		
		newCustomer
			.save()
			.then(() => {
				return newCustomer;
			})
			.catch((err) => console.log(err));
	}
};

const deleteCustomer = async (Customer, email) => {
	await Customer.findOneAndDelete({ email: email });
};

router.get("/toyStore", async (req, res) => {
	const customers = await ToyStoreCustomer.find({});
	res.send("Toy Store Customer View Page", { customers: customers });
});

router.get("/electronicsStore", async (req, res) => {
	const customers = await ElectronicsStoreCustomer.find({});
	res.send("Electronics Store Customer View Page", { customers: customers });
});

// /customer/createCustomer *** ***
router.get("/createCustomer", async (req, res) => {
	const fields = await ToyStoreCustomField.find({});
	res.render("createCustomer", { fields: fields });
});

router.post("/createCustomer", async (req, res) => {
	const { store } = req.body;
	if (store === "ToyStore") {
		const newCustomer = createCustomer(ToyStoreCustomer, req.body);
		if (!newCustomer) {
			res.send("Email Already Exists!");
		}
	} else if (store === "ElectronicsStore") {
		const newCustomer = createCustomer(ElectronicsStoreCustomer, req.body);
		if (!newCustomer) {
			res.send("Email Already Exists!");
		}
	}
	res.render("index");
});

// /customer/deleteCustomer
router.post("/deleteCustomer", async (req, res) => {
	if (req.body.store === "ToyStore") {
		deleteCustomer(ToyStoreCustomer, req.body.email);
		res.redirect("index");
	} else if (req.body.store === "ElectronicsStore") {
		deleteCustomer(ElectronicsStoreCustomer, req.body.email);
		res.redirect("index");
	}
});

module.exports = router;
