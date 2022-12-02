import { Response } from "express";




export function sendError(res: Response, err: Error, message: string = "", status_code: number = 500) {
    return sendResponse(
        res,
        {
            error_message: err.message,
        },
        true,
        message || err.message,
        status_code,
    )
}



export function sendResponse(
    res: Response,
    data: any = {},
    is_error: boolean = false,
    message: string = "",
    status_code: number = 200
) {
    let json = {
        data: data,
        is_error: is_error,
        message: message,
        status_code: status_code,
    };
    if (is_error === undefined) {
        json.is_error = false;
    }
    if (message === undefined) {
        json.message = "";
    }

    return res.status(status_code).send(json);
};