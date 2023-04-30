import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailService {
    logger = new Logger(MailService.name)
    sendMail(from: string, to: string, subject: string, body: string) {
        this.logger.log(from, to, subject, body);
    }
    getMessage(message: string) {
        return message;
    }

}