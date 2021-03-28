const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to User endpoint!' });
});

router.post('/createUser', async (req, res) => {
    username = req.body.username;
    fullname = req.body.name;
    password = req.body.password;

    if(username && password && fullname){
        result = await db.createUser(username, fullname, password);
        res.send(result);
    }
    else{
        res.send("Username, password, or name not provided.");
    }
})

router.post('/signin', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    if(username && password){
        result = await db.signIn(username, password, req)
        res.send(result);
    }

})

router.post('/signout', async (req, res) => {
    req.session.destroy( (err) =>{
        if (err) res.send( {"error": "Could not sign out."} );
        else{
            req.session = null;
            res.send( {"success": true} );
        }
    });  
})

module.exports = router;
