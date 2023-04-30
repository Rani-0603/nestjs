import { HttpException } from "@nestjs/common";

/**
 * Common not null exception class
 */
export class NotNullException extends HttpException {

    /**
     * Constructor class
     */
    constructor(message: string) {
        super(message, 705)
    }   
}