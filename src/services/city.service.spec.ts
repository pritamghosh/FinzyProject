import sinon from "sinon";
import { expect } from 'chai';

import { CityService } from "./city.service";
import { CityRepository } from "../repository/city.repository";

describe('CityService.getAllCities() ', () => {
    it('testing happy flow using stub', (done) => {
        let service = new CityService();
        let mockCities = [
            { id: 2, name: 'Kolkata' },
            { id: 1, name: 'Bengaluru' }
        ]
        var repository = sinon.stub(CityRepository.prototype, 'getAllCities').resolves(mockCities)
        service.getAllCities().then(values => {
            expect(values.length).to.be.equal(2);
            expect(values[0].id).to.be.equal(2);
            expect(values[0].name).to.be.equal('Kolkata');
            expect(values[1].id).to.be.equal(1);
            expect(values[1].name).to.be.equal('Bengaluru');
            repository.restore();
            done()

        }).catch(err => {
            repository.restore();
            done(err)
        });
    });
});