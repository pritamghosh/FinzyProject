"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_model_1 = require("../models/schema.model");
//this class is responsinle for all db operation for Weather_Forecast collection 
var WeatherForeCastRepository = /** @class */ (function () {
    function WeatherForeCastRepository() {
    }
    // this method will insert or update a document in  Weather_Forecast collection 
    WeatherForeCastRepository.prototype.update = function (body) {
        // at first it will find out if any entry is there or not for a given city name .
        // if there then it will update the same details with latest data
        //else save the data
        schema_model_1.SchemaModel.WeatherForecast.findOne({ name: body.city_name }, function (err, response) {
            if (err) {
                console.log('unable to find');
            }
            else {
                if (response) {
                    // modifing entry with updated data
                    response.details = body,
                        response.lastUpdatedTime = new Date();
                    response.save();
                }
                else {
                    var forecast = new schema_model_1.SchemaModel.WeatherForecast({
                        name: body.city_name,
                        details: body,
                        lastUpdatedTime: new Date()
                    });
                    forecast.save();
                }
            }
        });
    };
    // this method will return weather forcast from db for a give city 
    WeatherForeCastRepository.prototype.get = function (name) {
        return new Promise(function (resolve, reject) {
            schema_model_1.SchemaModel.WeatherForecast.findOne({ name: name }, function (err, forecast) {
                if (err) {
                    reject();
                }
                else {
                    resolve(forecast);
                }
            });
        });
    };
    return WeatherForeCastRepository;
}());
exports.WeatherForeCastRepository = WeatherForeCastRepository;
