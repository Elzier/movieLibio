import { parse } from 'qs'
import { MAGNET_KEY, SPLIT_MAGNET_STRING } from './MoviesConst'

export const extractMagnetFromQuery = (magnetLink: string) => {
    const parsedMagnetLink = parse(magnetLink)
    return String(parsedMagnetLink[MAGNET_KEY]).replace(SPLIT_MAGNET_STRING, '')
}