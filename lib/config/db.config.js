"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var DBConfig = /** @class */ (function () {
    function DBConfig() {
        //Connect with mongo db
        mongoose_1.default.connect('mongodb://54.163.190.228:27017/finzy').then(function () {
            console.log('db connection is successfull');
        }).catch(function (err) {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        });
    }
    return DBConfig;
}());
exports.DBConfig = DBConfig;
