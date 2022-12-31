import { Request } from 'express'

export interface StreamRequest extends Request {
    params: {
        magnet: string,
        fileName: string
    }
    headers: {
        range: string
    }
}
