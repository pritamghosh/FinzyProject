"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var application_constant_1 = require("../constants/application.constant");
var current_weather_repository_1 = require("../repository/current.weather.repository");
var current_weather_model_1 = require("../models/current.weather.model");
//this class contails all methods related to current weather and works as service layer
var CurrentWeatherService = /** @class */ (function () {
    function CurrentWeatherService() {
    }
    // this method will return a cuurent weatehr details  for all cites passed as parameter
    CurrentWeatherService.prototype.getCurrentWeather = function (cityRespose) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            for (var i = 0; i < cityRespose.length; i++) {
                //pushing all response in a promise array for synchronisation purpose
                promiseArray.push(_this.getCurrentWeatherById(cityRespose[i]));
            }
            Promise.all(promiseArray).then(function (values) {
                resolve(values);
            });
        });
    };
    //this method will return  current weatehr for a given city passed as parameter
    CurrentWeatherService.prototype.getCurrentWeatherById = function (city) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cityWeatherRepository = new current_weather_repository_1.CurrentWeatherRepository();
            cityWeatherRepository.get(city.name).then(function (response) {
                var isServiceCallRequired = true; // this flas is being used to identify whether external service call is required or not ; 
                //assuming there is no data in db so setting the flag as true.
                if (response) {
                    var timeDiffrence = new Date().getTime() - response.lastUpdatedTime.getTime();
                    // callculate time diffrence between last updated time and and current time 
                    if (timeDiffrence < application_constant_1.ApplicationConstant.REFRESH_TIMI_IN_MS) {
                        // if data in db and diffrence is less tha configured value , 
                        //setting the flag as false and returneg data from db
                        isServiceCallRequired = false;
                        resolve(response.details);
                    }
                }
                if (isServiceCallRequired) {
                    // call external service and update db with updated data
                    request_1.default.get(_this.generateCurrentWeatherUrl(city.id), { json: true }, function (err, res, body) {
                        if (err) {
                            reject();
                        }
                        var currentWeather = new current_weather_model_1.CurrentWeather(body);
                        cityWeatherRepository.update(currentWeather);
                        resolve(currentWeather);
                    });
                }
            });
        });
    };
    // this method will generate url for service call
    CurrentWeatherService.prototype.generateCurrentWeatherUrl = function (id) {
        return application_constant_1.ApplicationConstant.CURRENT_WEATHER_URL + application_constant_1.ApplicationConstant.ID + id + application_constant_1.ApplicationConstant.APPI_ID + application_constant_1.ApplicationConstant.APPI_KEY;
    };
    return CurrentWeatherService;
}());
exports.CurrentWeatherService = CurrentWeatherService;
