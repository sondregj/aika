import Aika from '../src'

describe('Test client', () => {
    let aika: Aika

    beforeAll(() => {
        // TODO Make own testing host
        aika = new Aika('https://cat-fact.herokuapp.com')
    })

    test('GET Request', () => {
        aika.get('/facts')
            .then(response => response.json)
            .catch(err => fail(err))
    })

    test('POST Request', () => {
        aika.post('/facts', undefined, '')
            .then(response => response.json)
            .catch(err => fail(err))
    })
})
