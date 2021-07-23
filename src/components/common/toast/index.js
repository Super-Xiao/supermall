import Toast from './Toast'
const obj = {}
obj.install = function(Vue){
  // console.log('zhixingle',Vue);
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)


  // 2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  // myToast.$el就已经挂载到上面创建的div了,然后将div挂载到body上即可
  document.body.appendChild(toast.$el)



 // 最后将myToast挂载到Vue的原型上
  Vue.prototype.$toast = toast
}

export default obj
