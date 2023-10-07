"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmaskText = void 0;
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/g;
var re = new RegExp(defaultDelimiters);
function unmaskText(text) {
    return text ? String(text).replace(re, '') : text;
}
exports.unmaskText = unmaskText;
