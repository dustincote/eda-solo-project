const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');



// get to api/weather this will make a get request to open weather to get 
// the current weather conditions based off the latitude and longitude that the
// client sends over on req.params then we send the response back to the client
router.get('/:latitude/:longitude', (req, res) => {
    // console.log(process.env.OPEN_WEATHER_KEY)
    // console.log(req.params);
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OPEN_WEATHER_KEY}`)
        .then(result => res.send(result.data)).catch(e => {
            console.log('error getting weather', e);
            res.sendStatus(500);
        });
})






module.exports = router;