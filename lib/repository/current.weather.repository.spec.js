"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var current_weather_repository_1 = require("./current.weather.repository");
var schema_model_1 = require("../models/schema.model");
describe('CurrentWeatherRepository.get(name:string)', function () {
    it('testcase for happyflow for fetching current weather from db by city', function (done) {
        var repo = new current_weather_repository_1.CurrentWeatherRepository();
        var mockCurrentWeathers = { id: 21, name: 'Weather 1' };
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.CurrentWeather, 'findOne').yields(null, mockCurrentWeathers);
        repo.get('city').then(function (value) {
            chai_1.expect(value.name).to.equal('Weather 1');
            modelStub.restore();
            done();
        }).catch(function (err) {
            modelStub.restore();
            done(err);
        });
    });
});
describe('CurrentWeatherRepository.update(body:CurrentWeather))', function () {
    it('testcase for happyflow for updating current weather  to db ', function (done) {
        var repo = new current_weather_repository_1.CurrentWeatherRepository();
        var mockCurrentWeathers = {
            sunrise: new Date(),
            sunset: new Date(),
            city_name: "Kolkata",
            temp_min: "14.15",
            temp_max: "14.15",
            temp: "14.15",
            humidity: 76,
            pressure: 740,
            description: "mist",
            id: 1275004,
            wind: "speed = 1.24 m/s at 253.006 degree.",
        };
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.CurrentWeather, 'findOne').yields(null, null);
        var currWeather = new schema_model_1.SchemaModel.CurrentWeather({
            name: mockCurrentWeathers.city_name,
            details: mockCurrentWeathers,
            lastUpdatedTime: new Date()
        });
        var modelStubSave = sinon_1.default.stub(currWeather, 'save').resolves();
        currWeather.save().then(function () {
            sinon_1.default.assert.calledOnce(modelStubSave);
        });
        repo.update(mockCurrentWeathers);
        modelStub.restore();
        modelStub.restore();
        done();
    });
});
