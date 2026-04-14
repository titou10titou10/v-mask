"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const maskit_1 = __importDefault(require("./maskit"));
const dynamic_mask_1 = __importDefault(require("./dynamic-mask"));
const tokens_1 = __importDefault(require("./tokens"));
// Facade to maskit/dynamicMask when mask is String or Array
function default_1(value, mask, masked = true, tokens = tokens_1.default) {
    // disable on empty mask
    if (!mask) {
        return value;
    }
    return Array.isArray(mask)
        ? (0, dynamic_mask_1.default)(maskit_1.default, mask, tokens)
        : (0, maskit_1.default)(value, mask, masked, tokens);
}
