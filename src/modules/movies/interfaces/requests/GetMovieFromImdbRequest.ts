import { Request } from 'express'

export interface GetMovieFromImdbRequest extends Request {
    params: { imdbId: string }
}
