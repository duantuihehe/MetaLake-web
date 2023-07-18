import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/meta',
      name: 'meta',
      component: () => import('../components/MeatData.vue')
    },
    {
      path: '/dataIntegration',
      name: 'dataIntegration',
      component: () => import('../components/DataIntegration.vue')
    },
    {
      path: '/dataModel',
      name: 'dataModel',
      component: () => import('../components/DataModel.vue')
    },
    {
      path: '/bi',
      name: 'bi',
      component: () => import('../components/Bi.vue')
    },
    {
      path: '/showSQL/:id',
      name: 'showSQL',
      component: () => import('../components/ShowSQL.vue')
    }
  ]
})

export default router
