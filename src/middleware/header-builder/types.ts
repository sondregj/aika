import { Request } from '../../types'

export type HelperFunction = (...args: any[]) => any
export type HeaderFunction = (c: HBContext, r: Request) => string | void

export interface HeaderFunctions {
    [key: string]: HeaderFunction
}

export interface HBContext {
    constants: { [key: string]: any }
    helpers: { [key: string]: HelperFunction }
}
