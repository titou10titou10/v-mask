"use strict";
exports.__esModule = true;
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/g;
var re = new RegExp(defaultDelimiters);
function unmaskText(text) {
    return text ? String(text).replace(re, '') : text;
}
exports.unmaskText = unmaskText;
