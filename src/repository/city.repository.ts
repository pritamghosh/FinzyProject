import { SchemaModel } from "../models/schema.model";


//this class is responsinle for all db operation for City collection 
export class CityRepository {

    // this method will return all cities with their id from db
    getAllCities() {
        return new Promise((resolve, reject) => {
            SchemaModel.City.find((err, cityRespose: []) => {
                if (err) {
                    reject()
                }
                else {
                    resolve(cityRespose)
                }
            })

        });
    }

    // this method will return  city  from db for the given id 
    findByName(name:string) {
        return new Promise((resolve, reject) => {
            SchemaModel.City.findOne({name:name},(err, cityRespose:any) => {
                if (err) {
                    reject()
                }
                else {
                    if(cityRespose){
                        resolve(cityRespose)
                    }
                    else{
                        reject()
                    }
                    
                }
            })

        });
    }
}