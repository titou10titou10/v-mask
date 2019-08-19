"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let n = 0;
exports.mask = {
    bind(el, binding, vnode) {
        console.log('bind');
        console.log(el);
        console.log(binding);
        console.log(vnode);
    },
    update(el, binding, vnode, oldVnode) {
        console.log('update');
        console.log(el);
        console.log(binding);
        console.log(vnode);
        console.log(vnode.componentInstance);
        console.log(vnode.componentInstance.data);
        console.log(vnode.context.data);
        // vnode.componentInstance.$emit('toto',  n++);
        vnode.componentInstance._data.res = n++;
        // vnode.context._data.res = n++;
    },
};
