"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_model_1 = require("../models/schema.model");
//this class is responsinle for all db operation for City collection 
var CityRepository = /** @class */ (function () {
    function CityRepository() {
    }
    // this method will return all cities with their id from db
    CityRepository.prototype.getAllCities = function () {
        return new Promise(function (resolve, reject) {
            schema_model_1.SchemaModel.City.find(function (err, cityRespose) {
                if (err) {
                    reject();
                }
                else {
                    resolve(cityRespose);
                }
            });
        });
    };
    // this method will return  city  from db for the given id 
    CityRepository.prototype.findByName = function (name) {
        return new Promise(function (resolve, reject) {
            schema_model_1.SchemaModel.City.findOne({ name: name }, function (err, cityRespose) {
                if (err) {
                    reject();
                }
                else {
                    if (cityRespose) {
                        resolve(cityRespose);
                    }
                    else {
                        reject();
                    }
                }
            });
        });
    };
    return CityRepository;
}());
exports.CityRepository = CityRepository;
