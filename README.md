<h1 align="center">
  <span style="font-size: 100px;">🚚</span>
  <br>
  <br>
  Aika
</h1>

<h4 align="center">A minimal, asynchronous HTTP client for Node.js</h4>

<p align="center">
  <a href="https://travis-ci.org/sondregj/aika">
    <img alt="Travis Build Status" src="https://img.shields.io/travis/sondregj/aika.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/aika">
  	<img alt="npm (latest)" src="https://img.shields.io/npm/v/aika/latest.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/aika">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/aika.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/aika">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/sondregj/aika.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/aika">
    <img alt="License" src="https://img.shields.io/github/license/sondregj/aika.svg?style=flat-square">
  </a>
  
  <a href="https://github.com/carloscuesta/gitmoji">
  <img alt="Gitmoji" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square">
  </a>
</p>

*This library is not feature complete yet.*

Everything is asynchronous.

## Progress

- [x] Basic requests
- [x] Bodies and querystrings
- [x] Header Builder
- [x] General middleware
- [ ] Tests
- [ ] Documentation

## Usage

*(Some features are planned and not implemented)*

```javascript
const Aika = require('aika')

const aika = new Aika()

// Middleware support (planned)
aika.use(headerBuilder)

// Perform HTTP(S) requests
aika.host('google.com')
    .get('/search', {q: 'horses'})
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Parse JSON response
aika.host('cat-fact.herokuapp.com')
    .get('/facts')
    .then(res => console.log(res.json()))
    .catch(err => console.log(err))
```

## Middleware

A middleware is any object that has a `middleware` function. The function should take a request object as its only parameter and return it after doing it's thing.

## Development

First, clone the repo, and do `npm install`.

Run tests with `npm test`.

Run linter with `npm run lint`

Do not commit directly to master. Preferably, make a branch or fork out of the `development` branch and make a pull request.

## License

MIT © 2019 Sondre Gjellestad
