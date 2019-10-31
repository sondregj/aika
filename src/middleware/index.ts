import { AikaMiddleware, IRequest } from '../types'

export { HeaderBuilder } from './header-builder'

export const applyMiddleware = (request: IRequest, middlewares: AikaMiddleware[]): IRequest =>
    middlewares.reduce<IRequest>((req, middleware) => middleware.apply(req), request)
