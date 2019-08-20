"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dynamicMask(maskit, masks, tokens) {
    masks = masks.slice().sort((a, b) => a.length - b.length);
    return function (value, mask, masked = true) {
        let i = 0;
        while (i < masks.length) {
            const currentMask = masks[i];
            i++;
            const nextMask = masks[i];
            // tslint:disable-next-line: max-line-length
            if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
                return maskit(value, currentMask, masked, tokens);
            }
        }
        return ''; // empty masks
    };
}
exports.default = dynamicMask;
