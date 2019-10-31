import { AikaMiddleware, Request } from '../types'

export { HeaderBuilder } from './header-builder'

export const applyMiddleware = (request: Request, middlewares: AikaMiddleware[]): Request =>
    middlewares.reduce<Request>((req, middleware) => middleware.apply(req), request)
