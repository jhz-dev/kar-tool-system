<template>
  <div class="container col-6 detail-panel">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
            <form action="#" @submit.prevent="addTool">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
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
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-md-4 col-form-label text-md-right"
                  >Description</label
                >
                <div class="col-md-6">
                  <textarea
                    id="description"
                    v-model="description"
                    type="description"
                    class="form-control"
                    name="description"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>

                <div class="col-md-6">
                  <input
                    id="location"
                    v-model="location"
                    type="location"
                    class="form-control"
                    name="location"
                    required
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Create</button>
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

import { useUserStore } from '@/stores/user'
import { fireStoreService } from '@/services/fireStore.service'

export default {
  name: 'DetailPanel',
  emits: ['tool-created'],
  setup(props, {emit}) {
    const userStore = useUserStore()

    const name = ref('')
    const description = ref('')
    const location = ref('')
    const error = ref(null)

    const addTool = async () => {
      const user = userStore.userState.data
      try {
        await fireStoreService.addDocument('tools', {
          name: name.value,
          description: description.value,
          location: location.value,
          created: new Date().toISOString(),
          creatorId: user.uid
        })

        name.value = ''
        description.value = ''
        location.value = ''
        error.value = null

        emit('tool-created')
      } catch (err: any) {
        error.value = err.message
      }
    }

    return {
      name,
      description,
      location,
      error,
      addTool
    }
  }
}
</script>

<style>
.detail-panel {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgba(0,0,0,0.8);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
</style>