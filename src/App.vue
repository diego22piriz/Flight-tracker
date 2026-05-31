<template>
  <div class="app-shell d-flex flex-column min-vh-100">
    <AppNavbar />
    <main class="app-main flex-grow-1">
      <router-view />
    </main>
    <footer class="app-footer text-center py-2 small">
      Lab 2 — Rastreador de vuelos · Datos por
      <a href="https://aviationstack.com/" target="_blank" rel="noopener">AviationStack</a>
    </footer>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>
