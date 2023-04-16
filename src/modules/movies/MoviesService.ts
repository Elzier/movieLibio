import axios from 'axios'
import * as cheerio from 'cheerio'
import MovieModel from './models/MovieModel'
import { BASE_SEARCH_URL, ROTOR_URL } from './MoviesConst'
import { extractMagnetFromQuery } from './utils/MoviesUtils'
import { Movie } from './interfaces/Movie'

export const movieSearch = async (searchTerm: string) => {
    const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`, {
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

export const create = async (input: Movie) => {
    const item = new MovieModel(input)
    await item.save()
    return item;
}

export const update = async (input: Partial<Movie>, id: string) => {
    return MovieModel.findByIdAndUpdate(id, input, { new: true })
}

export const findOne = (id: string) => MovieModel.findById(id)
export const findAll = () => MovieModel.find()
export const deleteOne = (id: string) => MovieModel.findByIdAndRemove(id)
