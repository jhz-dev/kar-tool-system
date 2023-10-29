<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card text-white bg-primary mb-3 shadow">
          <div class="card-header">
            Iniciar sesión
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
            <form action="#" @submit.prevent="Login">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Correo eléctronico</label>

                <div class="col-md-6">
                  <input id="email" v-model="email" type="email" class="form-control" name="email" value required
                    autofocus>
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>

                <div class="col-md-6">
                  <input id="password" v-model="password" type="password" class="form-control" name="password" required>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn bg-warning text-white">
                    Ingresar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

export default {
  name: "LoginComponent",
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const userStore = useUserStore()
    const router = useRouter()

    const Login = async () => {
      try {
        await userStore.logIn({
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err: any) {
        error.value = err.message
      }
    }
    return { Login, email, password, error }
  }
};
</script>

<style>
.container {
  height: 100vh;
}

.container .row.justify-content-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>