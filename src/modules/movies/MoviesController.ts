import { Router } from 'express'
import { SearchRequest } from './interfaces/requests/SearchRequest'
import { DeleteMovieRequest } from './interfaces/requests/DeleteMovieRequest'
import * as moviesService from './MoviesService'

const router = Router()

router.get('/search', async ({ query: { searchTerm }}: SearchRequest, res) => {
    try {
        const movie = await moviesService.movieSearch(searchTerm)
        res.status(200).send(movie)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/', async (_, res) => {
    try {
        const results = await moviesService.findAll()
        console.log(results, 'results results results results results')
        res.status(200).send(results)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/', async ({ params: { id }}: DeleteMovieRequest, res) => {
    try {
        const results = await moviesService.deleteOne(id)
        console.log(results, 'results results results results results')
        res.status(200).send(results)
    } catch (err) {
        res.status(400).send(err)
    }
})

export default router
