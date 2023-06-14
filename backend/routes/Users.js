const express = require("express")

const router = express.Router()

router.get("/", (request, response) => {
    response.json({msg: "testing"})
})

/* Handling a SET appointment request */
router.get("/:id", (request, response) => { // request to access data being sent 
    response.json({msg: "get single user appts"})
})

/* Handling a DEL appointment request */
router.get("/:id", (request, response) => {
    response.json({msg: "delete single user appts"})
})

module.exports = router