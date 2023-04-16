import { Request } from 'express'
import { Movie } from '../Movie'

export interface DeleteMovieRequest extends Request {
    params: { id: string }
}
