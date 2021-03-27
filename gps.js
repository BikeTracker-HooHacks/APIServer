const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to GPS endpoint!' });
});

module.exports = routes;
