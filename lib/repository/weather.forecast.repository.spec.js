"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var schema_model_1 = require("../models/schema.model");
var weather_forecast_repository_1 = require("./weather.forecast.repository");
describe('WeatherForeCastRepository.get(name:string)', function () {
    it('testcase for happyflow for fetching  weather forecast from db by city', function (done) {
        var repo = new weather_forecast_repository_1.WeatherForeCastRepository();
        var forecastMock = { id: 31, name: 'forecast 1' };
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.WeatherForecast, 'findOne').yields(null, forecastMock);
        repo.get('city').then(function (value) {
            chai_1.expect(value.name).to.equal('forecast 1');
            modelStub.restore();
            done();
        }).catch(function (err) {
            modelStub.restore();
            done(err);
        });
    });
});
describe('WeatherForeCastRepository.update(body:WeatherForecastModel)', function () {
    it('testcase for happyflow for updating weather frecast to db ', function (done) {
        var repo = new weather_forecast_repository_1.WeatherForeCastRepository();
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.WeatherForecast, 'findOne').yields(null, null);
        var forecastWeather = new schema_model_1.SchemaModel.WeatherForecast({
            name: 'city',
            details: {},
            lastUpdatedTime: new Date()
        });
        var modelStubSave = sinon_1.default.stub(forecastWeather, 'save').resolves();
        forecastWeather.save().then(function () {
            sinon_1.default.assert.calledOnce(modelStubSave);
        });
        repo.update({});
        modelStub.restore();
        modelStub.restore();
        done();
    });
});
