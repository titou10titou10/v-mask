"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var masker_1 = require("./masker");
var predefined_1 = require("./predefined");
var utils_1 = require("./utils");
var tokens_1 = require("./tokens");
function event(name) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt;
}
exports.mask = {
    bind: function (el, binding, vnode) {
        // console.log ('bind');
        var config = binding.value || {};
        if (Array.isArray(config) || typeof config === 'string') {
            config = {
                masked: true,
                mask: config,
                unmaskedVar: null,
                tokens: tokens_1["default"]
            };
        }
        config.mask = predefined_1["default"](config.mask) || config.mask || '';
        if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
            var els = el.getElementsByTagName('input');
            if (els.length !== 1) {
                throw new Error('v-mask directive requires 1 input, found '
                    + els.length);
            }
            else {
                el = els[0];
            }
        }
        el.oninput = function (evt) {
            if (!evt.isTrusted) {
                return;
            } // avoid infinite loop
            // by default, keep cursor at same position as before the mask
            var position = el.selectionEnd;
            // save the character just inserted
            var digit = el.value[position - 1];
            el.value = masker_1["default"](el.value, config.mask, config.masked, config.tokens);
            // if the digit was changed, increment position until find the digit again
            while (position < el.value.length &&
                el.value.charAt(position - 1) !== digit) {
                position++;
            }
            if (el === document.activeElement) {
                el.setSelectionRange(position, position);
                setTimeout(function () {
                    el.setSelectionRange(position, position);
                }, 0);
            }
            if (config.unmaskedVar) {
                lodash_1.set(vnode.context, config.unmaskedVar, utils_1.unmaskText(el.value));
            }
            el.dispatchEvent(event('input'));
        };
        var newDisplay = masker_1["default"](el.value, config.mask, config.masked, config.tokens);
        if (newDisplay !== el.value) {
            el.value = newDisplay;
            if (config.unmaskedVar) {
                lodash_1.set(vnode.context, config.unmaskedVar, utils_1.unmaskText(el.value));
            }
            el.dispatchEvent(event('input'));
        }
    }
};
