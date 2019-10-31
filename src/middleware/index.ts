import { AikaMiddleware, IRequest } from '../types'

export const applyMiddleware = (request: IRequest, middlewares: AikaMiddleware[]): IRequest =>
    middlewares.reduce<IRequest>((req, middleware) => middleware.apply(req), request)
