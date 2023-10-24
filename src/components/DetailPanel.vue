<template>
  <div class="container col-6 detail-panel">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Herramienta</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
            <form action="#" @submit.prevent="addTool">
              <div class="form-group row">
                <label for="description" class="col-md-4 col-form-label text-md-right"
                  >Descripción</label
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
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Código de barras</label
                >
                <div class="col-md-6">
                  <input
                    id="barcode"
                    v-model="barcode"
                    type="barcode"
                    class="form-control"
                    name="barcode"
                    value
                    required
                    autofocus
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="serialNumber" class="col-md-4 col-form-label text-md-right"
                  >Número de serie</label
                >

                <div class="col-md-6">
                  <input
                    id="serialNumber"
                    v-model="serialNumber"
                    type="serialNumber"
                    class="form-control"
                    name="serialNumber"
                    required
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-2">
                  <button type="submit" class="btn btn-primary">Crear</button>
                  <button class="btn btn-danger" @click="closePanel">Cerrar</button>
                  <span>{{ toolId }}</span>
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
import { onMounted, ref, watch } from 'vue'

import { useUserStore } from '@/stores/user'
import { fireStoreService } from '@/services/fireStore.service'

export default {
  name: 'DetailPanel',
  emits: ['tool-created', 'close-panel'],
  props: ['toolId'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    const toolId = ref(props.toolId);
    const description = ref('')
    const barcode = ref('')
    const serialNumber = ref('')
    const error = ref(null)

    watch(
      () => toolId,
      () => {
        console.log({toolId});
        
      }
    )

    onMounted(() => {
      if (toolId.value) {
        fireStoreService.getDocument('tools', toolId.value)
        .then((snapshot) => {
          const tool = snapshot.data()
          description.value = tool?.description
          barcode.value = tool?.barcode
          serialNumber.value = tool?.serialNumber
        });
      }
    })

    const addTool = async () => {
      const user = userStore.userState.data
      try {
        await fireStoreService.addDocument('tools', {
          barcode: barcode.value,
          description: description.value,
          serialNumber: serialNumber.value,
          created: new Date().toISOString(),
          creatorId: user.uid
        })

        barcode.value = ''
        description.value = ''
        serialNumber.value = ''
        error.value = null

        emit('tool-created')
      } catch (err: any) {
        error.value = err.message
      }
    }

    const closePanel = () => {
      emit('close-panel')
    }

    return {
      description,
      barcode,
      serialNumber,
      error,
      addTool,
      closePanel
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
  background-color: rgba(0, 0, 0, 0.8);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.form-group .col-md-8 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
