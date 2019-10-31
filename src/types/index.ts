import { Response } from '../helpers'

export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'CONNECT' | 'HEAD' | 'OPTIONS'

export interface Query {
    key: string
    value: string
}

export type Queries = Query[]

export type HTTPAction = (path: string, queries: Queries, body: string) => Promise<Response>

export { AikaMiddleware } from './middleware'
export { IRequest, IResponse } from './helpers'
