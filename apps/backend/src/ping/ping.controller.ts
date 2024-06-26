import { Controller, Get, Logger, VERSION_NEUTRAL } from "@nestjs/common";
import { PingService } from "./ping.service";
import { GetPingSuccessResponseBody } from "@kickstart-brand/sdk";

@Controller({
    path: "ping",
    version: [VERSION_NEUTRAL, "1"],
})
export class PingController {
    private readonly logger = new Logger(PingController.name);

    constructor(private readonly pingService: PingService) {}

    @Get()
    async getPing(): Promise<GetPingSuccessResponseBody> {
        return this.pingService.getPing();
    }
}
