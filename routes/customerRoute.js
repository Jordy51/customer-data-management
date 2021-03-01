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

const deleteCustomer = async (Customer, id) => {
	return;
};

// /customer/
router.get("/", async (req, res) => {
	let toyCustomers = await ToyStoreCustomer.find({});
	let electronicCustomers = await ElectronicsStoreCustomer.find({});
	res.render("customersView", { toyCustomers, electronicCustomers });
});

// /customer/details
router.get("/details/:id", async (req, res) => {
	let customer;
	customer = await ToyStoreCustomer.findById({ _id: req.params.id });
	if (!customer) {
		customer = await ElectronicsStoreCustomer.findById({ _id: req.params.id });
	}

	customers = customer["_doc"];
	id = customers._id;
	delete customers._id;
	delete customers.__v;

	res.render("customerDetails", { customer: customer["_doc"], customerId: id });
});

// /customer/createCustomer *** ***
router.get("/createCustomer", async (req, res) => {
	const toyFields = await ToyStoreCustomField.find({});
	const electronicsFields = await ElectronicsStoreCustomField.find({});
	res.render("createCustomer", { toyFields: toyFields, electronicsFields: electronicsFields });
});

router.post("/createCustomer", (req, res) => {
	const { store } = req.body;
	let newCustomer;
	if (store === "ToyStore") {
		newCustomer = createCustomer(ToyStoreCustomer, req.body);
	} else if (store === "ElectronicsStore") {
		newCustomer = createCustomer(ElectronicsStoreCustomer, req.body);
	}
	if (!newCustomer) {
		res.send("Email Already Exists!");
	}
	res.redirect("/customers/");
});

// /customers/deleteCustomer
router.get("/deleteCustomer/:id", async (req, res) => {
	let deletedCustomer = await ToyStoreCustomer.findByIdAndDelete({ _id: id });
	if (!deletedCustomer) {
		deletedCustomer = await ElectronicsStoreCustomer.findByIdAndDelete({ _id: id });
	}
	res.redirect("/customers/");
});

module.exports = router;
