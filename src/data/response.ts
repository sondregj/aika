import { Headers, IResponse, JSON } from '../types/data'

interface ResponseOptions {
    headers: object
    body: string
    status: number
}

export class Response implements IResponse {
    public static fromFetch(response: Response): Response {
        return new Response({ headers: response.headers, body: response.text(), status: response.status })
    }

    public readonly body?: string

    private readonly statusCode: number
    private responseHeaders: any

    constructor({ headers, body, status }: ResponseOptions) {
        this.responseHeaders = headers
        this.body = body
        this.statusCode = status
    }

    // Get data
    public get status(): number {
        return this.statusCode
    }

    public get headers(): Headers {
        return this.responseHeaders
    }

    public get json(): JSON | undefined {
        if (!this.body) {
            return undefined
        }

        try {
            return JSON.parse(this.body)
        } catch (error) {
            throw new TypeError("Can't parse body as JSON")
        }
    }

    public get text(): string | undefined {
        return this.body
    }
}
