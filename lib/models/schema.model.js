"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var SchemaModel;
(function (SchemaModel) {
    // export type CitySchema = mongoose.Document & {
    //     id: number,
    //     name: string,
    // }
    var CitySchema = new mongoose_1.default.Schema({
        id: { type: Number, unique: true },
        name: String
    });
    var CurrentWeatherSchema = new mongoose_1.default.Schema({
        name: { type: String, unique: true },
        details: {},
        lastUpdatedTime: Date
    });
    var WeatherForecastSchema = new mongoose_1.default.Schema({
        name: { type: String, unique: true },
        details: {},
        lastUpdatedTime: Date
    });
    SchemaModel.City = mongoose_1.default.model("City", CitySchema, "city");
    SchemaModel.CurrentWeather = mongoose_1.default.model("CurrentWeather", CurrentWeatherSchema, "Current_Weather");
    SchemaModel.WeatherForecast = mongoose_1.default.model("WeatherForecast", WeatherForecastSchema, "Weather_Forecast");
})(SchemaModel = exports.SchemaModel || (exports.SchemaModel = {}));
