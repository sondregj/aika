import { Headers, Request, JSON, HTTPVerb, Query } from '../types'

import { stringifyQuerystring } from '../utils'
import { jsxOpeningElement } from '@babel/types'

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
        body: typeof body === 'object' ? JSON.stringify(body) : body,
        headers: headers || {},
    }
}
