const mongoose = require('mongoose');
const Pax = require('../models/Pax.model')
const Ngo = require('../models/Ngo.model')

require('../db/index')

const paxes = [
    { adults: 3, children: 0 },
    { adults: 1, children: 2 },
    { adults: 3, children: 4 }
]

const ngo = [
    {
        name: "Manos Unidas",
        email: "mnsnds@hands.com",
        cif: "32432fewfsf",
        password: 1234,
    }
]

Pax.create(paxes)
    .then(paxOnDB => {
        console.log(`We have created ${paxOnDB.length} pax`);

    })
    .catch((err) => console.log("Error creating pax", err));

Ngo.create(ngo)
    .then(ngoOnDb => {
        console.log(`We have created ${ngoOnDb.length} ngo`);
    })
    .catch((err) => console.log("Error creating pax", err));
