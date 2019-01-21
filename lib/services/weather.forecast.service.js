"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var application_constant_1 = require("../constants/application.constant");
var weather_forecast_repository_1 = require("../repository/weather.forecast.repository");
var city_repository_1 = require("../repository/city.repository");
var weather_forecast_model_1 = require("../models/weather.forecast.model");
var current_weather_service_1 = require("./current.weather.service");
//this class contails all methods related to  weather forecast and works as service layer
var WeatherForecastService = /** @class */ (function () {
    function WeatherForecastService() {
    }
    // this method will return a weather forcast details  for a given city passing through parameter
    WeatherForecastService.prototype.getWeatherForecast = function (cityName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cityRepo = new city_repository_1.CityRepository();
            cityRepo.findByName(cityName).then(function (value) {
                resolve(_this.getWeatherForecastById(value));
            }).catch(function () { return reject(); });
        });
    };
    // this method will check if service call is requried or it will return forecast details from DB
    WeatherForecastService.prototype.getWeatherForecastById = function (city) {
        var _this = this;
        var forecastRepository = new weather_forecast_repository_1.WeatherForeCastRepository();
        return new Promise(function (resolve, reject) {
            forecastRepository.get(city.name).then(function (response) {
                var isServiceCallRequired = true; // this flas is being used to identify whether external service call is required or not ; 
                //assuming there is no data in db so setting the flag as true.
                if (response) {
                    var timeDiffrence = new Date().getTime() - response.lastUpdatedTime.getTime();
                    // calculate time diffrecne b/w current time and last updated time
                    if (timeDiffrence < application_constant_1.ApplicationConstant.REFRESH_TIMI_IN_MS) {
                        // change the falg as false is diffrecne is less than configured value
                        // and return details from db
                        isServiceCallRequired = false;
                        resolve(response.details);
                    }
                }
                if (isServiceCallRequired) {
                    // call service and update the bd with the latest data received from server for the corresponding city
                    request_1.default.get(_this.generateWeatherForecastUrl(city.id), { json: true }, function (err, res, body) {
                        if (err) {
                            reject();
                        }
                        var forecastWeather = new weather_forecast_model_1.WeatherForecastModel(body);
                        forecastRepository.update(forecastWeather);
                        var currentWeatherService = new current_weather_service_1.CurrentWeatherService();
                        // fetch the curren weather for this city  
                        currentWeatherService.getCurrentWeatherById(city).then(function (value) {
                            forecastWeather.setCurrentWeather(value);
                            resolve(forecastWeather);
                        });
                    });
                }
            });
        });
    };
    // this method will generate url for service call
    WeatherForecastService.prototype.generateWeatherForecastUrl = function (id) {
        return application_constant_1.ApplicationConstant.WEATHER_FORECAST_URL + application_constant_1.ApplicationConstant.ID + id + application_constant_1.ApplicationConstant.APPI_ID + application_constant_1.ApplicationConstant.APPI_KEY;
    };
    return WeatherForecastService;
}());
exports.WeatherForecastService = WeatherForecastService;
