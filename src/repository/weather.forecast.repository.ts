import { SchemaModel } from "../models/schema.model";
import { WeatherForecastModel } from "../models/weather.forecast.model";

//this class is responsinle for all db operation for Weather_Forecast collection 
export class WeatherForeCastRepository{


    // this method will insert or update a document in  Weather_Forecast collection 
    update(body:any){
        
        // at first it will find out if any entry is there or not for a given city name .
        // if there then it will update the same details with latest data
        //else save the data
        SchemaModel.WeatherForecast.findOne({name : body.city_name} , (err,response :any)=>{
            if(err){
               console.log('unable to find');
               
            }
            else{
                if(response){
                    // modifing entry with updated data
                    response.details = body,
                    response.lastUpdatedTime = new Date()
                    response.save()
                }
                else{
                    const forecast = new SchemaModel.WeatherForecast({
                        name : body.city_name,
                        details : body,
                        lastUpdatedTime : new Date()
                    });
                    forecast.save()
                }
            }
        })
        
    }


    // this method will return weather forcast from db for a give city 
    get(name:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            SchemaModel.WeatherForecast.findOne({name : name} , (err,forecast :any)=>{
                if(err){
                    reject()
                }
                else{
                    resolve(forecast)
                    
                }
            })
        })
        
    }

}
