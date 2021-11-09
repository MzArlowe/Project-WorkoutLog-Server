const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { WorkOutModel } = require("../models");

router.get('/workout', (req, res) => { //Injected as a middleware function, tt will check to see if the incoming request has a token for this specific route. Perfect if we have a controller where a specific number of routes needs to be restricted. 
    res.send('Workout Day 2 done!')
});

module.exports = router;