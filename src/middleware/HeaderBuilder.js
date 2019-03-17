class HeaderBuilder {
	constructor(options) {
		const {headerFunctions, constants, helpers} = options

		if (typeof headerFunctions !== 'object') { throw new Error('No defined header functions.')}
		
		this.headerFunctions = headerFunctions
		this.context = { constants, helpers }
	}

	headers(request) {
		const funcs = Object.keys(this.headerFunctions)
		const result = {}

		for (let func of funcs) { result[func] = this.headerFunctions[func](this.context, request) }

		return result
	}

	middleware(request) {
		const headers = this.headers(request)

		request.headers = Object.assign(request.headers, headers)
	}
}

module.exports = HeaderBuilder
