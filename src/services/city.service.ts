import { CityRepository } from "../repository/city.repository";


// this calss is responsible for all operation related to cities and works as service layer
export class CityService{

    // this method will return all cities with their id from db
    getAllCities():Promise<any>{
        let cityRepository = new CityRepository();
        return cityRepository.getAllCities();
    }
}