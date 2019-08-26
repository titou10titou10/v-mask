
import { set } from 'lodash';

import masker from './masker';
import getPredefined from './predefined';
import tokens from './tokens';
import { unmaskText } from './utils';

// Helpers
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
    tokens
  };

  if (typeof binding.value === 'string') {
     config.mask = binding.value ;
  } else {
    Object.assign(config, binding.value);
  }

  // Set predefined eventually
  config.mask = getPredefined(config.mask) ||  config.mask || '';
  return config;
}

function run(el , eventName: string, config, vnode) {

  // Handle when initial value is not set
  const val = el.value === 'undefined' ? '' : el.value;

  let position = el.selectionEnd;
  // save the character just inserted
  const digit = val[position - 1];
  el.value = masker(val, config.mask, config.masked, config.tokens);
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

  // Set unmasked value
  if (config.unmaskedVar) {
    // set null instead of empty if required
    const ut = unmaskText(el.value);
    if (config.nullIfEmpty && ut.trim().length === 0) {
      set(vnode.context, config.unmaskedVar, null);
    } else {
      set(vnode.context, config.unmaskedVar, ut);
    }
  }

  // Notify listeners
  el.dispatchEvent(event(eventName));
}

// Vue.js directive hooks

function bind(el, binding, vnode) {
  if (binding.value === false) { return; }

  el = getInput(el);
  run(el, 'input', getConfig(binding), vnode);
}

function componentUpdated(el, binding, vnode, oldVnode) {
  if (binding.value === false) { return; }

  // Prevent firing endless events
  const data = vnode.data.props || vnode.data.model;
  const oldData = oldVnode.data.props || oldVnode.data.model;
  if (data && data.value === oldData.value) { return; }

  el = getInput(el);
  el.value = data ? data.value : el.value;
  run(el, 'input', getConfig(binding), vnode);
}

export default { bind, componentUpdated };