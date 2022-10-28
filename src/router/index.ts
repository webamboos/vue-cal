import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation/index.vue'

const routes = []

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
