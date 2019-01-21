import request from 'request';
import sinon from "sinon";
import { expect } from 'chai';

import { CurrentWeatherRepository } from "../repository/current.weather.repository";
import { CurrentWeatherService } from "./current.weather.service";
import { CurrentWeather } from "../models/current.weather.model";

describe('CurrentWeatherService.getCurrentWeather() ', () => {
    it('testing happy flow using stub when service called is not required as updated data exists in db', (done) => {
        let service = new CurrentWeatherService();
        let requestCity: any[] = [
            { id: 1, name: 'Kolkata' }
        ]
        let date = new Date();
        let mockCurrentWeather = {
            name: 'Kolkata',
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
            lastUpdatedTime: date

        }
        var get = sinon.stub(request, 'get');
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
        service.getCurrentWeather(requestCity).then((values: CurrentWeather[]) => {
            expect(values.length).to.be.equal(1);
            expect(values[0].city_name).to.be.equal('Kolkata');
            expect(values[0].id).to.be.equal(1);
            sinon.assert.notCalled(get)
            done()
            repository.restore();
            get.restore();

        }).catch(err => {
            done(err)
            repository.restore();
            get.restore();
        });
    });

    it('testing happy flow using stub when service called is  required as no data exists in db', (done) => {
        let service = new CurrentWeatherService();
        let requestCity: any[] = [
            { id: 2172797, name: 'Cairns' }
        ]
        let mockCurrentWeather
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
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

        get.yields(null, null,body)
        service.getCurrentWeather(requestCity).then((values: CurrentWeather[]) => {
            expect(values.length).to.be.equal(1);
            expect(values[0].city_name).to.be.equal('Cairns');
            expect(values[0].id).to.be.equal(2172797);
            sinon.assert.calledOnce(get)
            repository.restore();
            get.restore();
            done()

        }).catch(err => {
            get.restore();
            repository.restore();
            done(err)
        });
    });


    it('testing happy flow using stub when service called is  required as  data exists in db but not updated(exact two hours old)', (done) => {
        let service = new CurrentWeatherService();
        let requestCity: any[] = [
            { id: 2172797, name: 'Cairns' }
        ]
        let currentDate = new Date()
        let mockCurrentWeather= {
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
            lastUpdatedTime: new Date(currentDate.getUTCMilliseconds()-(2*60*60*1000))

        }
        var repository = sinon.stub(CurrentWeatherRepository.prototype, 'get').resolves(mockCurrentWeather)
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

        get.yields(null, null,body)
        service.getCurrentWeather(requestCity).then((values: CurrentWeather[]) => {
            expect(values.length).to.be.equal(1);
            expect(values[0].city_name).to.be.equal('CityFromServiceCall');
            expect(values[0].id).to.be.equal(2634);
            sinon.assert.calledOnce(get)
            repository.restore();
            get.restore()
            done()

        }).catch(err => {
            repository.restore();
            get.restore()
            done(err)
        });
        
    });


});