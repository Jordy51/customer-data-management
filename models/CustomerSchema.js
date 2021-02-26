const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
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
	DOB: {
		type: mongoose.Schema.Types.Date,
	},
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
