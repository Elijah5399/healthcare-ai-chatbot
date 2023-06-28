const express = require("express")

const router = express.Router()

/* Handling a DELETE request */
router.get("/:id", (request, response) => {
    response.json({msg: "delete single user appts"})
})

module.exports = router