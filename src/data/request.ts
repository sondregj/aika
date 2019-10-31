import { Headers, Request, JSON, HTTPVerb, Query } from '../types'

import { stringifyQuerystring } from '../utils'

interface RequestOptions {
    method: HTTPVerb

    host: string
    path?: string
    query?: Query

    headers?: Headers
    body?: JSON | string
}

export const buildRequest = (options: RequestOptions): Request => {
    const { method, host, path, query, headers, body } = options

    return {
        host,
        method,
        path: path || '',
        query: query || {},
        body,
        headers: headers || {},
    }
}
