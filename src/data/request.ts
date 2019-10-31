import { Headers, IRequest, JSON } from '../types/data'
import { HTTPVerb } from '../types'

interface RequestOptions {
    body: JSON | string
}

export class Request implements IRequest {
    public host: string
    public path: string
    public method: HTTPVerb

    public body: string

    constructor({ body }: RequestOptions) {
        this.body = body
    }

    public get json(): JSON {
        return {}
    }

    public get headers(): Headers {
        return []
    }
}
