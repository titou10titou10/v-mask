import mask from './directive';

/* tslint:disable-next-line:variable-name */
function install(Vue) {
  Vue.directive('mask', mask);
}

export { mask };
export default install;
