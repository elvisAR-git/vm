export function send_response(
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

    return json;
};