
const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/g;
const re = new RegExp(defaultDelimiters);

export function unmaskText(text: string): string {
  return text ? String(text).replace(re, '') : text;
}
