import { Router } from 'express'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { parse } from 'qs'
import { SearchRequest } from './interfaces/SearchRequest'

const router = Router()

const ROTOR_URL = 'http://rutor.info'
const BASE_SEARCH_URL = ROTOR_URL + '/search/1/0/000/0'
const MAGNET_KEY = 'magnet:?xt'
const SPLIT_MAGNET_STRING = 'urn:btih:'

router.get('/search', async ({query: {searchTerm}}: SearchRequest, res) => {
    try {
        const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        })

        const data = searchResult.data
        const $ = cheerio.load(data)

        const moviesData = $('#index tr').toArray()
        const results = moviesData.map(item => {

            const [_, magnetTag, title] = $(item).find('a').toArray()
            const magnetLink = $(magnetTag).attr('href')
            const parsedMagnetLink = parse(magnetLink)
            const magnet = String(parsedMagnetLink[MAGNET_KEY]).replace(SPLIT_MAGNET_STRING, '')
            const torrentUrl = ROTOR_URL + $(title).attr('href')

            return {
                magnet,
                magnetLink,
                title: $(title).text(),
                torrentUrl
            }
        }).filter(item => !!item.title)
        res.status(200).send(results)

    } catch (err) {
        res.status(400).send(err)
    }
})

export default router
