import express from 'express'
import * as process from 'process'
import cors from 'cors'
import logger from 'morgan'

// routes
import streamController from './modules/stream/StreamController'
import contentController from './modules/content/ContentController'
import moviesController from './modules/movies/MoviesController'

// middleware
const app = express();
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// endpoints
app.use('/stream', streamController)
app.use('/views', contentController)
app.use('/movies', moviesController)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('china')
    console.log(`http://localhost:${PORT}`)
})
