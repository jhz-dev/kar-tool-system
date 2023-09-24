<template>
  <div class="dashboard">
    <navbar />
    <div class="container-fluid">
      <div class="row justify-content-left">
        <div class="dashboard__tool-list" :class="{ 'col-12': !showPanel, 'col-6': showPanel }">
          <button class="btn btn-primary" @click.prevent="showAddPanel">Create tool</button>
          <div
            class="card bg-light dashboard__tool"
            v-for="(tool, index) in toolsList"
            :key="index"
          >
            <div class="card-body">
              <h5 class="card-title">{{ tool.name }}</h5>
              <p class="card-text">
                {{ tool.description }}
              </p>
              <span class="badge badge-secondary">
                Location: {{ tool.location }}
              </span>
            </div>
            <div class="card-footer">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </div>
        <div v-if="showPanel" class="col-6">
          <div class="container">
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
                        <label for="name" class="col-md-4 col-form-label text-md-right"
                          >Name</label
                        >

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
                        <label for="location" class="col-md-4 col-form-label text-md-right"
                          >Location</label
                        >

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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

import { fireStoreService } from '@/services/fireStore.service'
import { useUserStore } from '@/stores/user'
import navbar from '@/components/Navbar.vue'

export default {
  name: 'DashboardComponent',
  components: {
    navbar
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const toolsList = ref()
    const showPanel = ref(false)

    const name = ref('')
    const description = ref('')
    const location = ref('')
    const error = ref(null)

    const user = computed(() => {
      return userStore.userState.data
    })

    onMounted(() => {
      loadData()
    })

    const addTool = async () => {
      try {
        await fireStoreService.addDocument('tools', {
          name: name.value,
          description: description.value,
          location: location.value,
          created: new Date().toISOString(),
          creatorId: user.value.uid,
        })
        loadData();
        showPanel.value = false;
        name.value = '';
        description.value = '';
        location.value = '';
        error.value = null;
      } catch (err: any) {
        error.value = err.message
      }
    }

    const showAddPanel = () => {
      showPanel.value = !showPanel.value
    }

    const loadData = async () => {
      if (!user.value) {
        router.push('/login')
        return
      }

      try {
        const tools = await fireStoreService.getDocuments('tools')
        toolsList.value = tools
      } catch (error) {
        console.error(error)
      }
    }

    return {
      name,
      description,
      location,
      error,
      showPanel,
      toolsList,
      addTool,
      loadData,
      showAddPanel
    }
  }
}
</script>

<style>
.dashboard .container-fluid {
  padding: 15px;
}

.dashboard .dashboard__tool-list {
  overflow-y: scroll;
}

.dashboard .dashboard__tool-list .dashboard__tool {
  margin-top: 15px;
}
</style>
