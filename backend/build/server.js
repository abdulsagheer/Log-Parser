"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var app = (0, express_1.default)();
var port = 5000;
app.get("/parse-logs", function (req, res) {
    fs_1.default.readFile("logs.txt", "utf-8", function (err, data) {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        var logs = data.split("\n");
        var filteredLogs = logs
            .filter(function (log) { return log.includes("error") || log.includes("warn"); })
            .map(function (log) {
            var _a = log.split(" - "), date = _a[0], level = _a[1], message = _a[2];
            return {
                date: date,
                level: level,
                message: JSON.parse(message),
            };
        });
        res.send({ logs: filteredLogs });
    });
});
app.listen(port, function () {
    console.log("API server listening at http://localhost:".concat(port));
});
