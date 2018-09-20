const chai              = require('chai');
const chaiAsPromised    = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const subject = require('../index');

/**
 * Test Vactors
 */
let validPayload = {
    payerPartyId: 'xyz',
    payerAccount: 'xyz123',
    receiverPartyId: 'pqr',
    receiverAccount: 'pqr123',
    date: '2018-11-11',
    currency: 'USD',
    amount: 1500
}

let corruptPayload = {
    payerPartyId: 'xyz',
    receiverPartyId: 'pqr',
    receiverAccount: 'pqr123',
    date: '2018-11',
    currency: 'USD',
    amount: '1500'
}

describe('Positive Cases', () => {
    it('Validation should succeed', () => {
        return expect(subject.validateStlParams(validPayload)).to.be.fulfilled;
    })
});

describe('Negative Cases', () => {
    it('Validation should fail', () => {
        return expect(subject.validateStlParams(corruptPayload)).to.be.rejected;
    })
})