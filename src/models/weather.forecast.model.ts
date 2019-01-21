import { CurrentWeather } from "./current.weather.model";
import { WeatherForecastDetailsModel } from "./weather.forecast.details.model";

export class WeatherForecastModel{

    public city_name:string;
    public id:number;
    public currentWeather : CurrentWeather | undefined ;
    public forecast : WeatherForecastDetailsModel[] =[];
    constructor(response:any) {
        this.city_name= response.city.name;
        this.id = response.city.id
        for(var i = 0 ; i <response.list.length ; i++){
            this.forecast.push(new WeatherForecastDetailsModel(response.list[i]))
        }
    }

    setCurrentWeather(currentWeatherParam : CurrentWeather){
        this.currentWeather = currentWeatherParam;
    }


}