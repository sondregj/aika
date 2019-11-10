import { Middleware, Request } from '../../src/types'
import { applyMiddleware } from '../../src/middleware'

describe('Test middleware', () => {
    test('Test simple middleware', () => {
        const request: Request = {
            host: 'https://cats.org',
            method: 'GET',
            headers: {},
            path: '',
            query: {},
        }

        const newHost = 'https://dogs.org'

        const middleware: Middleware = { apply: req => ({ ...req, host: newHost }) }
        const newRequest = middleware.apply(request)

        expect(newRequest.host).toBe(newHost)
    })

    test('applyMiddleware works as expected', () => {
        const request: Request = {
            host: 'https://cats.org',
            method: 'GET',
            headers: {},
            path: '',
            query: {},
        }

        const finalHost = 'https://dogs.org'

        const middlewares: Middleware[] = [
            { apply: req => ({ ...req, host: 'https://bears.org' }) },
            { apply: req => ({ ...req, host: 'https://lions.org' }) },
            { apply: req => ({ ...req, host: finalHost }) },
        ]

        const newRequest = applyMiddleware(request, middlewares)

        expect(newRequest.host).toBe(finalHost)
    })
})
