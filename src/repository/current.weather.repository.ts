import { SchemaModel } from "../models/schema.model";
import { CurrentWeather } from "../models/current.weather.model";

//this class is responsinle for all db operation for Current_Weather collection 
export class CurrentWeatherRepository{

       // this method will insert or update a document in  Current_Weather collection 
    update(body:CurrentWeather){
        
        //at first it will find out if any entry is there or not for a given city name .
        // if there then it will update the same details with latest data
        //else save the data
        SchemaModel.CurrentWeather.findOne({name : body.city_name} , (err,currentWeatherResponse :any)=>{
            if(err){
               console.log('unable to find');
               
            }
            else{
                if(currentWeatherResponse){
                    currentWeatherResponse.details = body,
                    currentWeatherResponse.lastUpdatedTime = new Date()
                    currentWeatherResponse.save()
                }
                else{

                    // modifing data with updated detals
                    const currWeather = new SchemaModel.CurrentWeather({
                        name : body.city_name,
                        details : body,
                        lastUpdatedTime : new Date()
                    });
                    currWeather.save()
                }
            }
        })
    }

    
    // this method will return current weather  from db for a give city 
    get(name:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            SchemaModel.CurrentWeather.findOne({name : name} , (err,currentWeatherResponse :any)=>{
                if(err){
                    reject()
                }
                else{
                    resolve(currentWeatherResponse)
                    
                }
            })
        })
        
    }

}
