"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_model_1 = require("../models/schema.model");
//this class is responsinle for all db operation for Current_Weather collection 
var CurrentWeatherRepository = /** @class */ (function () {
    function CurrentWeatherRepository() {
    }
    // this method will insert or update a document in  Current_Weather collection 
    CurrentWeatherRepository.prototype.update = function (body) {
        //at first it will find out if any entry is there or not for a given city name .
        // if there then it will update the same details with latest data
        //else save the data
        schema_model_1.SchemaModel.CurrentWeather.findOne({ name: body.city_name }, function (err, currentWeatherResponse) {
            if (err) {
                console.log('unable to find');
            }
            else {
                if (currentWeatherResponse) {
                    currentWeatherResponse.details = body,
                        currentWeatherResponse.lastUpdatedTime = new Date();
                    currentWeatherResponse.save();
                }
                else {
                    // modifing data with updated detals
                    var currWeather = new schema_model_1.SchemaModel.CurrentWeather({
                        name: body.city_name,
                        details: body,
                        lastUpdatedTime: new Date()
                    });
                    currWeather.save();
                }
            }
        });
    };
    // this method will return current weather  from db for a give city 
    CurrentWeatherRepository.prototype.get = function (name) {
        return new Promise(function (resolve, reject) {
            schema_model_1.SchemaModel.CurrentWeather.findOne({ name: name }, function (err, currentWeatherResponse) {
                if (err) {
                    reject();
                }
                else {
                    resolve(currentWeatherResponse);
                }
            });
        });
    };
    return CurrentWeatherRepository;
}());
exports.CurrentWeatherRepository = CurrentWeatherRepository;
