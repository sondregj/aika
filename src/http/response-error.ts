import { Response } from '../types'

export class ResponseError extends Error {
    public status: number
    public response: Response

    constructor(message: string, response: Response) {
        super(message)

        this.response = response
        this.status = response.status
    }
}
