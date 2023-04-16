import { Request } from 'express'
import { Movie } from '../Movie'

export interface UpdateMovieRequest extends Request {
    body: Partial<Movie>,
    params: { id: string }
}
