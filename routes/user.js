const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to User endpoint!' });
});

router.post('/create', async (req, res) => {
    username = req.body.username;
    fullname = req.body.name;
    password = req.body.password;

    if (username && password && fullname) {
        result = await db.createUser(username, fullname, password);
        res.send(result);
    } else {
        res.status(400);
        res.send( { error: "Username, password, or name not provided." } );
    }
});

router.post('/login', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    console.log(JSON.stringify(req.body));
    console.log(username + ':' + password);
    if (username && password) {
        result = await db.signIn(username, password, req);
        res.send(result);
    } else {
        res.status(403);
        res.send( { error: 'Invalid credentials provided.' } );
    }

});

router.post('/logout', async (req, res) => {
    req.session.destroy( (err) =>{
        if (err) {
            res.send( {"error": "Could not sign out."} );
        } else {
            req.session = null;
            res.send( {"success": true} );
        }
    });  
})

module.exports = router;
