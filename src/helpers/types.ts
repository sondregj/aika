export type Headers = Array<{ key: string; value: string }>
export type Body = JSON | string | undefined

interface JSONObject {
    [key: string]: string | number | boolean | JSONObject | JSONArray | null
}
type JSONArray = JSONObject[]

export type JSON = JSONObject | JSONArray

export interface IHTTPRequest {
    headers: Headers
    body: Body
}

export interface IHTTPResponse {
    headers: Headers
    status: number
    body?: Body
    json?: JSON
}
