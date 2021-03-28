const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to GPS endpoint!' });
});

router.post("/data", (req, res) => {
    // Try to read in request body as json.
    let parsed = {};
    try {
        let reqMAC = req.body.mac;
        let reqDate = req.body.date;
        let reqTime = req.body.time;
        let reqLat = req.body.lat;
        let reqLng = req.body.lng;
        const jsDate = new Date(reqDate + "T" + reqTime+"Z");
        console.log(jsDate.getTime() / 1000);
        res.status(200);
        res.send({"time": jsDate.getTime() / 1000});
    } catch(e) {
        console.log("Failed to parse data!" + e);
        res.status(400)
        res.send({"error":"Bad data"})
    }
});

module.exports = router;
