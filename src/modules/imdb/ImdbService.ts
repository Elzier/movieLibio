import axios from 'axios'
import { stringify } from 'qs'
import { BASE_IMDB_SEARCH_URL } from '../movies/MoviesConst'

export const imdbSearch = async (searchTerm: string) => {
    const searchParams = stringify({
        language: 'en-US',
        api_key: '28729e52144dd221b72ed89247daade8',
        query: searchTerm
    })

    const searchResult = await axios.get(`${BASE_IMDB_SEARCH_URL}/search/movie?${searchParams}`, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' }
    })

    const { data: { results } } = searchResult;
    const [ movie ] = results;

    return movie;
}

export const imdbGetMovieById = async (imdbId: string) => {
    const params = stringify({
        language: 'en-US',
        api_key: '28729e52144dd221b72ed89247daade8',
    })

    const result = await axios.get(`${BASE_IMDB_SEARCH_URL}/movie/${imdbId}?${params}`, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' }
    })

    return result.data;
}