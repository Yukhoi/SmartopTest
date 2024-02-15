const express = require('express');
const router = express.Router();

// Import the Intervention model
const Intervention = require('../Models/Intervention.models');

// Get all interventions
router.get('/', async (req, res, next) => {
    try {
        const interventions = await Intervention.find();
        
        let surgeonsArray = interventionToSurgeon(interventions);

        res.send(surgeonsArray);
    } catch (error) {
        console.log(error.message);
    }
});

// Get all interventions for specific surgeons
router.get('/:name', async (req, res, next) => {
    try {
        const surgeonName = req.params.name;
        const regex = new RegExp(surgeonName, 'i');
        const interventions = await Intervention.find({ surgeon: { $regex: regex } });

        let surgeonsArray = interventionToSurgeon(interventions);

        res.send(surgeonsArray);
    } catch (error) {
        console.log(error.message);
    }
});

/**
 * Converts an array of interventions into a surgeon data object.
 * @param {Array} interventions - The array of interventions.
 */
function interventionToSurgeon(interventions) {
    // Create an empty object to store surgeon data
    let surgeons = {};

    // Iterate over each intervention
    interventions.forEach(intervention => {
        // If the surgeon doesn't exist in the object, add them
        if (!surgeons[intervention.surgeon]) {
            surgeons[intervention.surgeon] = {
                name: intervention.surgeon,
                specialty: intervention.specialty,
                interventionCount: 0,
                favoriteAnesthetist: {},
                favoriteNurse: {},
                mostFrequentRoom: {},
                mostFrequentProcedure: {}
            };
        }

        let surgeon = surgeons[intervention.surgeon];

        // Increment the intervention count
        surgeon.interventionCount++;
        // Update counts for anesthetist
        surgeon.favoriteAnesthetist[intervention.anesthsiste] = (surgeon.favoriteAnesthetist[intervention.anesthsiste] || 0) + 1;
        // Update counts for nurse 1 and nurse 2
        surgeon.favoriteNurse[intervention.nurse1] = (surgeon.favoriteNurse[intervention.nurse1] || 0) + 1;
        surgeon.favoriteNurse[intervention.nurse2] = (surgeon.favoriteNurse[intervention.nurse2] || 0) + 1;
        // Update counts for room number
        surgeon.mostFrequentRoom[intervention.roomNumber] = (surgeon.mostFrequentRoom[intervention.roomNumber] || 0) + 1;
        // Update counts for procedure
        surgeon.mostFrequentProcedure[intervention.intervention] = (surgeon.mostFrequentProcedure[intervention.intervention] || 0) + 1;
    });

    // Convert the counts to actual favorites/most frequent
    for (let surgeonName in surgeons) {
        let surgeon = surgeons[surgeonName];
        // Convert the counts to actual favorites anesthetist
        surgeon.favoriteAnesthetist = Object.keys(surgeon.favoriteAnesthetist).reduce((a, b) => {
            if (a === "") {
                return b;
            } else if (b === "") {
                return a;
            } else {
                return surgeon.favoriteAnesthetist[a] > surgeon.favoriteAnesthetist[b] ? a : b;
            }
        });
        // Convert the counts to actual favorites nurse
        surgeon.favoriteNurse = Object.keys(surgeon.favoriteNurse).reduce((a, b) =>  {
            if (a === "") {
                return b;
            } else if (b === "") {
                return a;
            } else {
                return surgeon.favoriteNurse[a] > surgeon.favoriteNurse[b] ? a : b;
            }
        });
        // Convert the counts to actual most frequent room
        surgeon.mostFrequentRoom = Object.keys(surgeon.mostFrequentRoom).reduce((a, b) => {
            if (a === "") {
                return b;
            } else if (b === "") {
                return a;
            } else {
                return surgeon.mostFrequentRoom[a] > surgeon.mostFrequentRoom[b] ? a : b;
            }
        });
        // Convert the counts to actual most frequent procedure
        surgeon.mostFrequentProcedure = Object.keys(surgeon.mostFrequentProcedure).reduce((a, b) => {
            if (a === "") {
                return b;
            } else if (b === "") {
                return a;
            } else {
                return surgeon.mostFrequentProcedure[a] > surgeon.mostFrequentProcedure[b] ? a : b;
            }
        });
    }

    console.log(surgeons);

    // Convert the surgeons object to an array
    let surgeonsArray = Object.values(surgeons);

    // Sort the array by intervention count
    surgeonsArray.sort((a, b) => b.interventionCount - a.interventionCount);

    return surgeonsArray;
}

module.exports = router;