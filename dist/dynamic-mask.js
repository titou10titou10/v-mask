"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dynamicMask(maskit, masks, tokens) {
    masks = masks.slice().sort(function (a, b) { return a.length - b.length; });
    return function (value, mask, masked) {
        if (masked === void 0) { masked = true; }
        var i = 0;
        while (i < masks.length) {
            var currentMask = masks[i];
            i++;
            var nextMask = masks[i];
            // tslint:disable-next-line: max-line-length
            if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
                return maskit(value, currentMask, masked, tokens);
            }
        }
        return ''; // empty masks
    };
}
exports.default = dynamicMask;
