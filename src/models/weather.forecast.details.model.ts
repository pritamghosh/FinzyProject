export class WeatherForecastDetailsModel{

    public time : Date
    public temp:string;
    public temp_min:string;
    public temp_max:string;
    public humidity : number;
    public pressure : number;
    public sea_level: number;
    public grnd_level: number;
    public wind : string;
    public description:string;

    constructor(response:any) {
        this.time = new Date();
        this.time.setUTCMilliseconds(response.dt)
        this.temp_min = (response.main.temp_min-273).toFixed(2)
        this.temp_max = (response.main.temp_max-273).toFixed(2)
        this.temp = (response.main.temp-273).toFixed(2)
        this.humidity = response.main.humidity
        this.pressure = response.main.pressure
        this.description = response.weather[0].description
        this.wind = 'speed = ' + response.wind.speed+ ' m/s at ' + response.wind.deg +' degree.'; 
        this.sea_level = response.main.sea_level;
        this.grnd_level = response.main.grnd_level
    }


}