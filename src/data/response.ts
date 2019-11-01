import { Response as FetchResponse } from 'cross-fetch'

import { Headers, Response } from '../types'

interface ResponseOptions {
    status: number

    host: string
    path: string

    headers: Headers
    body?: string
}

export const makeFromFetch = () => {}

export const buildResponse = (options: ResponseOptions): Response => {
    const { status, host, path } = options

    // TODO Fix
    const headers = options.headers
    const body = options.body

    const json = body ? JSON.parse(body) : undefined
    const text = body ? body : ''

    return { status, host, path, headers, body, json, text }
}
