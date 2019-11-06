import { Aika } from '../src'

// http://jsonplaceholder.typicode.com/guide.html

describe('Test client', () => {
    let aika: Aika

    beforeAll(() => {
        aika = new Aika('https://jsonplaceholder.typicode.com')
    })

    test('GET Request', async () => {
        const expected = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
        }

        try {
            const response = await aika.get('/todos/1')

            expect(response.json).toEqual(expected)
        } catch (err) {
            fail(err)
        }
    })

    test('POST Request', async () => {
        const expected = {
            id: 101,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }

        try {
            const response = await aika.post(
                '/posts',
                {},
                {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
            )

            expect(response.json).toEqual(expected)
        } catch (err) {
            fail(err)
        }
    })
})
