<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <router-link to="/" class="navbar-brand"> La Muela </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div id="navbarNav" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Herramientas <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
    <span v-if="user">Bienvenid@, {{ user.displayName }}</span>
    <button
      class="btn btn-primary"
      @click.prevent="signOut"
    >
      Cerrar sesión
    </button>
  </nav>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { auth } from '@/config/firebaseConfig'
import { useUserStore } from '@/stores/user'

export default {
  name: 'NavBar',

  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const toolsList = ref()

    auth.onAuthStateChanged((user) => {
      userStore.fetchUser(user);
    })

    const user = computed(() => {
      return userStore.userState.data
    })

    const signOut = async () => {
      await userStore.logOut()
      router.push('/login')
    }

    return { user, toolsList, signOut }
  }
}
</script>
