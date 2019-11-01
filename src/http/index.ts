import fetch from 'cross-fetch'

import { buildResponse } from '../data'
import { Request, Response } from '../types'
import { ResponseError } from './response-error'
import { stringifyQuerystring } from '../utils'

export const send = async (request: Request): Promise<Response> => {
    const host = request.host
    const path = `${request.path}${request.query ? '?' + stringifyQuerystring(request.query) : ''}`

    const bodyString = request.body
        ? typeof request.body === 'object'
            ? JSON.stringify(request.body)
            : request.body
        : undefined

    return fetch(`${host}${path}`, {
        method: request.method,
        headers: request.headers,
        body: bodyString,
    })
        .then(response => checkError(response))
        .then(response => {
            const headers = response.headers
            const body = response.body

            return buildResponse({
                status: response.status,

                host: request.host,
                path: request.path,

                headers,
                body,
            })
        })
}

const checkError = (response: any) => {
    // TODO Figure out typings

    if (response.status >= 400) {
        throw new ResponseError('HTTP status code in error range', response)
    }

    return response
}
