export default {
  '#': { pattern: /\d/ },
  'X': { pattern: /[0-9a-zA-Z]/ },
  'S': { pattern: /[a-zA-Z]/ },
  'A': { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
  'a': { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
  '!': { escape: true }
};
