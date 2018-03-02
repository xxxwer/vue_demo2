// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import  { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false

$.ajaxSetup({
    data: {csrfmiddlewaretoken: 'JZxKSJHm0tj1N5bNJjXNSYsipPd2rAZX4JjjtBffxoptVKd4lrdDBWJDpaOARopv' },
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
