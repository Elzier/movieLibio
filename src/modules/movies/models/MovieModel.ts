import { model, Schema } from 'mongoose'
import { Movie } from '../interfaces/Movie'


const entity = new Schema<Movie>({
    title: {
        type: String,
        default: ''
    },
    plot: {
        type: String,
        default: ''
    },
    magnet: {
        type: String,
        default: ''
    },
    sourceUrl: {
        type: String,
        default: ''
    },
    filename: {
        type: String,
        default: ''
    },
    year: {
        type: String,
        default: ''
    },
    director: {
        type: String,
        default: ''
    },
    posterUrl: {
        type: String,
        default: ''
    },
    trailerUrl: {
        type: String,
        default: ''
    },
    boxOffice: {
        type: String,
        default: ''
    },
    released: {
        type: String,
        default: ''
    },
    writer: {
        type: String,
        default: ''
    },
    runtime: {
        type: String,
        default: ''
    },
    ratingImdb: {
        type: String,
        default: ''
    },
    imdbId: {
        type: String,
        default: ''
    },
    rated: {
        type: String,
        default: ''
    },
    actors: [{
        type: String,
        default: ''
    }],
    genres: [{
        type: String,
        default: ''
    }]
})

entity.index({
    title: 'text',
    writter: 'text'
})

export default model('movie', entity)