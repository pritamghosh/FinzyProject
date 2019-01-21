import request  from 'request';
import { ApplicationConstant } from '../constants/application.constant';
import { WeatherForeCastRepository } from '../repository/weather.forecast.repository';
import { CityRepository } from '../repository/city.repository';
import { WeatherForecastModel } from '../models/weather.forecast.model';
import { CurrentWeatherService } from './current.weather.service';

//this class contails all methods related to  weather forecast and works as service layer
export class WeatherForecastService {



    // this method will return a weather forcast details  for a given city passing through parameter
    getWeatherForecast(cityName: string): Promise<any> {
        return new Promise((resolve,reject) => {
            let cityRepo = new CityRepository();
            cityRepo.findByName(cityName).then(value=>{
                resolve(this.getWeatherForecastById(value))
            }).catch(()=>reject())
        });


    }

    // this method will check if service call is requried or it will return forecast details from DB
    getWeatherForecastById(city: any): Promise<any> {
        
        let forecastRepository = new WeatherForeCastRepository();
        return new Promise((resolve, reject) => {
            forecastRepository.get(city.name).then((response) => {
                let isServiceCallRequired = true;           // this flas is being used to identify whether external service call is required or not ; 
                                                            //assuming there is no data in db so setting the flag as true.

                if (response) {
                    let timeDiffrence = new Date().getTime() - response.lastUpdatedTime.getTime()
                                                            // calculate time diffrecne b/w current time and last updated time
                    if (timeDiffrence < ApplicationConstant.REFRESH_TIMI_IN_MS) {
                                                            // change the falg as false is diffrecne is less than configured value
                                                            // and return details from db
                        isServiceCallRequired = false;
                        resolve(response.details);
                    }
                }
                if (isServiceCallRequired) {
                    // call service and update the bd with the latest data received from server for the corresponding city
                    request.get(this.generateWeatherForecastUrl(city.id), { json: true }, (err, res, body) => {
                        if (err) {
                            reject()
                        }
                        let forecastWeather = new WeatherForecastModel(body)
                        forecastRepository.update(forecastWeather)

                        let currentWeatherService = new CurrentWeatherService();
                        // fetch the curren weather for this city  
                        currentWeatherService.getCurrentWeatherById(city).then(value=>{
                            forecastWeather.setCurrentWeather(value);
                            resolve(forecastWeather);
                        })
                    });
                }
            });
        });

    }

    // this method will generate url for service call
    generateWeatherForecastUrl(id: number): string {
        return ApplicationConstant.WEATHER_FORECAST_URL + ApplicationConstant.ID + id + ApplicationConstant.APPI_ID + ApplicationConstant.APPI_KEY;
    }


}