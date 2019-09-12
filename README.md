### @titou10/v-mask
**A vue.js package that provides a directive to apply a mask to input tags**

### TL;DR;
A`"mask"` directive for Vue.js that sets the **masked** and **unmasked** value of an`"input"`component (eg the `"v-text-field"` component from vuetify)

#### The differences with`"vue-the-mask"`:
- "v-model" will always contain the masked value, the directive may also set the unmasked value to a specified variable (see below)
- the package provides predefined masks (see below)
- the package does not include a Vue.js component, just a directive

### Install

```sh
npm install @titou10/v-mask --save
yarn add @titou10/v-mask
bower install @titou10/v-mask --save
```
### Usage
```js
import { mask } from ' @titou10/v-mask'
export default {
  directives: { mask }
}
<v-text-field v-model="..." v-mask="{mask:'A##', unmaskedVar: 'myVar'}" />
<v-text-field v-model="..." v-mask="'A#'" />
<v-text-field v-model="..." v-mask.number="{mask:'##', unmaskedVar: 'myVar'}" />
<v-text-field v-model="..." v-mask="{mask:'##', unmaskedVar: 'myVar', number: true}" />

```

**v-mask** may be:
- a mask (string) made of "tokens" (listed below)
- the name of a predefined mask (from the ones listed below)
- an "object" with the following attributes:
  - `mask`: same as above
  - `unmaskedVar`: name of a variable defined in the "data" section of the component that will receive the "unmasked" text. It may be a structure (eg`"a.bc.d"`), but the first "level" must exists
  - `nullIfEmpty` (Defaults to **true** ): Set `"unmaskedVar"` to null if the input value is empty. 
  - `number` (Defaults to **false**): Try to cast the valof of `"unmaskedVar"` to a numbe (see below)
  - `tokens` (Defaults to the default ones below): An array of token objects that will replace the default ones. eg `tokens="[{ 'Y': {pattern: /[0-9]/ }]"`
  

### Tokens (From vue-the-mask)

- `'#': {pattern: /\d/}`
- `'X': {pattern: /[0-9a-zA-Z]/}`
- `'S': {pattern: /[a-zA-Z]/}`
- `'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()}`
- `'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()}`
- `'!': {escape: true}`

### Predefined masks (Most from vuetify v1.5.x)

- `credit-card: '#### - #### - #### - ####'`
- `credit-card2: '#### #### #### ####'`
- `date: '##/##/####'`
- `date-iso: '####-##-##'`
- `date-with-time: '##/##/#### ##:##'`
- `phone: '(###) ### - ####'`
- `phone2: '### ### - ####'`
- `social: '###-##-####'`
- `time: '##:##'`
- `time-with-seconds: '##:##:##'`
- `postalcode-ca:  'A#A #A#'`

### Modifiers
`.number`: The value set to`unmaskedVar`is typecast as a number. If the value cannot be parsed with parseFloat(), then the original value is returned.

#### Why this package?
This package has been created after the`"mask"` property of the`"v-text-field"`component has been removed and I was not able to find another package that allow to **retrieve the masked and unmasked value** of an input text from a directive

Technically, it is a "merge" of the`vue-the-mask`package, which is not maintained since years, and the old`mask`code from vuetify v1.5.x

Most of the credit goes to: 
- [vuetify v1.5.x code](https://github.com/vuetifyjs/vuetify/blob/v1.5.18/packages/vuetify/src/util/mask.ts)
- [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask)
- [RonaldJerez/vue-the-mask](https://github.com/RonaldJerez/vue-the-mask)