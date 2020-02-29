const express = require('express')
// const connectDB = require('./config/db')
const config = require('config')
const mongoose = require('mongoose')
const db = config.get('mongoURI')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5250

try {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    console.log('Mongodb connected')
} catch(err) {
    console.error(err.message)

    process.exit(1)
}

app.use(express.json({extended: false}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use('/api/users', require('./routes/api/users'))
app.use('/api/games', require('./routes/api/games'))

app.listen(PORT, () => console.log('server started on port ' + PORT))