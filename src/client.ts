import { HTTPVerb, HTTPAction, Query, AikaMiddleware, JSON } from './types'

import { buildRequest } from './data'
import { applyMiddleware } from './middleware'
import { send } from './http'

interface AikaConfig {
    useHTTP?: boolean
}

export class Aika {
    private hostname: string
    private useHTTP?: boolean

    private middlewares: AikaMiddleware[] = []

    constructor(host: string, config: AikaConfig = {}) {
        const { useHTTP = false } = config

        this.hostname = host
        this.useHTTP = useHTTP
    }

    public get: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'GET',
                path,
                query,
            ),
        )

    public post: HTTPAction = async (path, query, body) =>
        send(
            this.compose(
                'POST',
                path,
                query,
                body,
            ),
        )

    public put: HTTPAction = async (path, query, body) =>
        send(
            this.compose(
                'PUT',
                path,
                query,
                body,
            ),
        )

    public patch: HTTPAction = async (path, query, body) =>
        send(
            this.compose(
                'PATCH',
                path,
                query,
                body,
            ),
        )

    public delete: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'DELETE',
                path,
                query,
            ),
        )

    public head: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'HEAD',
                path,
                query,
            ),
        )

    public trace: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'TRACE',
                path,
                query,
            ),
        )

    public connect: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'CONNECT',
                path,
                query,
            ),
        )

    public options: HTTPAction = async (path, query) =>
        send(
            this.compose(
                'OPTIONS',
                path,
                query,
            ),
        )

    public host = (name: string): Aika => {
        this.hostname = name

        return this
    }

    public config = (config: AikaConfig): Aika => {
        return this
    }

    public use = (middleware: AikaMiddleware): Aika => {
        this.middlewares.push(middleware)

        return this
    }

    private compose = (method: HTTPVerb, path?: string, query?: Query, body?: JSON | string) => {
        const request = buildRequest({ host: this.hostname, method, path, query, body })

        return applyMiddleware(request, this.middlewares)
    }
}
