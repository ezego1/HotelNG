const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json())

const db = config.get('mongoURL')

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log(err))

app.use('/api/user', require('./routes/api/user'))
app.use('/api/subject', require('./routes/api/subject'))
app.use('/api/auth', require('./routes/api/auth'))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server started on port ${port}`))
