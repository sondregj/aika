import { AikaMiddleware } from '../../types/middleware'
import { IRequest } from '../../types/helpers'

import { HBContext, HeaderFunctions, Headers, HelperFunction } from './types'

interface HeaderBuilderConfig {
    constants: { [key: string]: any }
    helpers: { [key: string]: HelperFunction }
    headerFunctions: HeaderFunctions
}

export const HeaderBuilder = ({ constants, helpers, headerFunctions }: HeaderBuilderConfig): AikaMiddleware => {
    const context: HBContext = { constants, helpers }

    return {
        middleware: (request: IHTTPRequest): IHTTPRequest => ({
            ...request,
            headers: {
                ...request.headers,
                ...headers(request, headerFunctions, context),
            },
        }),
    }
}

type headers = (request: IRequest, headerFunctions: HeaderFunctions, context: HBContext) => Headers

const headers: headers = (request, headerFunctions, context) =>
    Object.keys(headerFunctions)
        .map(key => ({ key, value: headerFunctions[key](context, request) }))
        .reduce((final, { key, value }) => (value ? { ...final, [key]: value } : final), {})
