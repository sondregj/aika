import { Response } from './data'

export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'CONNECT' | 'HEAD' | 'OPTIONS'

export interface Query {
    [key: string]: string
}

export type HTTPAction = (path: string, query?: Query, body?: string) => Promise<Response>

export { AikaMiddleware } from './middleware'
export { Request, Response, Headers, JSON } from './data'
