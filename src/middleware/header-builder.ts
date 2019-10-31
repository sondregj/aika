import { AikaMiddleware } from '.'

import { IHTTPRequest } from '../helpers/types'

interface HBContext {
    constants: { [key: string]: any }
    helpers: { [key: string]: (...args: any[]) => any }
}

type HeaderFunction = (c: HBContext, r: IHTTPRequest) => string | void

interface HeaderBuilderConfig {
    constants: { [key: string]: any }
    helpers: { [key: string]: (...args: any[]) => any }
    headerFunctions: { [key: string]: HeaderFunction }
}

export class HeaderBuilder implements AikaMiddleware {
    private headerFunctions: { [key: string]: HeaderFunction }
    private context: HBContext

    constructor({ constants, helpers, headerFunctions }: HeaderBuilderConfig) {
        this.headerFunctions = headerFunctions
        this.context = { constants, helpers }
    }

    public middleware = (request: IHTTPRequest): IHTTPRequest => ({
        ...request,
        headers: {
            ...request.headers,
            ...this.headers(request),
        },
    })

    private headers(request: IHTTPRequest) {
        const funcs: string[] = Object.keys(this.headerFunctions)
        const result: { [key: string]: string } = {}

        for (const func of funcs) {
            const output = this.headerFunctions[func](this.context, request)

            if (output) {
                result.func = output
            }
        }

        return result
    }
}
