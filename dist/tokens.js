"use strict";
exports.__esModule = true;
exports["default"] = {
    '#': { pattern: /\d/ },
    'X': { pattern: /[0-9a-zA-Z]/ },
    'S': { pattern: /[a-zA-Z]/ },
    'A': { pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleUpperCase(); } },
    'a': { pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleLowerCase(); } },
    '!': { escape: true }
};
