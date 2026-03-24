"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const masker_1 = __importDefault(require("./masker"));
const predefined_1 = __importDefault(require("./predefined"));
const tokens_1 = __importDefault(require("./tokens"));
const utils_1 = require("./utils");
function run(el, eventName, config, vnode) {
    // Handle when initial value is not set
    const beforeValue = el.value === 'undefined' ? '' : el.value;
    let position = el.selectionEnd;
    // save the character just inserted
    const digit = beforeValue[position - 1];
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
        const ut = (0, utils_1.unmaskText)(el.value);
        if (config.nullIfEmpty && ut.trim().length === 0) {
            // Set null instead of empty if required
            (0, lodash_1.set)(vnode.context, config.unmaskedVar, null);
        }
        else {
            if (config.number) {
                // Convert to number if required
                const vNumber = parseFloat(ut);
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
    const evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt;
}
function getInput(el) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const els = el.getElementsByTagName('input');
        if (els.length !== 1) {
            throw new Error(`v-mask requires 1 input, found ${els.length}`);
        }
        else {
            el = els[0];
        }
    }
    return el;
}
function getConfig(binding) {
    const config = {
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
    const modifiers = binding.modifiers;
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
    const realEl = getInput(el);
    run(realEl, 'input', getConfig(binding), vnode);
}
function componentUpdated(el, binding, vnode, oldVnode) {
    if (binding.value === false) {
        return;
    }
    // Prevent firing endless events
    const data = vnode.data.props || vnode.data.model;
    const oldData = oldVnode.data.props || oldVnode.data.model;
    if (data && data.value === oldData.value) {
        return;
    }
    const realEl = getInput(el);
    realEl.value = data ? data.value : realEl.value;
    run(realEl, 'input', getConfig(binding), vnode);
}
exports.default = { bind, componentUpdated };
