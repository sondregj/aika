import { Queries } from '../types'

export const parseQuerystring = (querystring: string): Queries => {
    const splitUrl = querystring.split('?')

    return splitUrl[splitUrl.length - 1]
        .split('&')
        .map(pair => pair.split(''))
        .map(([key, value]) => ({ key, value }))
}

export const stringifyQuerystring = (queries: Queries): string =>
    queries.map(({ key, value }) => `${key}=${value}`).reduce((queryString, current) => `${queryString}&${current}`, '')
