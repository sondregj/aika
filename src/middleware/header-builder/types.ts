import { IHTTPRequest } from '../../types'

export interface HBContext {
    constants: { [key: string]: any }
    helpers: { [key: string]: HelperFunction }
}

export type HelperFunction = (...args: any[]) => any
export type HeaderFunction = (c: HBContext, r: IHTTPRequest) => string | void
export interface HeaderFunctions {
    [key: string]: HeaderFunction
}

export interface Headers {
    [key: string]: string
}
