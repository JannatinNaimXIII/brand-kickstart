import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PingService {
    private readonly logger = new Logger(PingService.name);

    constructor() {}

    async getPing() {
        return {
            message: "Pong!",
        };
    }
}
