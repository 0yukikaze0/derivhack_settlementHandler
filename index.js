const axios     = require('axios');
const moment    = require('moment');

const SVC_URL = 'https://settlement.service.regnosys.com/settle';

let paramSchema = {
    payerPartyId: 'string',
    payerAccount: 'string',
    receiverPartyId: 'string',
    receiverAccount: 'string',
    date: 'string',
    currency: 'string',
    amount: 'number'
}
const transmitSettlement = (payload) => {
    return new Promise((resolve, reject) => {
        /**
         * -> Validate
         * -> Transmit
         * -> Resolve result
         */
        validateStlParams(payload)
            .then(  () => {
                        axios.post(SVC_URL, payload)
                            .then((result) => resolve(result.data))
                        },
                    (errors) => reject(errors))
    })
    .catch((error) => {throw error});
}

const validateStlParams = (payload) => {
    return new Promise((resolve, reject) => {
        let errors = [];
        /** Check if the input contains all the manadatory fields */
        for(let key in paramSchema){
            if(payload[key]) {
                /**
                 * We found a match. Check if the datatype is valid
                 */
                let subject = payload[key];
                switch (paramSchema[key]) {
                    case 'date':
                        if(subject.length < 10 || !moment(subject,'YYYY-MM-DD', true).isValid()){
                            errors.push(`Invalid date format for [${key}] => Expected <YYYY-MM-DD>`)
                        }
                        break;
                
                    default:
                        if (typeof (subject) !== paramSchema[key]) {
                            errors.push(`Datatype mismatch for [${key}] => Expected <${paramSchema[key]}> Got <${typeof(subject)}>`)
                        }
                        break;
                }
            } else {
                errors.push(`Missing param : ${key}`);
            }
        }

        if(errors.length > 0) {
            reject(errors);
        } else {
            resolve('valid');
        }
    })
    .catch((error) => {throw error});
}

module.exports.validateStlParams    = validateStlParams;
module.exports.transmitSettlement   = transmitSettlement;