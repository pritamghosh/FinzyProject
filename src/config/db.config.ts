
import mongoose from "mongoose";


export class DBConfig {

    constructor() {
        //Connect with mongo db
        mongoose.connect('mongodb://54.163.190.228:27017/finzy').then(
            () => {
                console.log('db connection is successfull');
            },
        ).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        });
    }
}

