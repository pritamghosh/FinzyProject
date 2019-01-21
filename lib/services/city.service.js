"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var city_repository_1 = require("../repository/city.repository");
// this calss is responsible for all operation related to cities and works as service layer
var CityService = /** @class */ (function () {
    function CityService() {
    }
    // this method will return all cities with their id from db
    CityService.prototype.getAllCities = function () {
        var cityRepository = new city_repository_1.CityRepository();
        return cityRepository.getAllCities();
    };
    return CityService;
}());
exports.CityService = CityService;
