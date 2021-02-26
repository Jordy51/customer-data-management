const mongoose = require("mongoose");

const CustomFieldSchema = mongoose.Schema({
    fieldName: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    }
})

const CustomField = mongoose.model("CustomField", CustomFieldSchema)

module.exports = CustomField