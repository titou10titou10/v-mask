"use strict";
exports.__esModule = true;
var masker_1 = require("./masker");
var tokens_1 = require("./tokens");
var preDefined = new Map();
preDefined.set('credit-card', '#### - #### - #### - ####');
preDefined.set('date', '##/##/####');
preDefined.set('date-with-time', '##/##/#### ##:##');
preDefined.set('phone', '(###) ### - ####');
preDefined.set('social', '###-##-####');
preDefined.set('time', '##:##');
preDefined.set('time-with-seconds', '##:##:##');
preDefined.set('postalcode-ca', 'A#A #A#');
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/;
var re = new RegExp(defaultDelimiters, 'g');
var unmaskText = function (text) {
    return text ? String(text).replace(re, '') : text;
};
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
        var m = preDefined.get(config.mask);
        config.mask = m || config.mask || '';
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
                var uv = unmaskText(el.value);
                vnode.context[config.unmaskedVar] = uv;
            }
            el.dispatchEvent(event('input'));
        };
        var newDisplay = masker_1["default"](el.value, config.mask, config.masked, config.tokens);
        if (newDisplay !== el.value) {
            el.value = newDisplay;
            if (config.unmaskedVar) {
                var uv = unmaskText(el.value);
                vnode.context[config.unmaskedVar] = uv;
            }
            el.dispatchEvent(event('input'));
        }
    }
};
