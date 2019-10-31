import { IHTTPRequest } from '../types/helpers'

export interface AikaMiddleware {
    apply: (request: IHTTPRequest) => IHTTPRequest
}
