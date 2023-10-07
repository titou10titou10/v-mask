"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var masker_1 = require("./masker");
var predefined_1 = require("./predefined");
var tokens_1 = require("./tokens");
var utils_1 = require("./utils");
function run(el, eventName, config, vnode) {
    // Handle when initial value is not set
    var beforeValue = el.value === 'undefined' ? '' : el.value;
    var position = el.selectionEnd;
    // save the character just inserted
    var digit = beforeValue[position - 1];
    el.value = (0, masker_1.default)(beforeValue, config.mask, config.masked, config.tokens);
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
    // Set unmasked value if required
    if (config.unmaskedVar) {
        var ut = (0, utils_1.unmaskText)(el.value);
        if (config.nullIfEmpty && ut.trim().length === 0) {
            // Set null instead of empty if required
            (0, lodash_1.set)(vnode.context, config.unmaskedVar, null);
        }
        else {
            if (config.number) {
                // Convert to number if required
                var vNumber = parseFloat(ut);
                (0, lodash_1.set)(vnode.context, config.unmaskedVar, isNaN(vNumber) ? ut : vNumber);
            }
            else {
                (0, lodash_1.set)(vnode.context, config.unmaskedVar, ut);
            }
        }
    }
    // Notify listeners only if value changed (ie send an extra 'input' event)
    if (beforeValue !== el.value) {
        el.dispatchEvent(event(eventName));
    }
}
// -------
// Helpers
// -------
function event(name) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt;
}
function getInput(el) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        var els = el.getElementsByTagName('input');
        if (els.length !== 1) {
            throw new Error("v-mask requires 1 input, found ".concat(els.length));
        }
        else {
            el = els[0];
        }
    }
    return el;
}
function getConfig(binding) {
    var config = {
        masked: true,
        mask: 'null',
        unmaskedVar: null,
        nullIfEmpty: true,
        number: false,
        tokens: tokens_1.default
    };
    if (typeof binding.value === 'string') {
        config.mask = binding.value;
    }
    else {
        Object.assign(config, binding.value);
    }
    // Capture ".number" modifier
    var modifiers = binding.modifiers;
    config.number = modifiers && modifiers.number;
    // Set mask from a predefined one eventually
    config.mask = (0, predefined_1.default)(config.mask) || config.mask || '';
    return config;
}
// -------------------------------
// Vue.js directive hook functions
// -------------------------------
function bind(el, binding, vnode) {
    if (binding.value === false) {
        return;
    }
    var realEl = getInput(el);
    run(realEl, 'input', getConfig(binding), vnode);
}
function componentUpdated(el, binding, vnode, oldVnode) {
    if (binding.value === false) {
        return;
    }
    // Prevent firing endless events
    var data = vnode.data.props || vnode.data.model;
    var oldData = oldVnode.data.props || oldVnode.data.model;
    if (data && data.value === oldData.value) {
        return;
    }
    var realEl = getInput(el);
    realEl.value = data ? data.value : realEl.value;
    run(realEl, 'input', getConfig(binding), vnode);
}
exports.default = { bind: bind, componentUpdated: componentUpdated };
