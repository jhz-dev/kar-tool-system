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
        <detailPanel v-if="showPanel" @tool-created="onToolCreated"/>
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
import detailPanel from '@/components/DetailPanel.vue'

export default {
  name: 'DashboardComponent',
  components: {
    navbar,
    detailPanel
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const toolsList = ref()
    const showPanel = ref(false)

    const user = computed(() => {
      return userStore.userState.data
    })

    onMounted(() => {
      loadData()
    })

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

    const onToolCreated = () => {
      loadData();
      showAddPanel();
    }

    return {
      showPanel,
      toolsList,
      onToolCreated,
      showAddPanel
    }
  }
}
</script>

<style>
.dashboard .container-fluid {
  padding: 15px;
  height: calc(100vh - 58px);
}

.dashboard .dashboard__tool-list {
  overflow-y: scroll;
}

.dashboard .dashboard__tool-list .dashboard__tool {
  margin-top: 15px;
}
</style>
