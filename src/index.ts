import express from 'express'
import * as process from 'process'
import cors from 'cors'
import logger from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'

// routes
import streamController from './modules/stream/StreamController'
import contentController from './modules/content/ContentController'
import moviesController from './modules/movies/MoviesController'
import imdbController from './modules/imdb/ImdbController'


try {
    console.log(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Database connected')
    })
} catch (err) {
    console.error('Connection to  mongoDB failed', err)
    throw err;
}

// middleware
const app = express();
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// endpoints
app.use('/stream', streamController)
app.use('/views', contentController)
app.use('/movies', moviesController)
app.use('/imdb', imdbController)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('china')
    console.log(`http://localhost:${PORT}`)
})
