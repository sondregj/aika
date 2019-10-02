export enum HTTPVerb {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    TRACE = 'TRACE',
    CONNECT = 'CONNECT',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
}

export type Query = Array<{ key: string; value: string }>
