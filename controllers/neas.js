const neasQuerys = require('../models/neasQuerys')
const NeasModel = require('../models/neas')

const getAllNeas = async (req, res) => {
    const allNeas = await NeasModel.find({});
    res.status(200).json(allNeas);
}

const getNeasByQuery = async (req, res) => {
    const orbit_class = req.query.orbit_class
    if (orbit_class) {
        const result = await neasQuerys.getNeasByQuery(orbit_class)
        res.status(200).json(result);

    } else if (req.query.from||req.query.to){
        const { from, to } = req.query
        const result = await neasQuerys.getNeasBetweenDates(from, to)
        res.status(200).json(result);
    }else {
        res.status(400).json({msg:"Bad request"});
    }
}

const neas = {
    getAllNeas,
    getNeasByQuery
}

module.exports = neas