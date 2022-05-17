const res = require('express/lib/response')
const LandingModel = require('../models/landings')
const landingModules = require('../models/landingsQuerys')
require('mongoose');

const getAllLandings = async (req, res) => {
    const allLandings = await LandingModel.find({}); // finds all landings in db
    res.status(200).json(allLandings);
}

const getLandingsByQuery = async (req, res) => {
    const mass = parseInt(req.query.mass)
    const { from, to } = req.query;
    if (mass) {
        try {
            const landings = await landingModules.getLandingsAboveSpecificMass(mass);
            res.status(200).json(landings)
        } catch (err) {
            res.status(400).json({ msg: err })
        }

    } else if (from || to) {
        try {
            const result = await landingModules.getLandingsBetweenDates(from, to)
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json({ msg: "Bad Request" })
            throw err
        }

    }else{
        res.status(400).json({msg:"Bad request"})
    }
}

const getLandingsBySpecificMass = async (req, res) => {
    try {
        const mass = parseInt(req.params.mass)
        const filter = { mass: mass }
        const query = await LandingModel.find(filter).exec();
        if (query == 0) {
            res.status(200).json({ msg: "No landings for the mass provided" })
        } else {
            res.status(200).json(query)
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

const getLandingsByClass = async (req, res) => {
    try {
        const recclass = req.params.class
        const filter = { recclass: recclass }
        const query = await LandingModel.find(filter).exec();
        if (query == 0) {
            res.status(200).json({ msg: "No landings for the class provided" })
        } else {
            res.status(200).json(query)
        }
    } catch (err) {
        res.status(400).json({ msg: "Bad Request" })
        throw err
    }
}

const controllers = {
    getAllLandings,
    getLandingsByQuery,
    getLandingsBySpecificMass,
    getLandingsByClass
}

module.exports = controllers