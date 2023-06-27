const express = require("express")
const User = require("../models/UsersModel")

const router = express.Router()

/* Handling a POST request */
router.post("/submit", async (request, response) => { // request to access data being sent   
    const {name, email, password, id} = request.body
    
    try {
        const user = await User.create({name, email, password, id})
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})

module.exports = router