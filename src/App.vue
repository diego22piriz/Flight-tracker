<template>
  <div class="app-shell d-flex flex-column min-vh-100">
    <AppNavbar />
    <main class="flex-grow-1 py-4">
      <router-view />
    </main>
    <footer class="app-footer text-center py-3 text-muted small">
      Lab 2 — Rastreador de vuelos · Datos por
      <a href="https://aviationstack.com/" target="_blank" rel="noopener">AviationStack</a>
    </footer>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>
