const express = require("express")
const User = require("../models/UsersModel")

const router = express.Router()

/* Login */
router.post("/login", async (request, response) => {
    const {email, password} = request.body
    
    try {
        const user = await User.login(email, password)

        /* JSON Web Token */
        // token code here!

        response.status(200).json({user, token})
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})

/* Signup */
router.post("/signup", async (request, response) => {
    const {name, email, password} = request.body

    try {
        const user = await User.signup(name, email, password) // .signup() is a statically created function in UsersModel.js
        response.status(200).json({email, user})
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})


module.exports = router