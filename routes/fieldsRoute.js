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

const deleteField = async (Field, fieldName) => {
	return await Field.findOneAndDelete({ "fieldName": fieldName });
};

// /fields/createFields
router.get("/createFields", async (req, res) => {
	const toyFields = await ToyStoreCustomField.find({});
	const electronicsFields = await ElectronicsStoreCustomField.find({});
	res.render("createFields", { toyFields: toyFields, electronicsFields: electronicsFields });
});

router.post("/createFields", async (req, res) => {
	if (req.body.store === "ToyStore") {
		await createFields(ToyStoreCustomField, req.body);
	} else if (req.body.store === "ElectronicsStore") {
		await createFields(ElectronicsStoreCustomField, req.body);
	}
	res.redirect("/fields/createFields");
});

// /fields/updateFields
router.get("/updateFields", (req, res) => {
	res.redirect("/fields/createFields");
});

// /fields/deleteFields
router.get("/deleteField/:storeType/:fieldName", async (req, res) => {
	let deletedField;
	if (req.params.storeType == "toys") {
		deletedField = await deleteField(ToyStoreCustomField, req.params.fieldName);
	} else if (req.params.storeType == "electronics") {
		deletedField = await deleteField(ElectronicsStoreCustomField, req.params.fieldName);
	}
	res.redirect("/fields/createFields");
});

module.exports = router;
