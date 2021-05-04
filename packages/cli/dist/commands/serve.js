"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]") // filename is optional value
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4005") // <requiredValue>
    .action(function (fileName, options) {
    if (fileName === void 0) { fileName = "notebook.js"; }
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(fileName)); // cwd() - directory from which user ran the command
    var file = path_1.default.basename(fileName); //name of the file
    local_api_1.serve(parseInt(options.port), file, dir);
});
