const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surgeonSchema = new Schema({
    name: {
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
    nurse: {
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

const Intervention = mongoose.model('Surgeon', surgeonSchema);
module.exports = Intervention;