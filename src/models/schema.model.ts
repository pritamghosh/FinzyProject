import mongoose from "mongoose";

export namespace SchemaModel {

    // export type CitySchema = mongoose.Document & {
    //     id: number,
    //     name: string,
    // }

    const CitySchema = new mongoose.Schema(
        {
            id: { type: Number, unique: true },
            name: String
        }
    );

    const CurrentWeatherSchema = new mongoose.Schema(
        {
            name: { type: String, unique: true },
            details: {},
            lastUpdatedTime: Date

        }
    );


    const WeatherForecastSchema = new mongoose.Schema(
        {
            name: { type: String, unique: true },
            details: {},
            lastUpdatedTime: Date

        }
    );

    export const City = mongoose.model("City", CitySchema, "City");
    export const CurrentWeather = mongoose.model("CurrentWeather", CurrentWeatherSchema, "Current_Weather");
    export const WeatherForecast = mongoose.model("WeatherForecast", WeatherForecastSchema, "Weather_Forecast");



}