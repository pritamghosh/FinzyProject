import request  from 'request';
import { ApplicationConstant } from '../constants/application.constant';
import { CurrentWeatherRepository } from '../repository/current.weather.repository';
import { CurrentWeather } from '../models/current.weather.model';


//this class contails all methods related to current weather and works as service layer
export class CurrentWeatherService {

    // this method will return a cuurent weatehr details  for all cites passed as parameter
    getCurrentWeather(cityRespose: any[]): Promise<CurrentWeather[]> {
        return new Promise((resolve, reject) => {
            let promiseArray = [];
            for (var i = 0; i < cityRespose.length; i++) {
                //pushing all response in a promise array for synchronisation purpose
                promiseArray.push(this.getCurrentWeatherById(cityRespose[i]));
            }
            Promise.all(promiseArray).then(values => {
                resolve(values);
            });
        });
    }
    //this method will return  current weatehr for a given city passed as parameter
    getCurrentWeatherById(city: any): Promise<any> {


        return new Promise((resolve, reject) => {
            let cityWeatherRepository = new CurrentWeatherRepository();
            cityWeatherRepository.get(city.name).then((response) => {
                let isServiceCallRequired = true;        // this flas is being used to identify whether external service call is required or not ; 
                                                         //assuming there is no data in db so setting the flag as true.
                if (response) {
                    let timeDiffrence = new Date().getTime() - response.lastUpdatedTime.getTime()
                                                        // callculate time diffrence between last updated time and and current time 
                    if (timeDiffrence < ApplicationConstant.REFRESH_TIMI_IN_MS) {
                                                        // if data in db and diffrence is less tha configured value , 
                                                        //setting the flag as false and returneg data from db

                        isServiceCallRequired = false;
                        resolve(response.details);
                    }
                }
                if (isServiceCallRequired) {
                    // call external service and update db with updated data
                    request.get(this.generateCurrentWeatherUrl(city.id), { json: true }, (err, res, body) => {
                    
                        if (err) {
                            reject()
                        }
                        let currentWeather = new CurrentWeather(body)
                        cityWeatherRepository.update(currentWeather)
                        resolve(currentWeather)
                    });
                }
            });
        });







    }

    // this method will generate url for service call
    generateCurrentWeatherUrl(id: number): string {
        return ApplicationConstant.CURRENT_WEATHER_URL + ApplicationConstant.ID + id + ApplicationConstant.APPI_ID + ApplicationConstant.APPI_KEY;
    }


}