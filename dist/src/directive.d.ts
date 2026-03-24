declare function bind(el: any, binding: any, vnode: any): void;
declare function componentUpdated(el: any, binding: any, vnode: any, oldVnode: any): void;
declare const _default: {
    bind: typeof bind;
    componentUpdated: typeof componentUpdated;
};
export default _default;
