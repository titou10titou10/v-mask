"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmaskText = exports.mask = void 0;
const directive_1 = __importDefault(require("./directive"));
exports.mask = directive_1.default;
const utils_1 = require("./utils");
Object.defineProperty(exports, "unmaskText", { enumerable: true, get: function () { return utils_1.unmaskText; } });
/* tslint:disable-next-line:variable-name */
function install(Vue) {
    Vue.directive('mask', directive_1.default);
}
exports.default = install;
