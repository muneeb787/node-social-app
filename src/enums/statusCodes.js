const statusCodes = {
    OK: { code: 200, description: "OK" },
    Created: { code: 201, description: "Created" },
    Bad_Request: { code: 400, description: "Bad Request" },
    Unauthorized: { code: 401, description: "Unauthorized" },
    Forbidden: { code: 403, description: "Forbidden" },
    Not_Found: { code: 404, description: "Not Found" },
    Internal_Server_Error: { code: 500, description: "Internal Server Error" }
};

export default statusCodes;
