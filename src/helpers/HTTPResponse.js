class HTTPResponse {
	constructor(options) {
		const {headers, body, status} = options || {}

		this.headers = headers
		this.body = body
		this.status = status
	}

	// Get data
	headers() { return this.headers }

	json() { 
		try {
			return JSON.parse(this.body)
		} catch (err) {
			throw err
		}
	}

	text() { return this.body }
}

module.exports = HTTPResponse
