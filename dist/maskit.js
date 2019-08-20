"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function maskit(value, mask, masked = true, tokens) {
    value = value || '';
    mask = mask || '';
    let iMask = 0;
    let iValue = 0;
    let output = '';
    let cMask;
    while (iMask < mask.length && iValue < value.length) {
        cMask = mask[iMask];
        const masker = tokens[cMask];
        const cValue = value[iValue];
        if (masker && !masker.escape) {
            if (masker.pattern.test(cValue)) {
                output += masker.transform ? masker.transform(cValue) : cValue;
                iMask++;
            }
            iValue++;
        }
        else {
            if (masker && masker.escape) {
                iMask++; // take the next mask char and treat it as char
                cMask = mask[iMask];
            }
            if (masked) {
                output += cMask;
            }
            if (cValue === cMask) {
                iValue++;
            } // user typed the same char
            iMask++;
        }
    }
    // fix mask that ends with a char: (#)
    let restOutput = '';
    while (iMask < mask.length && masked) {
        cMask = mask[iMask];
        if (tokens[cMask]) {
            restOutput = '';
            break;
        }
        restOutput += cMask;
        iMask++;
    }
    return output + restOutput;
}
exports.default = maskit;
