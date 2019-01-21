"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = require("chai");
var city_service_1 = require("./city.service");
var city_repository_1 = require("../repository/city.repository");
describe('CityService.getAllCities() ', function () {
    it('testing happy flow using stub', function (done) {
        var service = new city_service_1.CityService();
        var mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ];
        var repository = sinon_1.default.stub(city_repository_1.CityRepository.prototype, 'getAllCities').resolves(mockCities);
        service.getAllCities().then(function (values) {
            chai_1.expect(values.length).to.be.equal(2);
            chai_1.expect(values[0].id).to.be.equal(2);
            chai_1.expect(values[0].name).to.be.equal('Kolkata');
            chai_1.expect(values[1].id).to.be.equal(1);
            chai_1.expect(values[1].name).to.be.equal('Bengaluru');
            repository.restore();
            done();
        }).catch(function (err) {
            repository.restore();
            done(err);
        });
    });
});
