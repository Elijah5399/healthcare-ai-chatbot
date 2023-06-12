const express = require('express')

/* Creating Express App */
const expressApp = express()

/* Reacting to Requests */
expressApp.length('/', (request, response) => {
    response.json({msg: 'Welcome to the app'})
})

/* Listen for Requests */
expressApp.listen(4000, () => {
    console.log('listening on port 4000')
})