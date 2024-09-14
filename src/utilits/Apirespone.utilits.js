class ApiResponse {
    constructor(success, message = '', data = null, statusCode = 200) {
        this.success = success;         // Indicates if the response is successful
        this.message = message;         // Message to provide additional information
        this.data = data;               // The actual data being returned
        this.statusCode = statusCode;   // HTTP status code
    }
}

module.exports = { ApiResponse };
