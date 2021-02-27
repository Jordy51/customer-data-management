const mongoose = require("mongoose");

const CustomField = mongoose.Schema({
	fieldName: {
		type: String,
		required: true,
	},
	fieldType: {
		type: String,
		required: true,
	},
});

mongoose.model("CustomField", CustomField);

const ToyStoreCustomField = mongoose.model("ToyStoreCustomField", mongoose.Schema(CustomField));
const ElectronicsStoreCustomField = mongoose.model("ElectronicsStoreCustomField", mongoose.Schema(CustomField));

module.exports = { ToyStoreCustomField, ElectronicsStoreCustomField };
