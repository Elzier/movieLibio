import { Router } from 'express'
import { SearchRequest } from './interfaces/SearchRequest'
import {movieSearch} from "./MoviesService";

const router = Router()

const ROTOR_URL = 'http://rutor.info'

router.get('/search', async ({query: {searchTerm}}: SearchRequest, res) => {
    try {
        const results = await movieSearch(searchTerm);
        res.status(200).send(results)
    } catch (err) {
        res.status(400).send(err)
    }
})

export default router
