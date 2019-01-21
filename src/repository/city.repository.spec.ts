import sinon from 'sinon';
import { expect } from 'chai';

import { SchemaModel } from "../models/schema.model";
import { CityRepository } from "./city.repository";


describe('CityRepository.getAllCities()', () => {
    it('testcase for happy flow for fetching all city from db', (done) => {
        let repo = new CityRepository();
        let mockCities = [
            { id: 121, name: 'City 1' },
            { id: 123, name: 'City 2' }
        ]
        var modelStub = sinon.stub(SchemaModel.City, 'find').yields(null, mockCities);
        repo.getAllCities().then((values: any) => {

            expect(values.length).to.be.equal(2);
            expect(values[0].id).to.be.equal(121);
            expect(values[0].name).to.be.equal('City 1');
            expect(values[1].id).to.be.equal(123);
            expect(values[1].name).to.be.equal('City 2');
            modelStub.restore();
            done()
        }).catch(err => {
            modelStub.restore();
            done(err)
        })
    });
});


describe('CityRepository.findByName(name:string)', () => {
    it('testcase for happyflow for fetching city from db by name', (done) => {
        let repo = new CityRepository();
        let mockCities = [
            { id: 122, name: 'City 3' }
        ]
        var modelStub = sinon.stub(SchemaModel.City, 'findOne').yields(null, mockCities);
        repo.findByName('City 3').then((values: any) => {

            expect(values.length).to.be.equal(1);
            expect(values[0].id).to.be.equal(122);
            expect(values[0].name).to.be.equal('City 3');
            modelStub.restore();
            done()
        }).catch(err => {
            modelStub.restore();
            done(err)
        })
    });
});