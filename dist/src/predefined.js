"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const predefined = [
    { id: 'credit-card', mask: '#### - #### - #### - ####' },
    { id: 'credit-card2', mask: '#### #### #### ####' },
    { id: 'date', mask: '##/##/####' },
    { id: 'date-iso', mask: '####-##-##' },
    { id: 'date-with-time', mask: '##/##/#### ##:##' },
    { id: 'phone', mask: '(###) ### - ####' },
    { id: 'phone2', mask: '### ### - ####' },
    { id: 'social', mask: '###-##-####' },
    { id: 'time', mask: '##:##' },
    { id: 'time-with-seconds', mask: '##:##:##' },
    { id: 'postalcode-ca', mask: 'A#A #A#' }
];
function default_1(mask) {
    const res = predefined.filter((p) => p.id === mask).map((p) => p.mask);
    return res ? res[0] : null;
}
