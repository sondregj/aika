import { Query } from '../types'

export const parseQuerystring = (querystring: string): Query => {
    const splitUrl = querystring.split('?')

    return splitUrl[splitUrl.length - 1]
        .split('&')
        .map(pair => pair.split(''))
        .reduce((query, [key, value]) => ({ ...query, [key]: value }), {})
}

export const stringifyQuerystring = (query: Query): string =>
    Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .reduce((queryString, current) => `${queryString}&${current}`, '')
