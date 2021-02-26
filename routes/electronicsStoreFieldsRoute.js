const router = require("express").Router();

router.get("electronicsStoreFieldsList", (req, res) => {
    res.render("electronicsStoreFieldsList")
})

module.exports = router;
