import { IRequest } from '../types/helpers'

export interface AikaMiddleware {
    apply: (request: IRequest) => IRequest
}
