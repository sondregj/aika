import { HTTPResponse } from '../helpers'

export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'CONNECT' | 'HEAD' | 'OPTIONS'

export interface Query {
    key: string
    value: string
}

export type Queries = Query[]

export type HTTPAction = (path: string, queries: Queries, body: string) => Promise<HTTPResponse>

export { AikaMiddleware } from './middleware'
export { IHTTPRequest, IHTTPResponse } from './helpers'
