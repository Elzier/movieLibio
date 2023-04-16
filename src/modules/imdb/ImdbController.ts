import { Router } from 'express'
import * as imdbService from '../imdb/ImdbService'
import { GetMovieFromImdbRequest } from '../movies/interfaces/requests/GetMovieFromImdbRequest'
import { SearchRequest } from '../movies/interfaces/requests/SearchRequest'

const router = Router()

router.get('/imdb-search', async ({ query: { searchTerm } }: SearchRequest, res) => {
    try {
        const result = await imdbService.imdbSearch(searchTerm)
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/:imdbId', async ({ params: { imdbId } }: GetMovieFromImdbRequest, res) => {
    try {
        const result = await imdbService.imdbGetMovieById(imdbId)
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

export default router
