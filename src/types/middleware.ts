import { IHTTPRequest } from '../types/helpers'

export interface AikaMiddleware {
    middleware: (request: IHTTPRequest) => IHTTPRequest
}
