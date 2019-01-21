"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = require("chai");
var weather_forecast_service_1 = require("./weather.forecast.service");
var weather_forecast_repository_1 = require("../repository/weather.forecast.repository");
var current_weather_service_1 = require("./current.weather.service");
var city_repository_1 = require("../repository/city.repository");
describe('WeatherForecastService.getWeatherForecast(cityName: string) ', function () {
    it('testing happy flow using stub when service called is not required as updated data exists in db', function (done) {
        var service = new weather_forecast_service_1.WeatherForecastService();
        var requestCity = { id: 1, name: 'city1' };
        var date = new Date();
        var mockWeatherForecast = {
            name: 'city1',
            details: {
                city_name: "city1",
                id: 1,
            },
            lastUpdatedTime: date
        };
        var get = sinon_1.default.stub(request_1.default, 'get');
        var repository = sinon_1.default.stub(weather_forecast_repository_1.WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast);
        var cityRepository = sinon_1.default.stub(city_repository_1.CityRepository.prototype, 'findByName').resolves(requestCity);
        service.getWeatherForecast('city1').then(function (values) {
            repository.restore();
            get.restore();
            cityRepository.restore();
            done();
            chai_1.expect(values.city_name).to.be.equal('city1');
            chai_1.expect(values.id).to.be.equal(1);
            sinon_1.default.assert.notCalled(get);
        }).catch(function (err) {
            repository.restore();
            get.restore();
            cityRepository.restore();
            done(err);
        });
    });
    it('testing happy flow using stub when service called is  required as no data exists in db', function (done) {
        var service = new weather_forecast_service_1.WeatherForecastService();
        var requestCity = { id: 222, name: 'city2' };
        var mockCurrentWeather = {
            name: 'city2',
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
            lastUpdatedTime: new Date()
        };
        var mockWeatherForecast;
        var repository = sinon_1.default.stub(weather_forecast_repository_1.WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast);
        var currentWeatherService = sinon_1.default.stub(current_weather_service_1.CurrentWeatherService.prototype, 'getCurrentWeatherById').resolves(mockCurrentWeather);
        var cityRepository = sinon_1.default.stub(city_repository_1.CityRepository.prototype, 'findByName').resolves(requestCity);
        var get = sinon_1.default.stub(request_1.default, 'get');
        var body = {
            cod: "200",
            message: 0.0056,
            cnt: 40,
            city: {
                id: 222,
                name: "city2",
                coord: {
                    lat: 22.5697,
                    lon: 88.3697,
                },
                country: "IN",
            },
            list: []
        };
        get.yields(null, null, body);
        service.getWeatherForecast('city2').then(function (values) {
            repository.restore();
            get.restore();
            currentWeatherService.restore();
            cityRepository.restore();
            done();
            chai_1.expect(values.city_name).to.be.equal('city2');
            chai_1.expect(values.id).to.be.equal(222);
            sinon_1.default.assert.calledOnce(get);
            sinon_1.default.assert.calledOnce(currentWeatherService);
        }).catch(function (err) {
            get.restore();
            repository.restore();
            cityRepository.restore();
            done(err);
        });
    });
    it('testing happy flow using stub when service called is  required as  data exists in db but not updated(exact two hours old)', function (done) {
        var service = new weather_forecast_service_1.WeatherForecastService();
        var requestCity = { id: 121, name: 'city3' };
        var currentDate = new Date();
        var mockCurrentWeather = {
            name: 'city3',
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
            lastUpdatedTime: new Date()
        };
        var mockWeatherForecast = {
            name: 'city3',
            details: {
                city_name: "city3",
                id: 121,
            },
            lastUpdatedTime: new Date(currentDate.getUTCMilliseconds() - (2 * 60 * 60 * 1000))
        };
        var repository = sinon_1.default.stub(weather_forecast_repository_1.WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast);
        var currentWeatherService = sinon_1.default.stub(current_weather_service_1.CurrentWeatherService.prototype, 'getCurrentWeatherById').resolves(mockCurrentWeather);
        var cityRepository = sinon_1.default.stub(city_repository_1.CityRepository.prototype, 'findByName').resolves(requestCity);
        var get = sinon_1.default.stub(request_1.default, 'get');
        var body = {
            cod: "200",
            message: 0.0056,
            cnt: 40,
            city: {
                id: 121,
                name: "city3",
                coord: {
                    lat: 22.5697,
                    lon: 88.3697,
                },
                country: "IN",
            },
            list: []
        };
        get.yields(null, null, body);
        service.getWeatherForecast('city3').then(function (values) {
            repository.restore();
            get.restore();
            currentWeatherService.restore();
            cityRepository.restore();
            done();
            chai_1.expect(values.city_name).to.be.equal('city3');
            chai_1.expect(values.id).to.be.equal(121);
            sinon_1.default.assert.calledOnce(get);
            sinon_1.default.assert.calledOnce(currentWeatherService);
        }).catch(function (err) {
            repository.restore();
            get.restore();
            cityRepository.restore();
            done(err);
        });
    });
});
