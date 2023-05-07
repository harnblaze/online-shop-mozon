const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
}));
app.use('/api', routes)


const PORT = config.get('port') ?? 8080

const start = async () => {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log('mongoDB connected')
        app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}`)))
    } catch (e) {
        console.log(chalk.red('Error', e.message))
        process.exit(1)
    }
}

start()
