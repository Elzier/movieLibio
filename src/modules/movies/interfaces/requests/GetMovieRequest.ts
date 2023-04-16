import { Request } from 'express'

export interface GetMovieRequest extends Request {
    params: { id: string }
}
