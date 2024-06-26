import { PingClient } from "./ping";
import { BasicQueryErrorResponseBody, BasicQuerySuccessResponseBody, ContentTypeHeader } from "../lib/types";

export class Client {
    readonly ping: PingClient;

    constructor(options: ClientInitOptions & RequestClientInitOptions) {
        this.ping = new PingClient(new RequestClient(options));
    }
}

export class RequestClient {
    private readonly endpoint: string;
    private readonly fetchOverrides: RequestInit;

    constructor(options: RequestClientInitOptions) {
        const { url, version = "v1", fetchInit = {} } = options;

        this.endpoint = `${url}${version}`;
        this.fetchOverrides = fetchInit;
    }

    async query<T = BasicQuerySuccessResponseBody, E = BasicQueryErrorResponseBody>(
        options: RequestClientQueryInitOptions,
    ): Promise<QueryResponse<T, E>> {
        const { path, params, method = "GET" } = options;

        try {
            const response = await fetch(
                this.endpoint + path + (params ? `?${new URLSearchParams(params).toString()}` : ""),
                {
                    method,
                    headers: {
                        "Content-Type":
                            "body" in options ? options.contentType : ("application/json" satisfies ContentTypeHeader),
                    },
                    body: "json" in options ? JSON.stringify(options.json) : "body" in options ? options.body : null,
                    ...this.fetchOverrides,
                },
            );

            let json: T | E;

            try {
                json = await response.json();
            } catch (error) {
                return {
                    status: "fail",
                    message: "ClientError: Could not parse JSON response.",
                    error,
                } satisfies QueryFailResponse;
            }

            if (response.ok) {
                return {
                    status: "success",
                    body: json as T,
                    response,
                } satisfies QuerySuccessResponse<T>;
            } else {
                return {
                    status: "error",
                    body: json as E,
                    response,
                } satisfies QueryErrorResponse<E>;
            }
        } catch (error) {
            return {
                status: "fail",
                message: "ClientError: Could not send request.",
                error,
            } satisfies QueryFailResponse;
        }
    }
}

export interface ClientInitOptions {}

export interface RequestClientInitOptions {
    url: `${"http" | "https"}://${string}/`;
    version?: `v${number}`;
    fetchInit?: RequestInit;
}

export type RequestClientQueryInitOptions = {
    path: `/${string}`;
    params?: Record<string, any>;
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    contentType?: ContentTypeHeader;
} & (
    | {
          json?: Record<string, any>;
      }
    | {
          body?: BodyInit;
          contentType: ContentTypeHeader;
      }
);
export type QueryResponse<T, E> = QuerySuccessResponse<T> | QueryErrorResponse<E> | QueryFailResponse;

export interface QuerySuccessResponse<T> {
    status: "success";
    body: T;
    response: Response;
}

export interface QueryErrorResponse<E> {
    status: "error";
    body: E;
    response: Response;
}

export interface QueryFailResponse {
    status: "fail";
    message: string;
    error: unknown;
}
