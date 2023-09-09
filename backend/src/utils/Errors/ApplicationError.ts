export class ApplicationError extends Error {
    statusCode: number = 500;
    constructor(message: string) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
