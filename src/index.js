const HTTP = require('http')
const HTTPS = require('https')
const querystr = require('querystring')

const HTTPResponse = require('./helpers/HTTPResponse')

class Aika {
	constructor(config = {host: null, useHTTP: false}) {
		const {host, useHTTP} = config

		this.hostname = host
		this.useHTTP = useHTTP

		this.middlewares = []
	}

	/* General verbs */

	async get(path, query) {return this.middleware('GET', path, query).catch(err => {throw err})}

	async post(path, query, body) {return this.middleware('POST', path, query, body).catch(err => {throw err})}

	async put(path, query, body) {return this.middleware('PUT', path, query, body).catch(err => {throw err})}

	async patch(path, query, body) {return this.middleware('PATCH', path, query, body).catch(err => {throw err})}

	async delete(path, query) {return this.middleware('DELETE', path, query).catch(err => {throw err})}


	/* Misc verbs */

	async head(path, query) {return this.middleware('HEAD', path, query).catch(err => {throw err})}

	async trace(path, query) {return this.middleware('HEAD', path, query).catch(err => {throw err})}

	async connect(path, query) {return this.middleware('HEAD', path, query).catch(err => {throw err})}

	async options(path, query) {return this.middleware('HEAD', path, query).catch(err => {throw err})}


	/* Middleware */

	async middleware(method, path, query, body) {
		const request = {
			host: this.hostname,
			method,
			path: `${path}${query ? '?' + querystr.stringify(query) : ''}`,
			query,
			body,
			headers: {}
		}

		// Send request through middleware functions
		for (let middleware of this.middlewares) {
			middleware.middleware(request)
		}

		// Send to HTTP Handler
		return this.http(request)
	}


	/* HTTP Handler */

	http(request) {
		return new Promise((resolve, reject) => {
			const req = (this.useHTTP ? HTTP : HTTPS).request(request, res => {
				const response = new HTTPResponse()
				
				let body = []
				res.on('data', chunk => { body.push(chunk) })
				res.on('end', () => {
					try {
						response.body = Buffer.concat(body).toString()
						response.status = res.statusCode
						response.headers = res.headers
					} catch (err) { reject(err)	}
					
					resolve(response)
				})

				return res
			})

			if (request.body) {
				req.write(request.body)
			}

			req.on('error', (err) => {reject(err)})
			req.end()
		})
	}

	use(middleware) {this.middlewares.push(middleware); return this}

	host(name) {this.hostname = name; return this}
}

module.exports = Aika
