import request from 'request';
import sinon from "sinon";
import { expect } from 'chai';
import { WeatherForecastService } from './weather.forecast.service';
import { WeatherForeCastRepository } from '../repository/weather.forecast.repository';
import { CurrentWeatherService } from './current.weather.service';
import { CityRepository } from '../repository/city.repository';


describe('WeatherForecastService.getWeatherForecast(cityName: string) ', () => {
    it('testing happy flow using stub when service called is not required as updated data exists in db', (done) => {
        let service = new WeatherForecastService();
        let requestCity =
            { id: 1, name: 'city1' }
        let date = new Date();
        let mockWeatherForecast = {
            name: 'city1',
            details: {
                city_name: "city1",
                id: 1,
            },
            lastUpdatedTime: date

        }
        var get = sinon.stub(request, 'get');
        var repository = sinon.stub(WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast)
        var cityRepository = sinon.stub(CityRepository.prototype, 'findByName').resolves(requestCity)
        service.getWeatherForecast('city1').then(values => {
            repository.restore();
            get.restore();
            cityRepository.restore()
            done()
            expect(values.city_name).to.be.equal('city1');
            expect(values.id).to.be.equal(1);
            sinon.assert.notCalled(get)

        }).catch(err => {
            repository.restore();
            get.restore();
            cityRepository.restore()
            done(err)
        });
    });

    it('testing happy flow using stub when service called is  required as no data exists in db', (done) => {
        let service = new WeatherForecastService();
        let requestCity =
            { id: 222, name: 'city2' }


        let mockCurrentWeather = {
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

        }
        let mockWeatherForecast
        var repository = sinon.stub(WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast)
        var currentWeatherService = sinon.stub(CurrentWeatherService.prototype, 'getCurrentWeatherById').resolves(mockCurrentWeather)
        var cityRepository = sinon.stub(CityRepository.prototype, 'findByName').resolves(requestCity)
        var get = sinon.stub(request, 'get');

        let body = {
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

        }
        get.yields(null, null, body)
        service.getWeatherForecast('city2').then(values => {
            repository.restore();
            get.restore();
            currentWeatherService.restore()
            cityRepository.restore()
            done()
            expect(values.city_name).to.be.equal('city2');
            expect(values.id).to.be.equal(222);
            sinon.assert.calledOnce(get)
            sinon.assert.calledOnce(currentWeatherService)

        }).catch(err => {
            get.restore();
            repository.restore();
            cityRepository.restore()
            done(err)
        });
    });


    it('testing happy flow using stub when service called is  required as  data exists in db but not updated(exact two hours old)', (done) => {
        let service = new WeatherForecastService();
        let requestCity =
            { id: 121, name: 'city3' }
        let currentDate = new Date()

        let mockCurrentWeather = {
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

        }

        let mockWeatherForecast = {
            name: 'city3',
            details: {
                city_name: "city3",
                id: 121,
            },
            lastUpdatedTime: new Date(currentDate.getUTCMilliseconds() - (2 * 60 * 60 * 1000))

        }
        var repository = sinon.stub(WeatherForeCastRepository.prototype, 'get').resolves(mockWeatherForecast)
        var currentWeatherService = sinon.stub(CurrentWeatherService.prototype, 'getCurrentWeatherById').resolves(mockCurrentWeather)
        var cityRepository = sinon.stub(CityRepository.prototype, 'findByName').resolves(requestCity)
        var get = sinon.stub(request, 'get');

        let body = {
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

        }

        get.yields(null, null, body)
        service.getWeatherForecast('city3').then(values => {
            repository.restore();
            get.restore()
            currentWeatherService.restore()
            cityRepository.restore()
            done()
            expect(values.city_name).to.be.equal('city3');
            expect(values.id).to.be.equal(121);
            sinon.assert.calledOnce(get)
            sinon.assert.calledOnce(currentWeatherService)

        }).catch(err => {
            repository.restore();
            get.restore()
            cityRepository.restore()
            done(err)
        });

    });


});