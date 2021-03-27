
const express = require('express')
const gpsRoutes = require('./gps')
const userRoutes = require('./user')
const trackerRoutes = require('./tracker')

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/gps', gpsRoutes);

app.use('/user', userRoutes);

app.use('/tracker', trackerRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
