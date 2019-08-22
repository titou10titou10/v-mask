"use strict";
exports.__esModule = true;
var predefined = [
    { id: 'credit-card', mask: '#### - #### - #### - ####' },
    { id: 'date', mask: '##/##/####' },
    { id: 'date-with-time', mask: '##/##/#### ##:##' },
    { id: 'phone', mask: '(###) ### - ####' },
    { id: 'social', mask: '###-##-####' },
    { id: 'time', mask: '##:##' },
    { id: 'time-with-seconds', mask: '##:##:##' },
    { id: 'postalcode-ca', mask: 'A#A #A#' }
];
function default_1(mask) {
    var res = predefined.filter(function (p) { return p.id === mask; }).map(function (p) { return p.mask; });
    return res ? res[0] : null;
}
exports["default"] = default_1;
