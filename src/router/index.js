import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import FlightDetailView from '../views/FlightDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Buscar vuelos' },
  },
  {
    path: '/favoritos',
    name: 'favorites',
    component: FavoritesView,
    meta: { title: 'Mis favoritos' },
  },
  {
    path: '/vuelo/:flightKey',
    name: 'flight-detail',
    component: FlightDetailView,
    meta: { title: 'Detalle del vuelo' },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  const base = 'Rastreador de Vuelos'
  document.title = to.meta.title ? `${to.meta.title} | ${base}` : base
})

export default router
