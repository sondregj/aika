import { Query } from '../../src/types'
import { parseQuerystring, stringifyQuerystring } from '../../src/utils'

describe('Query utilities work as expected', () => {
    test('Querystring parser works as expected', () => {
        const url = 'https://dogs.org/pictures?owner=John&dog=Fido'

        const expected: Query = {
            owner: 'John',
            dog: 'Fido',
        }

        expect(parseQuerystring(url)).toEqual(expected)
    })

    test('Querystring stringifier works as expected', () => {
        const query: Query = {
            username: 'fido',
            password: 'cookies',
        }

        const expected = 'username=fido&password=cookies'

        expect(stringifyQuerystring(query)).toBe(expected)
    })
})
