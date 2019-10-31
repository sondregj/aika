import { IHTTPRequest } from '../helpers/types'

export interface AikaMiddleware {
    middleware: (request: IHTTPRequest) => IHTTPRequest
}
