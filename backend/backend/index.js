const express = require('express')
const cors = require('cors')

const app = express()

const conn = require('./db/conn')

app.use(express.json())

app.use(cors({ credentials: true, origin: '*' }))

app.use(express.static('public'))

//Rotas
const UserRoutes = require('./routes/UserRoutes')
const ArmaRoutes = require('./routes/ArmaRoutes')
const MuniRoutes = require('./routes/MuniRoutes')

app.use('/users', UserRoutes)
app.use('/armas', ArmaRoutes)
app.use('/municoes', MuniRoutes)

conn
    .sync()
    .then(() => {
        app.listen(8080)
    })
    .catch((error) => console.log(error))
