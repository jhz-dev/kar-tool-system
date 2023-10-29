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
        <detailPanel v-if="showPanel" :tool-id="toolId" @tool-created="onToolCreated" @tool-updated="onToolCreated"
          @close-panel="closePanel" />
      </div>
    </div>
    <div
      v-for="(toast, index) in toastMessages" :key="index"
      class="toast toast-message" role="alert" aria-live="assertive" aria-atomic="true"
    >
      <div
        class="toast-body"
        :class="[{
          'bg-error': toast.type === 'error',
          'bg-success': toast.type === 'success'
        }]"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'

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
    const toastMessages = ref([] as { message: String, type: String }[])

    const user = computed(() => {
      return userStore.userState.data
    })

    watch(
      toastMessages.value,
      () => {
        console.log("qwerty");
        if(toastMessages.value.length > 0) {
          setTimeout(() => {
            toastMessages.value.shift();
          }, 2000)
        }
      }
    )

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
        toastMessages.value.push({
          message:"No fue posible terminar la operación",
          type: "error"
        });
      }
    }

    const onToolCreated = () => {
      loadData()
      closePanel()
      toastMessages.value.push({
        message:"La operación fue un éxito",
        type: "success"
      });
    }

    const deleteTool = async (id: string) => {
      try {
        await fireStoreService.deleteDocument('tools', id)
        toastMessages.value.push({
          message:"La herramienta fue borrada con éxito",
          type: "success"
        });
        loadData();
        closePanel()
      } catch (error) {
        toastMessages.value.push({
          message:"No fue posible terminar la operación",
          type: "error"
        });
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
      toastMessages
    }
  }
}
</script>

<style>
.dashboard {
  position: relative;
}

.dashboard .container-fluid {
  padding: 15px;
  height: calc(100vh - 58px);
  background-color: rgba(255, 193, 7, 0.2) !important;
  overflow-y: scroll;
}

.dashboard .dashboard__tool-list .table {
  margin-top: 15px;
}

.dashboard .dashboard__tool-list .btn {
  margin-right: 10px;
}

.dashboard .toast-message {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 1;
  z-index: 1000;
}

.dashboard .bg-error {
  background-color: rgba(220,53,69, 0.5)
}

.dashboard .bg-success {
  background-color: rgba(53, 220, 109, 0.5)
}
</style>
