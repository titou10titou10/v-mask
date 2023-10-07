"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmaskText = exports.mask = void 0;
var directive_1 = require("./directive");
exports.mask = directive_1.default;
var utils_1 = require("./utils");
Object.defineProperty(exports, "unmaskText", { enumerable: true, get: function () { return utils_1.unmaskText; } });
/* tslint:disable-next-line:variable-name */
function install(Vue) {
    Vue.directive('mask', directive_1.default);
}
exports.default = install;
