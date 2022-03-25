"use strict";
exports.__esModule = true;
exports.unmaskText = exports.mask = void 0;
var directive_1 = require("./directive");
exports.mask = directive_1["default"];
var utils_1 = require("./utils");
exports.unmaskText = utils_1.unmaskText;
/* tslint:disable-next-line:variable-name */
function install(Vue) {
    Vue.directive('mask', directive_1["default"]);
}
exports["default"] = install;
