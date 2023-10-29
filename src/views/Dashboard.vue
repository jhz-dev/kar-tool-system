<template>
  <div class="dashboard bg-light">
    <navbar />
    <div class="container-fluid">
      <div class="row justify-content-left">
        <div class="dashboard__tool-list" :class="{ 'col-12': !showPanel, 'col-6': showPanel }">
          <button class="btn btn-primary" @click="showAddPanel()">Crear herramienta</button>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tool, index) in toolsList" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ tool.description }}</td>
                <td>
                  <button class="btn btn-primary" @click="showAddPanel(tool.id)">Ver</button>
                  <button class="btn btn-danger" @click="deleteTool(tool.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <detailPanel
          v-if="showPanel"
          :tool-id="toolId"
          @tool-created="onToolCreated"
          @tool-updated="onToolCreated"
          @close-panel="closePanel"
        />
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
    const toolId = ref('')

    const user = computed(() => {
      return userStore.userState.data
    })

    onMounted(() => {
      loadData()
    })

    const showAddPanel = (tool = '') => {
      toolId.value = tool;
      showPanel.value = true
    }

    const closePanel = () => {
      toolId.value = '';
      showPanel.value = false
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
      loadData()
      closePanel()
    }

    const deleteTool = async (id: string) => {
      try {
        await fireStoreService.deleteDocument('tools', id)
        loadData();
      } catch (error) {
        console.error(error);
      }
    }

    return {
      closePanel,
      deleteTool,
      onToolCreated,
      showAddPanel,
      showPanel,
      toolId,
      toolsList,
    }
  }
}
</script>

<style>
.dashboard .container-fluid {
  padding: 15px;
  height: calc(100vh - 58px);
  background-color: rgba(255,193,7, 0.2)!important;
  overflow-y: scroll;
}

.dashboard .dashboard__tool-list .table {
  margin-top: 15px;
}

.dashboard .dashboard__tool-list .btn {
  margin-right: 10px;
}
</style>
