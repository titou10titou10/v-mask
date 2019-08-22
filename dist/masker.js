"use strict";
exports.__esModule = true;
var maskit_1 = require("./maskit");
var dynamic_mask_1 = require("./dynamic-mask");
var tokens_1 = require("./tokens");
// Facade to maskit/dynamicMask when mask is String or Array
function default_1(value, mask, masked, tokens) {
    if (masked === void 0) { masked = true; }
    if (tokens === void 0) { tokens = tokens_1["default"]; }
    // disable on empty mask
    if (!mask) {
        return value;
    }
    return Array.isArray(mask)
        ? dynamic_mask_1["default"](maskit_1["default"], mask, tokens)
        : maskit_1["default"](value, mask, masked, tokens);
}
exports["default"] = default_1;
