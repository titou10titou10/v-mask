export default function maskit(value: string,
                               mask: string,
                               masked = true,
                               tokens) {

  const val = value || '';
  const m = mask || '';
  let iMask = 0;
  let iValue = 0;
  let output = '';
  let cMask;
  while (iMask < m.length && iValue < val.length) {
    cMask = m[iMask];
    const masker = tokens[cMask];
    const cValue = val[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = m[iMask];
      }
      if (masked) { output += cMask; }
      if (cValue === cMask) { iValue++; } // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = '';
  while (iMask < m.length && masked) {
    cMask = m[iMask];
    if (tokens[cMask]) {
      restOutput = '';
      break;
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}
