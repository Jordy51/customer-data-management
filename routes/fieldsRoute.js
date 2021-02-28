const router = require("express").Router();

const { ToyStoreCustomField, ElectronicsStoreCustomField } = require("../models/CustomField");

const createFields = async (Field, body) => {
	const defaultFields = ["email", "name", "address", "phoneNumber", "dob", "store"];

	delete body.store;
	const values = Object.values(body);
	const x = values.length / 2;

	if ((await Field.countDocuments({})) + (defaultFields.length - 1) === 20) {
		res.send("No more fields allowed!");
	}

	for (let i = 0; i < x; i++) {
		if ((await Field.findOne({ fieldName: values[i] })) || defaultFields.indexOf(values[i]) != -1) {
			return -1;
		} else {
			let newField = new Field({
				fieldName: values[i],
				fieldType: values[i + x],
			});
			newField
				.save()
				.then(() => console.log("New Field Created"))
				.catch((err) => console.log(err));
		}
	}
};

const deleteField = async (Field) => {
	return await Field.findOneAndDelete({});
};

// /fields/createFields
router.get("/createFields", async (req, res) => {
	const toyFields = await ToyStoreCustomField.find({});
	const electronicsFields = await ElectronicsStoreCustomField.find({});
	res.render("createFields", { toyFields: toyFields, electronicsFields: electronicsFields });
});

router.post("/createFields", (req, res) => {
	if (req.body.store === "ToyStore") {
		createFields(ToyStoreCustomField, req.body);
	} else if (req.body.store === "ElectronicsStore") {
		createFields(ElectronicsStoreCustomField, req.body);
	}
	res.redirect("createFields");
});

// /fields/updateFields
router.get("/updateFields", (req, res) => {
	res.redirect("createFields");
});

// /fields/deleteFields
router.delete("/deleteField", (req, res) => {
	let deletedField;

	if (res.body.store == "ToyStore") {
		deletedField = deleteField(ToyStoreCustomField, req.body);
	} else if (req.body.store === "ElectronicsStore") {
		deletedField = deleteField(ElectronicsStoreCustomField, req.body);
	}
	console.log("Deleted!", deletedField);
	res.redirect("createFields");
});

module.exports = router;
