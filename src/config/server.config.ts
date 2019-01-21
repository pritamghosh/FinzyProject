import { App } from "./app.config";
import { DBConfig } from "./db.config";


export class Server{
    constructor(){
        //call db configuration and intialize connection
        new DBConfig();
        //call server configuration and intialize
        new App();

    }

}

