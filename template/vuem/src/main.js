import Vue from 'vue'
import App from './App.vue'
import router from './router'
import servletContext from 'servletContext'
import './mock'
console.log(servletContext)
servletContext.on("main:luo",function(v){
  console.log(v)
})
servletContext.emit("main:luo","你是谁")
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
