<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Register
          </div>
          <div class="card-body">
            <div
              v-if="error"
              class="alert alert-danger"
            >
              {{ error }}
            </div>
            <form
              action="#"
              @submit.prevent="Register"
            >
              <div class="form-group row">
                <label
                  for="name"
                  class="col-md-4 col-form-label text-md-right"
                >Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    v-model="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                  >
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="email"
                  class="col-md-4 col-form-label text-md-right"
                >Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                  >
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                >Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                  >
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                  >
                    Register
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
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from '@/stores/user'

export default {
  name: "RegisterComponent",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const userStore = useUserStore();
    const router = useRouter();

    const Register = async () => {
      try {
        await userStore.register({
          email: email.value,
          password: password.value,
          name: name.value,
        });
        router.push("/");
      } catch (err: any) {
        error.value = err.message;
      }
    };

    return { Register, name, email, password, error };
  },
};
</script>
