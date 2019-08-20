export default function dynamicMask(maskit: any , masks: any , tokens: any) {
  masks = masks.slice().sort((a: any, b: any) => a.length - b.length);
  return function(value: any, mask: any, masked = true) {
    let i = 0;
    while (i < masks.length) {
      const currentMask = masks[i];
      i++;
      const nextMask = masks[i];
      // tslint:disable-next-line: max-line-length
      if (! (nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length) ) {
        return maskit(value, currentMask, masked, tokens);
      }
    }
    return ''; // empty masks
  };
}
