const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interventionSchema = new Schema({
    surgeon: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    anesthsiste: {
        type: String,
    },
    nurse1: {
        type: String,
    },
    nurse2: {
        type: String,
    },
    roomNumber: {
        type: Number,
        required: true
    },
    intervention: {
        type: String,
    }
});

const Intervention = mongoose.model('Intervention', interventionSchema);
module.exports = Intervention;