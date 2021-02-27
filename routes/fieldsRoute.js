const router = require("express").Router();

const { ToyStoreCustomField, ElectronicsStoreCustomField } = require("../models/CustomField");

router.get("/createFields", (req, res) => {
	res.render("createFields");
});

router.post("/createFields", async (req, res) => {
	const values = Object.values(req.body);

	const defaultFields = ["email", "name", "address", "phoneNumber", "dob", "store"];

	values.splice(1, 1);

	const x = values.length / 2;

	if (req.body.store === "ToyStore") {
		for (let i = 0; i < x; i++) {
			if (await ToyStoreCustomField.findOne({ fieldName: values[i] })) {
				res.send("THis Field already exist!");
			} else {
				let newField = new ToyStoreCustomField({
					fieldName: values[i],
					fieldType: values[i + x],
				});

				newField
					.save()
					.then(() => console.log("New Field Created for", req.body.store))
					.catch((err) => console.log(err));
			}
		}
	} else if (req.body.store === "ElectronicsStore") {
		for (let i = 0; i < x; i++) {
			if (await ElectronicsStoreCustomField.findOne({ fieldName: values[i] })) {
				res.send("THis Field already exist!");
			} else {
				let newField = new ElectronicsStoreCustomField({
					fieldName: values[i],
					fieldType: values[i + x],
				});

				newField
					.save()
					.then(() => console.log("New Field Created for", req.body.store))
					.catch((err) => console.log(err));
			}
		}
	}
	res.redirect("createFields");

	// for (let i = 0; i < x; i++) {
	// 	if (await ToyStoreCustomField.findOne({ fieldName: values[i] })) {
	// 		res.send("THis Field already exist!");
	// 	} else {
	// 		let newField = new ToyStoreCustomField({
	// 			fieldName: values[i],
	// 			fieldType: values[i + x],
	// 		});

	// 		newField
	// 			.save()
	// 			.then()
	// 			.catch((err) => console.log(err));
	// 	}
	// }
	// res.redirect("toyStoreFields");
});

router.delete("/deleteField", async (req, res) => {
	console.log(req.body.fieldName);

	const field = await ToyStoreCustomField.findOneAndDelete({ fieldName: req.body.fieldName });
	console.log("Deleted! ", field);

	res.redirect("toyStoreFields");
});

module.exports = router;
