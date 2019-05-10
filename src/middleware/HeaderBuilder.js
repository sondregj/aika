class HeaderBuilder {
	constructor({constants, helpers, headerFunctions}) {
		this.headerFunctions = headerFunctions
		this.context = { constants, helpers }
	}

	headers(request) {
		const funcs = Object.keys(this.headerFunctions)
		const result = {}

		for (let func of funcs) {
			const output = this.headerFunctions[func](this.context, request)
			if (output) {
				result[func] = output
			}
		}
		
		return result
	}

	middleware(request) {
		const headers = this.headers(request)

		request.headers = { ...request.headers, ...headers }
	}
}

module.exports = HeaderBuilder
