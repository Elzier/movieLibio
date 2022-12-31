import { Router, Response, Request, NextFunction } from 'express'
import WebTorrent, { Torrent, TorrentFile } from 'webtorrent'
import { StreamError } from './interfaces/StreamError'
import { StreamRequest } from './interfaces/StreamRequest'

const router = Router()
const client = new WebTorrent()

let state = {
    progress: 0,
    downloadSpeed: 0,
    ratio: 0
}

let error
client.on('error', (err: Error) => {
    error = err.message
    console.error(error)
})

client.on('torrent', () => {
    console.log(client.progress, 'client progress')
    state = {
        progress: Math.round(client.progress * 100 * 100) / 100,
        downloadSpeed: client.downloadSpeed,
        ratio: client.ratio
    }
})

router.get('/add/:magnet', (req: StreamRequest, res: Response) => {
    const magnet = req.params.magnet

    client.add(magnet, (torrent) => {
        const files = torrent.files.map(data => ({
            name: data.name,
            length: data.length
        }))

        res.status(200).send(files)
    })
})

router.get('/stats', (req: StreamRequest, res: Response) => {
    state = {
        progress: Math.round(client.progress * 100 * 100) / 100,
        downloadSpeed: client.downloadSpeed,
        ratio: client.ratio
    }
    res.status(200).send(state)
})

router.get('/:magnet/:fileName', (req: StreamRequest, res: Response, next: NextFunction) => {
    const {
        params: { magnet, fileName },
        headers: { range }
    } = req

    if (!range) {
        const err = new Error('Range is not defined, please make request from HTML5 Player') as StreamError
        err.status = 416
        return next(err)
    }

    const torrentFile = client.get(magnet) as Torrent
    let file = <TorrentFile>{}

    for (let i = 0; i < torrentFile.files.length; i++) {
        const currentTorrentPiece = torrentFile.files[i]
        if (currentTorrentPiece.name === fileName) {
            file = currentTorrentPiece
        }
    }

    const fileSize = file.length
    const [startParsed, endParsed] = range.replace(/bytes=/, '').split('-')
    const start = Number(startParsed)
    const end = endParsed ? Number(endParsed) : fileSize - 1

    const chunkSize = end - start + 1
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers)

    const streamPositions = { start, end }
    const stream = file.createReadStream(streamPositions)
    stream.pipe(res)

    stream.on('error', (err) => next(err))
})

export default router
