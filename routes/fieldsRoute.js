const router = require("express").Router();

const { ToyStoreCustomField, ElectronicsStoreCustomField } = require("../models/CustomField");

const createFields = async (Field, body) => {
	delete body.store;
	const values = Object.values(body);
	console.log(values);
	const x = values.length / 2;

	for (let i = 0; i < x; i++) {
		if (await Field.findOne({ fieldName: values[i] })) {
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

router.get("/createFields", (req, res) => {
	res.render("createFields");
});

router.post("/createFields", async (req, res) => {
	const defaultFields = ["email", "name", "address", "phoneNumber", "dob", "store"];

	if (req.body.store === "ToyStore") {
		createFields(ToyStoreCustomField, req.body);
	} else if (req.body.store === "ElectronicsStore") {
		createFields(ElectronicsStoreCustomField, req.body);
	}
	res.redirect("createFields");
});

router.delete("/deleteField", async (req, res) => {
	const field = await ToyStoreCustomField.findOneAndDelete({ fieldName: req.body.fieldName });
	console.log("Deleted! ", field);
	res.redirect("toyStoreFields");
});

module.exports = router;
