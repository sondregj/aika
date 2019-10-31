import { IRequest } from '../types/data'

export interface AikaMiddleware {
    apply: (request: IRequest) => IRequest
}
