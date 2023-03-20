"use strict";
exports.__esModule = true;
function maskit(value, mask, masked, tokens) {
    if (masked === void 0) { masked = true; }
    var val = value || '';
    var m = mask || '';
    var iMask = 0;
    var iValue = 0;
    var output = '';
    var cMask;
    while (iMask < m.length && iValue < val.length) {
        cMask = m[iMask];
        var masker = tokens[cMask];
        var cValue = val[iValue];
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
                cMask = m[iMask];
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
    var restOutput = '';
    while (iMask < m.length && masked) {
        cMask = m[iMask];
        if (tokens[cMask]) {
            restOutput = '';
            break;
        }
        restOutput += cMask;
        iMask++;
    }
    return output + restOutput;
}
exports["default"] = maskit;
