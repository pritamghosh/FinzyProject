"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = require("chai");
var schema_model_1 = require("../models/schema.model");
var city_repository_1 = require("./city.repository");
describe('CityRepository.getAllCities()', function () {
    it('testcase for happy flow for fetching all city from db', function (done) {
        var repo = new city_repository_1.CityRepository();
        var mockCities = [
            { id: 121, name: 'City 1' },
            { id: 123, name: 'City 2' }
        ];
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.City, 'find').yields(null, mockCities);
        repo.getAllCities().then(function (values) {
            chai_1.expect(values.length).to.be.equal(2);
            chai_1.expect(values[0].id).to.be.equal(121);
            chai_1.expect(values[0].name).to.be.equal('City 1');
            chai_1.expect(values[1].id).to.be.equal(123);
            chai_1.expect(values[1].name).to.be.equal('City 2');
            modelStub.restore();
            done();
        }).catch(function (err) {
            modelStub.restore();
            done(err);
        });
    });
});
describe('CityRepository.findByName(name:string)', function () {
    it('testcase for happyflow for fetching city from db by name', function (done) {
        var repo = new city_repository_1.CityRepository();
        var mockCities = [
            { id: 122, name: 'City 3' }
        ];
        var modelStub = sinon_1.default.stub(schema_model_1.SchemaModel.City, 'findOne').yields(null, mockCities);
        repo.findByName('City 3').then(function (values) {
            chai_1.expect(values.length).to.be.equal(1);
            chai_1.expect(values[0].id).to.be.equal(122);
            chai_1.expect(values[0].name).to.be.equal('City 3');
            modelStub.restore();
            done();
        }).catch(function (err) {
            modelStub.restore();
            done(err);
        });
    });
});
