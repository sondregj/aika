import { Response as FetchResponse } from 'cross-fetch'

import { Headers, Response, JSON } from '../types'

interface ResponseOptions {
    status: number

    host: string
    path: string

    headers: Headers
    body?: string
}

export const makeFromFetch = () => {}

export const buildResponse = (options: ResponseOptions): Response => {
    return {
        status: 200,

        host: '',
        path: '',

        headers: {},

        get json(): JSON | undefined {
            if (!this.body) {
                return undefined
            }

            try {
                return JSON.parse(this.body)
            } catch (error) {
                throw new TypeError("Can't parse body as JSON")
            }
        },

        get text(): string | undefined {
            return this.body
        },
    }
}
