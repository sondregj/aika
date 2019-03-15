const HTTP = require('http')
const HTTPS = require('https')
const querystr = require('querystring')

const HTTPResponse = require('./helpers/HTTPResponse')

class Aika {
	constructor(config = {useHTTPS: true}) {
		const {host, useHTTPS} = config

		this.hostname = host
		this.useHTTPS = useHTTPS

		// TODO Middleware
		//this.middleware = []
	}

	/* General verbs */

	async get(path, query) {return this.middleware('GET', path, query)}

	async post(path, query, body) {return this.middleware('POST', path, query, body).catch(err => {throw err})}

	async put(path, query, body) {return this.middleware('PUT', path, query, body).catch(err => {throw err})}

	async patch(path, query, body) {return this.middleware('PATCH', path, query, body).catch(err => {throw err})}

	async delete(path, query) {return this.middleware('DELETE', path, query).catch(err => {throw err})}


	/* Misc verbs */

	async head(path) {return this.httpFunc('HEAD', path)}

	async trace(path) {return this.httpFunc('HEAD', path)}

	async connect(path) {return this.httpFunc('HEAD', path)}

	async options(path) {return this.httpFunc('HEAD', path)}


	/* Middleware */

	async middleware(method, path, query, body) {
		const request = {
			host: this.hostname,
			method,
			path: `${path}?${querystr.stringify(query)}`,
			query,
			body,
			headers: {}
		}

		// TODO Send request through middleware functions

		// Run Header Builder middleware
		this.headerBuilder.middleware(request, () => {})

		// Send to HTTP Handler
		return this.http(request)
	}


	/* HTTP Handlers */

	async http(request) {
		return await new Promise((resolve, reject) => {
			const req = (this.useHTTPS ? HTTPS : HTTP).request(request, res => {
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

			req.on('error', (err) => {reject(err)})
			req.end()
		})
	}

	/* Functions */

	setHeaderBuilder(headerBuilder) {this.headerBuilder = headerBuilder}

	// TODO
	use(middleware) {; return this}

	host(name) {this.hostname = name; return this}
}

module.exports = Aika
