import { HTTPVerb, Query } from '.'

export interface Headers {
    [key: string]: string
}

interface JSONObject {
    [key: string]: string | number | boolean | JSONObject | JSONArray | null
}

type JSONArray = JSONObject[]

export type JSON = JSONObject | JSONArray

export interface Request {
    method: HTTPVerb

    host: string
    path: string
    query: Query

    headers: Headers
    body?: JSON | string
}

export interface Response {
    status: number

    host: string
    path: string

    headers: Headers
    body?: string

    json?: JSON
    text?: string
}
