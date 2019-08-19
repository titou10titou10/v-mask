let n = 0;

export const mask = {

  bind(el: HTMLElement, binding: any, vnode: any) {
    console.log('bind');
    console.log(el);
    console.log(binding);
    console.log(vnode);
  },

  update(el: HTMLElement, binding: any, vnode: any, oldVnode: any) {
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

  // unbind(el: HTMLElement, binding: any, vnode: any) {
  //   console.log('unbind');
  //   console.log(el);
  //   console.log(binding);
  //   console.log(vnode);
  // },

  // inserted(el: HTMLElement, binding: any, vnode: any) {
  //   console.log('inserted');
  //   console.log(el);
  //   console.log(binding);
  //   console.log(vnode);
  // },

  // componentUpdated(el: HTMLElement,
  //                  binding: any,
  //                  vnode: any,
  //                  oldVnode: any) {
  //   console.log('componentUpdated');
  //   console.log(el);
  //   console.log(binding);
  //   console.log(vnode);
  //   console.log(oldVnode);
  //   console.log(vnode.context._data);
  //   // vnode.context._data['res'] = new Date();
  // }
};
