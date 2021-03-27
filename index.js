
const express = require('express')
const gpsRoutes = require('./routes/gps')
const userRoutes = require('./routes/user')
const trackerRoutes = require('./routes/tracker')
require('dotenv').config()

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/gps', gpsRoutes);
app.use('/user', userRoutes);
app.use('/tracker', trackerRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
