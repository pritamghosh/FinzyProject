"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weather_forecast_details_model_1 = require("./weather.forecast.details.model");
var WeatherForecastModel = /** @class */ (function () {
    function WeatherForecastModel(response) {
        this.forecast = [];
        this.city_name = response.city.name;
        this.id = response.city.id;
        for (var i = 0; i < response.list.length; i++) {
            this.forecast.push(new weather_forecast_details_model_1.WeatherForecastDetailsModel(response.list[i]));
        }
    }
    WeatherForecastModel.prototype.setCurrentWeather = function (currentWeatherParam) {
        this.currentWeather = currentWeatherParam;
    };
    return WeatherForecastModel;
}());
exports.WeatherForecastModel = WeatherForecastModel;
