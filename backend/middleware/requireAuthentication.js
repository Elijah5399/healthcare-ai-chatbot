const jwt = require("jsonwebtoken")
const User = require("../models/UsersModel")

const requireAuthentication = async (request, response, next) => {
    const { authorization } = request.headers

    if (!authorization) {
        return response.status(400).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        request.user = await User.findOne({ _id }).select("_id")
        next()
    } catch (error) {
        response.status(400).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuthentication