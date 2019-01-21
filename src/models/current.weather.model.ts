
export class CurrentWeather{
    
    public sunrise:Date;
    public sunset:Date;
    public city_name:string;
    public temp:string;
    public temp_min:string;
    public temp_max:string;
    //public cloudiness : string;
    public humidity : number;
    public pressure : number;
    public wind : string;
    public id:number;
    public description:string;

    constructor(response:any) {
        this.sunrise = new Date();
       // this.sunrise.setUTCMilliseconds(response.sys.sunrise)
        this.sunset = new Date();
       // this.sunset.setUTCMilliseconds(response.sys.sunset)
        this.city_name= response.name;
        this.temp_min = (response.main.temp_min-273).toFixed(2)
        this.temp_max = (response.main.temp_max-273).toFixed(2)
        this.temp = (response.main.temp-273).toFixed(2)
        this.humidity = response.main.humidity
        this.pressure = response.main.pressure-273
        this.description = response.weather[0].description
        this.id = response.id
        this.wind = 'speed = ' + response.wind.speed+ ' m/s at ' + response.wind.deg +' degree.'; 
    }

}