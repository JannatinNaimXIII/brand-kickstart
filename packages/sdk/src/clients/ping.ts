import { RequestClient } from "./core";

export class PingClient {
    constructor(private readonly client: RequestClient) {}

    async getPing(_: GetPingRequestBody) {
        return this.client.query<GetPingSuccessResponseBody>({ path: "/ping" });
    }
}

export interface GetPingRequestBody {
    message: "Ping!";
}

export interface GetPingSuccessResponseBody {
    message: "Pong!";
}
