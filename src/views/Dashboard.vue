<template>
  <div class="dashboard">
    <navbar />
    <div class="container-fluid">
      <div class="row justify-content-left">
        <div class="dashboard__tool-list" :class="{ 'col-12': !showPanel, 'col-6': showPanel }">
          <button class="btn btn-primary" @click.prevent="showAddPanel">Crear herramienta</button>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Descripción</th>
                <th scope="col">Número de serie</th>
                <th scope="col">Ubicación/Código de barras</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tool, index) in toolsList" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ tool.description }}</td>
                <td>{{ tool.serialNumber }}</td>
                <td>{{ tool.barcode }}</td>
                <td>
                  <button class="btn btn-primary">Ver</button>
                  <button class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <detailPanel
          v-if="showPanel"
          @tool-created="onToolCreated"
          @close-panel="showAddPanel"
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
      loadData()
      showAddPanel()
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
