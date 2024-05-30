export type ExceptionCode =
    | "internal error"
    | "bad request"
    | "not found"
    | "unauthorized"
    | "forbidden"
    | "conflict"
    | "unprocessable entity"
    | "too many requests"
    | "gateway timeout"
    | "service unavailable"
    | "payment required"
    | "authentication timeout"
    | "invalid credentials"
    | "expired session"
    | "invalid token"
    | "expired token"
    | "token required"
    | "insufficient permissions"
    | "invalid input"
    | "invalid format"
    | "invalid data"
    | "invalid operation"
    | "invalid parameter"
    | "missing parameter"
    | "out of range"
    | "out of stock"
    | "resource exhausted"
    | "file not found"
    | "permission denied"
    | "server error"
    | "client error"
    | "network error"
    | "database error"
    | "timeout"
    | "unknown error";

export type HttpStatusCode =
    | 100
    | 101
    | 102
    | 103 // Informational responses
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226 // Successful responses
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 307
    | 308 // Redirection messages
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 418
    | 421
    | 422
    | 423
    | 424
    | 425
    | 426
    | 428
    | 429
    | 431
    | 451 // Client error responses
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 510
    | 511; // Server error responses
