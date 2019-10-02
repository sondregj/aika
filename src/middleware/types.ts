import { HTTPRequest } from '../helpers'

export interface AikaMiddleware {
    middleware: (request: HTTPRequest) => HTTPRequest
}
