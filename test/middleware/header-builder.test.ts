import { Middleware, Request, Headers } from '../../src/types'
import { HeaderBuilder, headers } from '../../src/middleware/header-builder'
import { HBContext, HeaderFunctions } from '../../src/middleware/header-builder/types'

describe('Test HeaderBuilder', () => {
    test('Header function works', () => {
        const request: Request = {
            host: 'https://dogs.org',
            method: 'GET',
            headers: { 'Favorite-Dog': 'Chihuahua' },
            path: '',
            query: {},
        }

        const headerFunctions: HeaderFunctions = {
            'Worst-Enemy': () => 'Cat',
            'Oops-Nothing': () => undefined,
        }

        const context: HBContext = { constants: {}, helpers: {} }

        const newHeaders = headers(request, headerFunctions, context)

        const expectedHeaders: Headers = {
            'Favorite-Dog': 'Chihuahua',
            'Worst-Enemy': 'Cat',
        }

        expect(newHeaders).toEqual(expectedHeaders)
    })

    test('Middleware function works as expected', () => {
        const request: Request = {
            host: 'https://dogs.org',
            method: 'GET',
            headers: { 'Favorite-Dog': 'Chihuahua' },
            path: '',
            query: {
                greeting: 'Hello',
            },
        }

        const greeting = 'Hello'
        const name = 'Fido'
        const daysPerWeek = 7
        const hoursPerDay = 24

        const greet = (greetingToUse: string, nameToGreet: string) => `${greetingToUse} ${nameToGreet}`
        const multiply = (n: number, m: number): string => (n * m).toString()

        const headerBuilder = HeaderBuilder({
            constants: { daysPerWeek, hoursPerDay, name, greeting },
            helpers: { multiply, greet },
            headerFunctions: {
                'Hours-Per-Week': c => c.helpers.multiply(c.constants.daysPerWeek, c.constants.hoursPerDay),
                'Oops-Nothing': () => undefined,
                'Nice-Greeting': (c, r) => c.helpers.greet(r.query.greeting, c.constants.name),
            },
        })

        const newRequest = headerBuilder.apply(request)

        const expectedHeaders: Headers = {
            'Favorite-Dog': 'Chihuahua',
            'Hours-Per-Week': multiply(daysPerWeek, hoursPerDay),
            'Nice-Greeting': greet(greeting, name),
        }

        expect(newRequest.headers).toEqual(expectedHeaders)
    })
})
