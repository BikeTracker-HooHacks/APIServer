const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to User endpoint!' });
});

module.exports = routes;
