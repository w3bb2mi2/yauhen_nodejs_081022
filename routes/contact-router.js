const express = require("express")
const router = express.Router()
const createPath = require("../helpers/create-path")
const Contact = require("../models/contacts")

router.get("/contacts", (req, res) => {
    Contact
        .find()
        .then((contacts) => res.render(createPath("contacts"), { contacts }))
        .catch(error => {
            console.log(error);
            res.render(createPath("error"))
        })
});

module.exports = router;