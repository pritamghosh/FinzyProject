import { Request, Response } from "express";
import { CurrentWeatherService } from "../services/current.weather.service";
import { CityService } from "../services/city.service";
import { WeatherForecastService } from "../services/weather.forecast.service";
import { resolve } from "dns";


export class HomeController {

    // controller method for initialize home page
    //PathPattern = "/""
    getCities(req: Request, res: Response) {
        
        let weatherService = new CurrentWeatherService();
        let cityService = new CityService();
        cityService.getAllCities().then(cityResponse => { 
            weatherService.getCurrentWeather(cityResponse).then(
                list =>{
                     res.status(200).send(list)
                }
            )
        });
    }

    // controller method for fetiching details for a given city
    //PathPattern = /details?city=${cityName}

    getDetails(req: Request, res: Response) {
        let weatherForecastService = new WeatherForecastService();
        weatherForecastService.getWeatherForecast(req.query.city)
            .then(value => res.status(200).send(value))
            .catch(() => res.status(404).send("Invalid request"));
    }






}
