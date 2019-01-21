import sinon from "sinon";
import { mockReq, mockRes } from 'sinon-express-mock'
import request from 'request';

import { HomeController } from './home.controller';
import { CityService } from '../services/city.service';
import { CurrentWeatherService } from '../services/current.weather.service';
import { WeatherForecastService } from "../services/weather.forecast.service";
import { SchemaModel } from '../models/schema.model';
import { CurrentWeatherRepository } from "../repository/current.weather.repository";
import { CurrentWeather } from "../models/current.weather.model";


describe('HomeController.getCities() ', () => {
    it('testing happy flow using stub', (done) => {
        let controller = new HomeController();
        let mockCities = [
            { id: 2, name: 'Kolkata' },
        ]

        let mockCurrentWeather: CurrentWeather[] =
            [
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
            ]
        var cityService = sinon.stub(CityService.prototype, 'getAllCities').resolves(mockCities)
        let currWeatherService = sinon.stub(CurrentWeatherService.prototype, 'getCurrentWeather').resolves(mockCurrentWeather);

        let res = mockRes()
        let req = mockReq()
        controller.getCities(req, res)
        done();

        cityService.restore();
        currWeatherService.restore()
        //assertion
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(res.status)
        sinon.assert.calledOnce(cityService)
        sinon.assert.calledOnce(currWeatherService)
    });
});


describe('HomeController.getDetails() ', () => {
    it('testing happy flow using stub', (done) => {
        let controller = new HomeController();
        var forecastervice = sinon.stub(WeatherForecastService.prototype, 'getWeatherForecast').resolves()
        let res = mockRes()
        let req = mockReq()
        controller.getDetails(req, res)
        done();

        sinon.assert.calledOnce(forecastervice)

        forecastervice.restore();
    });
});


describe('HomeController.getCities() -> End to End Test case ', () => {
    it('End to End Testcase with service call', (done) => {
        let controller = new HomeController();
        let mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ]
        var modelStub = sinon.stub(SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon.stub(request, 'get');

        let body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather:
                [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main:
            {
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
            sys:
            {
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
        }

        let mockCurrentWeather
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
        get.yields(null, null, body)
        let res = mockRes()
        let req = mockReq()
        controller.getCities(req, res)
        done();
        modelStub.restore();
        get.restore()
        repository.restore();

        //assertion
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(res.status)
        sinon.assert.calledOnce(modelStub)
        sinon.assert.calledOnce(repository)
        sinon.assert.calledOnce(get)
    });

    it('End to End Testcase with service call  data  in db is not updated', (done) => {
        let controller = new HomeController();
        let mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ]
        var modelStub = sinon.stub(SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon.stub(request, 'get');

        let body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather:
                [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main:
            {
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
            sys:
            {
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
        }

        let currentDate = new Date()
        let mockCurrentWeather = {
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

        }
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
        get.yields(null, null, body)
        let res = mockRes()
        let req = mockReq()
        controller.getCities(req, res)
        done();
        modelStub.restore();
        get.restore()
        repository.restore();

        //assertion
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(res.status)
        sinon.assert.calledOnce(modelStub)
        sinon.assert.calledOnce(repository)
        sinon.assert.calledOnce(get)
    });

    it('End to End Testcase with service call  not required   as db is updated', (done) => {
        let controller = new HomeController();
        let mockCities = [
            { id: 2, name: 'Kolkata' },
        ]
        var modelStub = sinon.stub(SchemaModel.City, 'find').yields(null, mockCities);
        var get = sinon.stub(request, 'get');

        let body = {
            coord: { lon: 145.77, lat: -16.92 },
            weather:
                [{
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02n'
                }],
            base: 'stations',
            main:
            {
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
            sys:
            {
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
        }

        let currentDate = new Date()
        let mockCurrentWeather = {
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

        }
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
        get.yields(null, null, body)
        let res = mockRes()
        let req = mockReq()
        controller.getCities(req, res)
        done();
        modelStub.restore();
        get.restore()
        repository.restore();

        //assertion
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(res.status)
        sinon.assert.calledOnce(modelStub)
        sinon.assert.calledOnce(repository)
        sinon.assert.neverCalledWith(get)
    });
});

