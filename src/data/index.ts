import { HTTPVerb, Queries } from '../types'

import { Request } from './request'
import { Response } from './response'
import { stringifyQuerystring } from '../utils'

export const makeRequest = (
    host: string,
    method: HTTPVerb,
    path?: string,
    queries?: Queries,
    body?: JSON | string,
): Request => {
    const request: Request = {
        host,
        method,
        path: `${path}${queries ? '?' + stringifyQuerystring(queries) : ''}`,
        body,
        headers: {},
    }
}

export { Request, Response }
