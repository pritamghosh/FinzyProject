import express from "express";
import cors from "cors";
import { HomeController } from "../controllers/home.controller";


export class App {


    app = express();

    constructor() {
        this.setPort();
        this.allowCORS();
        this.registerController();
        this.start();
    }


    //Configure Port
    setPort() {
        this.app.set("port", process.env.PORT || 3000);
    }

    // start server
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                this.app.get("port"),
                this.app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }

    // this method will register path patter with controller
    registerController() {
        let controller = new HomeController()
        this.app.get("/", controller.getCities);
        this.app.get("/details", controller.getDetails);
    }

    allowCORS() {
        this.app.use(cors());
    }

}





