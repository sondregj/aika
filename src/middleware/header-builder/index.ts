import { Middleware, Request, Headers } from '../../types'

import { HBContext, HeaderFunctions, HelperFunction } from './types'

interface HeaderBuilderConfig {
    constants: { [key: string]: any }
    helpers: { [key: string]: HelperFunction }
    headerFunctions: HeaderFunctions
}

export const HeaderBuilder = ({ constants, helpers, headerFunctions }: HeaderBuilderConfig): Middleware => {
    const context: HBContext = { constants, helpers }

    return {
        apply: (request: Request): Request => ({
            ...request,
            headers: {
                ...request.headers,
                ...headers(request, headerFunctions, context),
            },
        }),
    }
}

const headers = (request: Request, headerFunctions: HeaderFunctions, context: HBContext): Headers =>
    Object.keys(headerFunctions)
        .map(key => ({ key, value: headerFunctions[key](context, request) }))
        .reduce((final, { key, value }) => (value ? { ...final, [key]: value } : final), {})
