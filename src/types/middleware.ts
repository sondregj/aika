import { Request } from '../types/data'

export interface AikaMiddleware {
    apply: (request: Request) => Request
}
