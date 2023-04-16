import { Request } from 'express'
import { Movie } from '../Movie'

export interface CreateMovieRequest extends Request {
    body: Movie
}
