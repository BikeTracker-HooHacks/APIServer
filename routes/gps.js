const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to GPS endpoint!' });
});

router.post("/data", (req, res) => {
    // Try to read in request body as json.
    let parsed = {};
    try{
        let id = req.body.mac;
        let reqdate = req.body.date;
        let reqtime = req.body.time;
        let reqlat = req.body.lat;
        let reqlong = req.body.long;
        const jsdate = new Date(reqdate + "T" + reqtime+"Z");
        console.log(jsdate.getTime()/1000)
        res.send({"time": jsdate.getTime()/1000}) 
    }catch(e){
        console.log(e);
        res.send({"error":"Bad data"})
    }
})

module.exports = router;
