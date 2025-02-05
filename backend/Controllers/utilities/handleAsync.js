const { STATUS } = require('./constant');

const handleAsync = (fn, encrypt = false) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next);
        req.responseData = result;
        res.status(200).json({
            data: req.responseData
        });
        // next();

    } catch (error) {
        const logDetails = {
            message: error.message,
            type: error.constructor.name || "UnknownError",
            path: req.originalUrl,
            method: req.method,
            body: req.body,
            query: req.query,
            headers: req.headers,
            timestamp: new Date().toISOString(),
            location: getErrorLocation(error.stack),
        };

        console.error("Error Details:", JSON.stringify(logDetails, null, 2));

        if (!error.statusCode) {
            return res.status(STATUS.BAD_REQUEST).json({ status: "error", message: error.message });
        }
        else {
            return res.status(error.statusCode).json({ status: "error", message: error.message });
        }
        // next(error);
    }
};

function getErrorLocation(stack) {
    if (!stack) return "Unknown location";

    const stackLines = stack.split("\n");
    const traceLine = stackLines[1] || "";

    const match = traceLine.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
        const [, file, line, column] = match;
        return `${file}:${line}:${column}`;
    }

    return "Location not found";
}

module.exports = handleAsync;
