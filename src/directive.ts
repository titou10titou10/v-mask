import { set } from 'lodash';

import masker from './masker';
import predefinedMasks from './predefined';
import tokens from './tokens';
import { unmaskText } from './utils';

function run(el , eventName: string, config, vnode) {

  // Handle when initial value is not set
  const beforeValue = el.value === 'undefined' ? '' : el.value;

  let position = el.selectionEnd;
  // save the character just inserted
  const digit = beforeValue[position - 1];
  el.value = masker(beforeValue, config.mask, config.masked, config.tokens);
  // if the digit was changed, increment position until find the digit again
  while (position < el.value.length &&
        el.value.charAt(position - 1) !== digit) {
          position++;
  }

  if (el === document.activeElement) {
    el.setSelectionRange(position, position);
    setTimeout(function() {
      el.setSelectionRange(position, position);
    }, 0);
  }

  // Set unmasked value if required
  if (config.unmaskedVar) {
    const ut = unmaskText(el.value);

    if (config.nullIfEmpty && ut.trim().length === 0) {
      // Set null instead of empty if required
      set(vnode.context, config.unmaskedVar, null);
    } else {
      if (config.number) {
        // Convert to number if required
        const vNumber = parseFloat(ut);
        set(vnode.context, config.unmaskedVar, isNaN(vNumber) ? ut : vNumber);
      } else {
        set(vnode.context, config.unmaskedVar, ut);
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
function event(name: string) {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}

function getInput(el) {
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error(`v-mask requires 1 input, found ${els.length}`);
    } else { el = els[0]; }
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
    tokens
  };

  if (typeof binding.value === 'string') {
     config.mask = binding.value ;
  } else {
    Object.assign(config, binding.value);
  }

  // Capture ".number" modifier
  const modifiers = binding.modifiers;
  config.number = modifiers && modifiers.number;

  // Set mask from a predefined one eventually
  config.mask = predefinedMasks(config.mask) ||  config.mask || '';
  return config;
}

// -------------------------------
// Vue.js directive hook functions
// -------------------------------
function bind(el, binding, vnode) {
  if (binding.value === false) { return; }

  const realEl = getInput(el);
  run(realEl, 'input', getConfig(binding), vnode);
}

function componentUpdated(el, binding, vnode, oldVnode) {
  if (binding.value === false) { return; }

  // Prevent firing endless events
  const data = vnode.data.props || vnode.data.model;
  const oldData = oldVnode.data.props || oldVnode.data.model;
  if (data && data.value === oldData.value) { return; }

  const realEl =  getInput(el);
  realEl.value = data ? data.value : realEl.value;
  run(realEl, 'input', getConfig(binding), vnode);
}

export default { bind, componentUpdated };
