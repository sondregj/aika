import { Response } from './data'

export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'CONNECT' | 'HEAD' | 'OPTIONS'

export interface Query {
    key: string
    value: string
}

export type Queries = Query[]

export type HTTPAction = (path: string, queries?: Queries, body?: string) => Promise<Response>

export { AikaMiddleware } from './middleware'
export { Request, Response, Headers, JSON } from './data'
