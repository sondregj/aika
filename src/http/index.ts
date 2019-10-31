import fetch from 'cross-fetch'

import { buildResponse } from '../data'
import { Request, Response } from '../types'
import { ResponseError } from './response-error'

export const send = async (request: Request): Promise<Response> =>
    fetch(`${request.host}${request.path}`, {
        method: request.method,
        headers: request.headers,
    })
        .then(response => checkError(response))
        .then(response => {
            const headers = response.headers

            return buildResponse({
                host: request.host,
                path: request.path,
                headers,
                status: response.status,
            })
        })

const checkError = (response: any) => {
    if (response.status >= 400) {
        throw new ResponseError('HTTP status code in error range', response)
    }

    return response
}
