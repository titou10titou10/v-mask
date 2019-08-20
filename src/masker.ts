import maskit from './maskit';
import dynamicMask from './dynamic-mask';
import defaultTokens from './tokens';

// Facade to maskit/dynamicMask when mask is String or Array
export default function(value: string,
                        mask: string,
                        masked = true,
                        tokens = defaultTokens) {
  // disable on empty mask
  if (!mask) {
    return value;
  }

  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)
    : maskit(value, mask, masked, tokens);
}
