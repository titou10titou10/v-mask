
import { set } from 'lodash';

import masker from './masker';
import getPredefined from './predefined';
import { unmaskText } from './utils';
import tokens from './tokens';

function event(name: string) {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}

export const mask = {
  bind(el: any, binding: any, vnode: any) {
    // console.log ('bind');
    let config = binding.value || {};

    if (Array.isArray(config) || typeof config === 'string') {
      config = {
        masked: true,
        mask: config,
        unmaskedVar: null,
        tokens
      };
    }
    config.mask = getPredefined(config.mask) ||  config.mask || '';

    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      const els = el.getElementsByTagName('input');
      if (els.length !== 1) {
        throw new Error('v-mask directive requires 1 input, found '
        + els.length);
      } else {
        el = els[0];
      }
    }

    el.oninput = function(evt: any) {
      if (!evt.isTrusted) { return; } // avoid infinite loop
      // by default, keep cursor at same position as before the mask
      let position = el.selectionEnd;
      // save the character just inserted
      const digit = el.value[position - 1];
      el.value = masker(el.value, config.mask, config.masked, config.tokens);
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
      if (config.unmaskedVar) {
        set(vnode.context, config.unmaskedVar, unmaskText(el.value));
      }
      el.dispatchEvent(event('input'));
    };

    const newDisplay = masker(el.value,
                              config.mask,
                              config.masked,
                              config.tokens);
    if (newDisplay !== el.value) {
      el.value = newDisplay;
      if (config.unmaskedVar) {
        set(vnode.context, config.unmaskedVar, unmaskText(el.value));
      }
      el.dispatchEvent(event('input'));
    }
  }
};
