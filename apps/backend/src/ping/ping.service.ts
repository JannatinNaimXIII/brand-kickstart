import { Injectable, Logger } from "@nestjs/common";
import { GetPingSuccessResponseBody } from "@brand-kickstart/sdk";

@Injectable()
export class PingService {
    private readonly logger = new Logger(PingService.name);

    constructor() {}

    async getPing(): Promise<GetPingSuccessResponseBody> {
        return {
            message: "Pong!",
        };
    }
}
