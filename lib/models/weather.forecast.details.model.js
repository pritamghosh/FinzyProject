"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherForecastDetailsModel = /** @class */ (function () {
    function WeatherForecastDetailsModel(response) {
        this.time = new Date();
        this.time.setUTCMilliseconds(response.dt);
        this.temp_min = (response.main.temp_min - 273).toFixed(2);
        this.temp_max = (response.main.temp_max - 273).toFixed(2);
        this.temp = (response.main.temp - 273).toFixed(2);
        this.humidity = response.main.humidity;
        this.pressure = response.main.pressure;
        this.description = response.weather[0].description;
        this.wind = 'speed = ' + response.wind.speed + ' m/s at ' + response.wind.deg + ' degree.';
        this.sea_level = response.main.sea_level;
        this.grnd_level = response.main.grnd_level;
    }
    return WeatherForecastDetailsModel;
}());
exports.WeatherForecastDetailsModel = WeatherForecastDetailsModel;
