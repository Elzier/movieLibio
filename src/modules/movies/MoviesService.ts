import { BASE_SEARCH_URL, ROTOR_URL } from './MoviesConst'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractMagnetFromQuery } from './MoviesUtils'

export const movieSearch = async (searchTerm: string) => {
    const searchResult = await axios.get(`${ BASE_SEARCH_URL }/${ searchTerm }`, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' }
    })

    const data = searchResult.data
    const $ = cheerio.load(data)

    const moviesData = $('#index tr').toArray()
    return moviesData.map(item => {

        const [_, magnetTag, title] = $(item).find('a').toArray()
        const magnetLink = $(magnetTag).attr('href')
        const torrentUrl = ROTOR_URL + $(title).attr('href')
        const magnet = extractMagnetFromQuery(magnetLink);

        return {
            magnet,
            magnetLink,
            title: $(title).text(),
            torrentUrl
        }
    }).filter(item => !!item.title)
}