"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var current_weather_service_1 = require("../services/current.weather.service");
var city_service_1 = require("../services/city.service");
var weather_forecast_service_1 = require("../services/weather.forecast.service");
var HomeController = /** @class */ (function () {
    function HomeController() {
    }
    // controller method for initialize home page
    //PathPattern = "/""
    HomeController.prototype.getCities = function (req, res) {
        var weatherService = new current_weather_service_1.CurrentWeatherService();
        var cityService = new city_service_1.CityService();
        cityService.getAllCities().then(function (cityResponse) {
            weatherService.getCurrentWeather(cityResponse).then(function (list) {
                res.status(200).send(list);
            });
        });
    };
    // controller method for fetiching details for a given city
    //PathPattern = /details?city=${cityName}
    HomeController.prototype.getDetails = function (req, res) {
        var weatherForecastService = new weather_forecast_service_1.WeatherForecastService();
        weatherForecastService.getWeatherForecast(req.query.city)
            .then(function (value) { return res.status(200).send(value); })
            .catch(function () { return res.status(404).send("Invalid request"); });
    };
    return HomeController;
}());
exports.HomeController = HomeController;
