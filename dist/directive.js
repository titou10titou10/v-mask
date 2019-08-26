"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var masker_1 = require("./masker");
var predefined_1 = require("./predefined");
var tokens_1 = require("./tokens");
var utils_1 = require("./utils");
// Helpers
function event(name) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt;
}
function getInput(el) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        var els = el.getElementsByTagName('input');
        if (els.length !== 1) {
            throw new Error("v-mask requires 1 input, found " + els.length);
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
        tokens: tokens_1["default"]
    };
    if (typeof binding.value === 'string') {
        config.mask = binding.value;
    }
    else {
        Object.assign(config, binding.value);
    }
    // Set predefined eventually
    config.mask = predefined_1["default"](config.mask) || config.mask || '';
    return config;
}
function run(el, eventName, config, vnode) {
    // Handle when initial value is not set
    var val = el.value === 'undefined' ? '' : el.value;
    var position = el.selectionEnd;
    // save the character just inserted
    var digit = val[position - 1];
    el.value = masker_1["default"](val, config.mask, config.masked, config.tokens);
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
    // Set unmasked value
    if (config.unmaskedVar) {
        // set null instead of empty if required
        var ut = utils_1.unmaskText(el.value);
        if (config.nullIfEmpty && ut.trim().length === 0) {
            lodash_1.set(vnode.context, config.unmaskedVar, null);
        }
        else {
            lodash_1.set(vnode.context, config.unmaskedVar, ut);
        }
    }
    // Notify listeners
    el.dispatchEvent(event(eventName));
}
// Vue.js directive hooks
function bind(el, binding, vnode) {
    if (binding.value === false) {
        return;
    }
    el = getInput(el);
    run(el, 'input', getConfig(binding), vnode);
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
    el = getInput(el);
    el.value = data ? data.value : el.value;
    run(el, 'input', getConfig(binding), vnode);
}
exports["default"] = { bind: bind, componentUpdated: componentUpdated };
