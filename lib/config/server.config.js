"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_config_1 = require("./app.config");
var db_config_1 = require("./db.config");
var Server = /** @class */ (function () {
    function Server() {
        //call db configuration and intialize connection
        new db_config_1.DBConfig();
        //call server configuration and intialize
        new app_config_1.App();
    }
    return Server;
}());
exports.Server = Server;
