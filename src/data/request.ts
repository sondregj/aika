import { Headers, Request, JSON, HTTPVerb, Queries } from '../types'

import { stringifyQuerystring } from '../utils'

interface RequestOptions {
    method: HTTPVerb

    host: string
    path?: string
    queries?: Queries

    headers?: Headers
    body?: JSON | string
}

export const buildRequest = (options: RequestOptions): Request => {
    const { method, host, path, queries, headers, body } = options

    const pathWithQuery = `${path}${queries ? '?' + stringifyQuerystring(queries) : ''}`
    const bodyString = body ? (typeof body === 'object' ? JSON.stringify(body) : body) : undefined

    return {
        host,
        method,
        path: pathWithQuery,
        body: bodyString,
        headers: headers || {},
    }
}
