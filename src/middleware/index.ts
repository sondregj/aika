import { AikaMiddleware, IHTTPRequest } from '../types'

export const applyMiddleware = (request: IHTTPRequest, middlewares: AikaMiddleware[]): IHTTPRequest =>
    middlewares.reduce<IHTTPRequest>((req, middleware) => middleware.apply(req), request)
