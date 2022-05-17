const express = require('express');
const router = express.Router();
const landings = require('../controllers/landings');
const neas = require('../controllers/neas');

router.get('/astronomy/landings/', landings.getAllLandings);
router.get('/astronomy/landings/?', landings.getLandingsByQuery);
router.get('/astronomy/landings/mass/:mass', landings.getLandingsBySpecificMass);
router.get('/astronomy/landings/class/:class', landings.getLandingsByClass);

router.get('/astronomy/neas/', neas.getAllNeas);
router.get('/astronomy/neas/?', neas.getNeasByQuery);

module.exports = router;