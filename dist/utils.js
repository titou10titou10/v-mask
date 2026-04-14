"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmaskText = unmaskText;
const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/g;
const re = new RegExp(defaultDelimiters);
function unmaskText(text) {
    return text ? String(text).replace(re, '') : text;
}
