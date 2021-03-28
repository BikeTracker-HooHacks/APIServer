const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to User endpoint!' });
});

router.post('/createUser', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    if(username && password){
        result = await db.createUser(username, password);
        res.send(result);
    }
    else{
        res.send("No username or password provided.");
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

module.exports = routes;
