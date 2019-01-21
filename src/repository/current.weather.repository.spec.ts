import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from "mongoose";

import { CurrentWeatherRepository } from './current.weather.repository';
import { SchemaModel } from '../models/schema.model';
import { CurrentWeather } from '../models/current.weather.model';



describe('CurrentWeatherRepository.get(name:string)', () => {
  it('testcase for happyflow for fetching current weather from db by city', (done) => {
    let repo = new CurrentWeatherRepository();
    let mockCurrentWeathers =
      { id: 21, name: 'Weather 1' }

    var modelStub = sinon.stub(SchemaModel.CurrentWeather, 'findOne').yields(null, mockCurrentWeathers);
    repo.get('city').then(value => {
      expect(value.name).to.equal('Weather 1');

      modelStub.restore()
      done()
    }).catch(err => {
      modelStub.restore()
      done(err)
    });
  });
});


describe('CurrentWeatherRepository.update(body:CurrentWeather))', () => {
  it('testcase for happyflow for updating current weather  to db ', (done) => {
    let repo = new CurrentWeatherRepository();
    let mockCurrentWeathers: any = {
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
    }
    var modelStub = sinon.stub(SchemaModel.CurrentWeather, 'findOne').yields(null, null);
    const currWeather = new SchemaModel.CurrentWeather({
      name: mockCurrentWeathers.city_name,
      details: mockCurrentWeathers,
      lastUpdatedTime: new Date()
    });
    var modelStubSave = sinon.stub(currWeather, 'save').resolves();
    currWeather.save().then(() => {
      sinon.assert.calledOnce(modelStubSave);
    })
    repo.update(mockCurrentWeathers);
    modelStub.restore()
    modelStub.restore()
    done()

  });
});