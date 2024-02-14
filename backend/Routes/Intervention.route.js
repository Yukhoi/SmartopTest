const express = require('express');
const router = express.Router();

const Intervention = require('../Models/Intervention.models');

router.get('/', async (req, res, next) => {
    try {
        const interventions = await Intervention.find();
        
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

            // Update counts for anesthetist, nurse, room, and procedure
            surgeon.favoriteAnesthetist[intervention.anesthsiste] = (surgeon.favoriteAnesthetist[intervention.anesthsiste] || 0) + 1;
            surgeon.favoriteNurse[intervention.nurse1] = (surgeon.favoriteNurse[intervention.nurse1] || 0) + 1;
            surgeon.favoriteNurse[intervention.nurse2] = (surgeon.favoriteNurse[intervention.nurse2] || 0) + 1;
            surgeon.mostFrequentRoom[intervention.roomNumber] = (surgeon.mostFrequentRoom[intervention.roomNumber] || 0) + 1;
            surgeon.mostFrequentProcedure[intervention.intervention] = (surgeon.mostFrequentProcedure[intervention.intervention] || 0) + 1;
        });

        console.log(surgeons);

        // Convert the counts to actual favorites/most frequent
        for (let surgeonName in surgeons) {
            let surgeon = surgeons[surgeonName];
            console.log(surgeon);
            surgeon.favoriteAnesthetist = Object.keys(surgeon.favoriteAnesthetist).reduce((a, b) => {
                if (a === "") {
                    return b;
                } else if (b === "") {
                    return a;
                } else {
                    return surgeon.favoriteAnesthetist[a] > surgeon.favoriteAnesthetist[b] ? a : b;
                }
            });
            surgeon.favoriteNurse = Object.keys(surgeon.favoriteNurse).reduce((a, b) =>  {
                if (a === "") {
                    return b;
                } else if (b === "") {
                    return a;
                } else {
                    return surgeon.favoriteNurse[a] > surgeon.favoriteNurse[b] ? a : b;
                }
            });
            surgeon.mostFrequentRoom = Object.keys(surgeon.mostFrequentRoom).reduce((a, b) => {
                if (a === "") {
                    return b;
                } else if (b === "") {
                    return a;
                } else {
                    return surgeon.mostFrequentRoom[a] > surgeon.mostFrequentRoom[b] ? a : b;
                }
            });
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

        res.send(surgeonsArray);
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const intervention = new Intervention(
            {
                surgeon: req.body.surgeon,
                specialty: req.body.specialty,
                anesthsiste: req.body.anesthsiste,
                nurse1: req.body.nurse1,
                nurse2: req.body.nurse2,
                roomNumber: req.body.roomNumber,
                intervention: req.body.intervention
            }
        );
        const result = await intervention.save();
        res.send(result);
        console.log('Post an intervention');
    } catch (error) {
        console.log(error.message);
        console.log('error');
    }
});

module.exports = router;