<template>
  <div style="height: 100vh; width: 100vw;">
    <navbar />
    <main class="py-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import navbar from "./components/Navbar.vue";
export default {
  components: {
    navbar
  }
};
</script>
