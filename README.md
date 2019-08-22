### @titou10titoui10/v-mask
**A vue.js package that provides a directive to apply a mask to input tags**

This package has been created after the`"mask"` property of the`"v-text-field"`component has been removed and I was not able to find another package that allow to **retrieve the masked and unmasked value** of an input text from a directive

Technically, it is a "merge" of the`vue-the-mask`package which is not maintained since years and the old`mask`code from vuetify v1.5.x

Most of the credit goes to those 2 packages:    
- [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask)
- [vuetify v1.5.x code](https://github.com/vuetifyjs/vuetify/blob/v1.5.18/packages/vuetify/src/util/mask.ts)

#### The differences with`vue-the-mask`are:
- "v-model" will always contain the masked value, this directive will also set the unmasked value to a specified variable (see below)
- the package provides predefined masks (see below)
- there is no Vue.js copmponent, just the Vue.js directive

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
```
```html
<v-text-field v-model="..." v-mask="'A#'" />
<v-text-field v-model="..." v-mask="{mask:'A##',unmaskedVar: 'myVar'}" />
```

"mask" may contain:
- a mask made with tokens (listed below)
- the name of a predefined mask from the ones (listed below)
- a "mask object" with the following properties:
  - mask: same as above
  - unmaskedVar: name of a vairable defined in the "data" section of the component that will receive the unmasked twxt
  - tokens: Replace the default tokens. eg tokens="{ 'Y': {pattern: /[0-9]/ }"


### Tokens (From vue-the-mask)

- `'#': {pattern: /\d/}`
- `'X': {pattern: /[0-9a-zA-Z]/}`
- `'S': {pattern: /[a-zA-Z]/}`
- `'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()}`
- `'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()}`
- `'!': {escape: true}`



### Predefined masks (From vuetify v1.5.x)

- `credit-card: '#### - #### - #### - ####'`
- `date: '##/##/####'`
- `date-with-time: '##/##/#### ##:##'`
- `phone: '(###) ### - ####'`
- `social: '###-##-####'`
- `time: '##:##'`
- `time-with-seconds: '##:##:##'`
- `postalcode-ca:  'A#A #A#'`





