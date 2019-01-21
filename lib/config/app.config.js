"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var home_controller_1 = require("../controllers/home.controller");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.setPort();
        this.allowCORS();
        this.registerController();
        this.start();
    }
    //Configure Port
    App.prototype.setPort = function () {
        this.app.set("port", process.env.PORT || 3000);
    };
    // start server
    App.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("  App is running at http://localhost:%d in %s mode", _this.app.get("port"), _this.app.get("env"));
            console.log("  Press CTRL-C to stop\n");
        });
    };
    // this method will register path patter with controller
    App.prototype.registerController = function () {
        var controller = new home_controller_1.HomeController();
        this.app.get("/", controller.getCities);
        this.app.get("/details", controller.getDetails);
    };
    App.prototype.allowCORS = function () {
        this.app.use(cors_1.default());
    };
    return App;
}());
exports.App = App;
