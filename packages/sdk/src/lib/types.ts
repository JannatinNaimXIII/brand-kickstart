export type ContentTypeHeader = `${string}/${string}` | `${string}/${string}; ${string}=${string}`;

export type BasicQuerySuccessResponseBody = unknown;

export interface BasicQueryErrorResponseBody {
    message: string;
    error: string;
}
