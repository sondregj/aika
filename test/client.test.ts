import { Aika } from '../src'

describe('Test client', () => {
    let aika: Aika

    beforeAll(() => {
        // TODO Make own testing host
        aika = new Aika('https://cat-fact.herokuapp.com')
    })

    test.todo('GET Request')
})
