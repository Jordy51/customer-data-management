const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
	email: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	name: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	address: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	phoneNumber: {
		type: mongoose.Schema.Types.Number,
		required: true,
	},
	dob: {
		type: mongoose.Schema.Types.Date,
		required: true,
	},
});

mongoose.model("Customer", Customer);

const ToyStoreCustomer = mongoose.model("ToyStoreCustomer", mongoose.Schema(Customer, { strict: false }));
const ElectronicsStoreCustomer = mongoose.model("ElectronicsStoreCustomer", mongoose.Schema(Customer, { strict: false }));

module.exports = { ToyStoreCustomer, ElectronicsStoreCustomer };
