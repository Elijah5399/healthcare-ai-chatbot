const mongoose = require("mongoose")
const Schema = mongoose.Schema // a schema defines the structure of a type of document inside the database

const apptSchema = new Schema({
    epochValue: {
        type: Number, // number of seconds or milliseconds that have elapsed since epoch
        required: true
    }
}, { timestamps: true })

// creating an appointments model which allows interaction with the Appointments collection based off the specific schema
// e.g. Appointment.find()
const Appointment = mongoose.model("Appointment", apptSchema) // name of the model usually in singular (pluralisation occurs automatically and the collection is searched for)

module.exports = Appointment