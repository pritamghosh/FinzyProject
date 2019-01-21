"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = __importDefault(require("sinon"));
var sinon_express_mock_1 = require("sinon-express-mock");
var request_1 = __importDefault(require("request"));
var home_controller_1 = require("./home.controller");
var city_service_1 = require("../services/city.service");
var current_weather_service_1 = require("../services/current.weather.service");
var weather_forecast_service_1 = require("../services/weather.forecast.service");
var schema_model_1 = require("../models/schema.model");
var current_weather_repository_1 = require("../repository/current.weather.repository");
describe('HomeController.getCities() ', function () {
    it('testing happy flow using stub', function (done) {
        var controller = new home_controller_1.HomeController();
        var mockCities = [
            { id: 2, name: 'Kolkata' },
        ];
        var mockCurrentWeather = [
            {
                sunrise: new Date(),
                sunset: new Date(),
                city_name: "Kolkata",
                temp_min: "15.15",
                temp_max: "15.15",
                temp: "15.15",
                humidity: 72,
                pressure: 741,
                description: "haze",
                id: 1,
                wind: "speed = 1.24 m/s at 253.006 degree.",
            }
        ];
        var cityService = sinon_1.default.stub(city_service_1.CityService.prototype, 'getAllCities').resolves(mockCities);
        var currWeatherService = sinon_1.default.stub(current_weather_service_1.CurrentWeatherService.prototype, 'getCurrentWeather').resolves(mockCurrentWeather);
        var res = sinon_express_mock_1.mockRes();
        var req = sinon_express_mock_1.mockReq();
        controller.getCities(req, res);
        done();
        cityService.restore();
        currWeatherService.restore();
        //assertion
        sinon_1.default.assert.calledOnce(res.send);
        sinon_1.default.assert.calledOnce(res.status);
        sinon_1.default.assert.calledOnce(cityService);
        sinon_1.default.assert.calledOnce(currWeatherService);
    });
});
describe('HomeController.getDetails() ', function () {
    it('testing happy flow using stub', function (done) {
        var controller = new home_controller_1.HomeController();
        var forecastervice = sinon_1.default.stub(weather_forecast_service_1.WeatherForecastService.prototype, 'getWeatherForecast').resolves();
        var res = sinon_express_mock_1.mockRes();
        var req = sinon_express_mock_1.mockReq();
        controller.getDetails(req, res);
        done();
        sinon_1.default.assert.calledOnce(forecastervice);
        forecastervice.restore();
    });
});
describe('HomeController.getCities() -> End to End Test case ', function () {
    it('End to End Testcase with service call', function (done) {
        var controller = new home_controller_1.HomeController();
        var mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ];
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon_1.default.stub(request_1.default, 'get');
        var body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather: [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main: {
                temp: 297.15,
                pressure: 1008,
                humidity: 83,
                temp_min: 297.15,
                temp_max: 297.15
            },
            visibility: 10000,
            wind: { speed: 5.1, deg: 130 },
            clouds: { all: 24 },
            dt: 1547746200,
            sys: {
                type: 1,
                id: 9490,
                message: 0.0051,
                country: 'AU',
                sunrise: 1547668605,
                sunset: 1547715429
            },
            id: 2172797,
            name: 'Cairns',
            cod: 200
        };
        var mockCurrentWeather;
        var repository = sinon_1.default.stub(current_weather_repository_1.CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather);
        get.yields(null, null, body);
        var res = sinon_express_mock_1.mockRes();
        var req = sinon_express_mock_1.mockReq();
        controller.getCities(req, res);
        done();
        modelStub.restore();
        get.restore();
        repository.restore();
        //assertion
        sinon_1.default.assert.calledOnce(res.send);
        sinon_1.default.assert.calledOnce(res.status);
        sinon_1.default.assert.calledOnce(modelStub);
        sinon_1.default.assert.calledOnce(repository);
        sinon_1.default.assert.calledOnce(get);
    });
    it('End to End Testcase with service call  data  in db is not updated', function (done) {
        var controller = new home_controller_1.HomeController();
        var mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ];
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon_1.default.stub(request_1.default, 'get');
        var body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather: [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main: {
                temp: 297.15,
                pressure: 1008,
                humidity: 83,
                temp_min: 297.15,
                temp_max: 297.15
            },
            visibility: 10000,
            wind: { speed: 5.1, deg: 130 },
            clouds: { all: 24 },
            dt: 1547746200,
            sys: {
                type: 1,
                id: 9490,
                message: 0.0051,
                country: 'AU',
                sunrise: 1547668605,
                sunset: 1547715429
            },
            id: 2634,
            name: 'CityFromServiceCall',
            cod: 200
        };
        var currentDate = new Date();
        var mockCurrentWeather = {
            name: 'FromDbCity',
            details: {
                sunrise: "2019-02-04T15:03:45.129Z",
                sunset: "2019-02-04T15:04:24.481Z",
                city_name: "Kolkata",
                temp_min: "15.15",
                temp_max: "15.15",
                temp: "15.15",
                humidity: 72,
                pressure: 741,
                description: "haze",
                id: 1,
                wind: "speed = 1.24 m/s at 253.006 degree.",
            },
            lastUpdatedTime: new Date(currentDate.getUTCMilliseconds() - (2 * 60 * 60 * 1000))
        };
        var repository = sinon_1.default.stub(current_weather_repository_1.CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather);
        get.yields(null, null, body);
        var res = sinon_express_mock_1.mockRes();
        var req = sinon_express_mock_1.mockReq();
        controller.getCities(req, res);
        done();
        modelStub.restore();
        get.restore();
        repository.restore();
        //assertion
        sinon_1.default.assert.calledOnce(res.send);
        sinon_1.default.assert.calledOnce(res.status);
        sinon_1.default.assert.calledOnce(modelStub);
        sinon_1.default.assert.calledOnce(repository);
        sinon_1.default.assert.calledOnce(get);
    });
    it('End to End Testcase with service call  not required   as db is updated', function (done) {
        var controller = new home_controller_1.HomeController();
        var mockCities = [
            { id: 2, name: 'Kolkata' },
        ];
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon_1.default.stub(request_1.default, 'get');
        var body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather: [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main: {
                temp: 297.15,
                pressure: 1008,
                humidity: 83,
                temp_min: 297.15,
                temp_max: 297.15
            },
            visibility: 10000,
            wind: { speed: 5.1, deg: 130 },
            clouds: { all: 24 },
            dt: 1547746200,
            sys: {
                type: 1,
                id: 9490,
                message: 0.0051,
                country: 'AU',
                sunrise: 1547668605,
                sunset: 1547715429
            },
            id: 2634,
            name: 'CityFromServiceCall',
            cod: 200
        };
        var currentDate = new Date();
        var mockCurrentWeather = {
            name: 'FromDbCity',
            details: {
                sunrise: "2019-02-04T15:03:45.129Z",
                sunset: "2019-02-04T15:04:24.481Z",
                city_name: "Kolkata",
                temp_min: "15.15",
                temp_max: "15.15",
                temp: "15.15",
                humidity: 72,
                pressure: 741,
                description: "haze",
                id: 1,
                wind: "speed = 1.24 m/s at 253.006 degree.",
            },
            lastUpdatedTime: currentDate
        };
        var repository = sinon_1.default.stub(current_weather_repository_1.CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather);
        get.yields(null, null, body);
        var res = sinon_express_mock_1.mockRes();
        var req = sinon_express_mock_1.mockReq();
        controller.getCities(req, res);
        done();
        modelStub.restore();
        get.restore();
        repository.restore();
        //assertion
        sinon_1.default.assert.calledOnce(res.send);
        sinon_1.default.assert.calledOnce(res.status);
        sinon_1.default.assert.calledOnce(modelStub);
        sinon_1.default.assert.calledOnce(repository);
        sinon_1.default.assert.neverCalledWith(get);
    });
});
