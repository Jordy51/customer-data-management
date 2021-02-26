const router = require("express").Router();

const CustomField = require("../models/CustomFieldSchema")

router.get("/toyStoreFields", (req, res) => {
    res.render("toyStoreFields")
})

router.post("/createNewField", (req, res) => {
    console.log(Object.values(req.body))

    const x = Object.keys(req.body).length/2

    for(let i=0; i<x; i++){
        let newField = new CustomField({
            fieldName: Object.values(req.body)[i],
            fieldType: Object.values(req.body)[i+x]
        })

        newField.save().then().catch((err) =>console.log(err))
    }
    res.redirect("toyStoreFields")
})

router.delete("/deleteField", async (req, res) => {
    console.log(req.body.fieldName)

    const field = await CustomField.findOneAndDelete({fieldName:req.body.fieldName})
    console.log("Deleted! ", field)

    res.redirect("toyStoreFields")
})

module.exports = router;
