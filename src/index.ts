import mask from './directive';
import { unmaskText } from './utils';

/* tslint:disable-next-line:variable-name */
function install(Vue) {
  Vue.directive('mask', mask);
}

export { mask };
export { unmaskText };
export default install;
