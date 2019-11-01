import { Request } from '../types/data'

export interface Middleware {
    apply: (request: Request) => Request
}
