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
	},
	phoneNumber: {
		type: mongoose.Schema.Types.Number,
	},
	dob: {
		type: mongoose.Schema.Types.Date,
	},
});

mongoose.model("Customer", Customer);

const ToyStoreCustomer = mongoose.model("ToyStoreCustomer", mongoose.Schema(Customer));
const ElectronicsStoreCustomer = mongoose.model("ElectronicsStoreCustomer", mongoose.Schema(Customer));

module.exports = { ToyStoreCustomer, ElectronicsStoreCustomer };
