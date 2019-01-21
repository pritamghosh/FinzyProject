import { expect } from 'chai';
import sinon from 'sinon';

import { CurrentWeatherRepository } from './current.weather.repository';
import { SchemaModel } from '../models/schema.model';
import { CurrentWeather } from '../models/current.weather.model';
import { WeatherForeCastRepository } from './weather.forecast.repository';
import { WeatherForecastModel } from '../models/weather.forecast.model';



describe('WeatherForeCastRepository.get(name:string)', () => {
    it('testcase for happyflow for fetching  weather forecast from db by city', (done) => {
        let repo = new WeatherForeCastRepository();
        let forecastMock =
            { id: 31, name: 'forecast 1' }

        var modelStub = sinon.stub(SchemaModel.WeatherForecast, 'findOne').yields(null, forecastMock);
        repo.get('city').then(value => {
            expect(value.name).to.equal('forecast 1');

            modelStub.restore()
            done()
        }).catch(err => {
            modelStub.restore()
            done(err)
        });
    });
});


describe('WeatherForeCastRepository.update(body:WeatherForecastModel)', () => {
    it('testcase for happyflow for updating weather frecast to db ', (done) => {
        let repo = new WeatherForeCastRepository();

        var modelStub = sinon.stub(SchemaModel.WeatherForecast, 'findOne').yields(null, null);
        const forecastWeather = new SchemaModel.WeatherForecast({
            name: 'city',
            details: {},
            lastUpdatedTime: new Date()
        });
        var modelStubSave = sinon.stub(forecastWeather, 'save').resolves();
        forecastWeather.save().then(() => {
            sinon.assert.calledOnce(modelStubSave);
        })
        repo.update({});
        modelStub.restore()
        modelStub.restore()
        done()

    });
});