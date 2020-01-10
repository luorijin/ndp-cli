import Vue from 'vue'
import Router from 'vue-router'
import helloWorld from '@/views/helloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'helloWorld',
      component: helloWorld,
      meta:{
        level:1,
        title:"helloWorld"
      }
    }
  ]
})
