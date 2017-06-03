import Vue from 'vue'
import Router from 'vue-router'
import todo from '@/components/todo'
import signUp from '@/components/signUp'
import logIn from '@/components/logIn'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/todo',
    name: 'todo',
    component: todo
  }, {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: logIn
  }
  ]
})
