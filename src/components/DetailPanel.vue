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
  emits: ['tool-created', 'close-panel'],
  setup(props, { emit }) {
    const userStore = useUserStore()

    const description = ref('')
    const barcode = ref('')
    const serialNumber = ref('')
    const error = ref(null)

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

    const importTools = async () => {
      const user = userStore.userState.data
      const tools = [
        {
          description: 'HERRAMIENTA LLAVE PARA PAX2',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'P1190765'
        },
        {
          description: 'HERRAMIENTA-LLAVE PARA PUNTA VARIOSURG 3',
          units: 1,
          barcode: 'NSK-856',
          serialNumber: 10000977
        },
        {
          description: 'HERRAMIENTA LLAVE PARA PIEZA DE MANO',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 20000535
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL PARA PIEZAS DYNALED',
          units: 1,
          barcode: 'NSK-37',
          serialNumber: 20000535
        },
        {
          description: 'HERRAMIENTA - PARA CONTRA ANGULO SG20',
          units: 1,
          barcode: 'NSK-231',
          serialNumber: 60000033
        },
        {
          description: 'HERRAMIENTA - GUIA PARA CABEZAL DE DAYNALED MINI',
          units: 1,
          barcode: 'NSK-482',
          serialNumber: 60000048
        },
        {
          description: 'HERRAMIENTA - PRENSA DYNALED',
          units: 1,
          barcode: 'NSK-331',
          serialNumber: 60000049
        },
        {
          description: 'HERRAMIENTA - LLAVE CUERPO DYNALED',
          units: 1,
          barcode: 'NSK-332',
          serialNumber: 60000050
        },
        {
          description: 'HERRAMIENTA - LLAVE DE TAPA DE BOQUILLA PARA PMN',
          units: 1,
          barcode: 'NSK-930',
          serialNumber: 60000099
        },
        {
          description: 'HERRAMIENTA - TORQUÍMETRO PARA CONTRA ÁNGULOS',
          units: 1,
          barcode: 'NSK-931',
          serialNumber: 60000517
        },
        {
          description: 'HERRAMIENTA - TORQUÍMETRO PARA PIEZAS DE MANO MICRO CIRUGÍA SGS',
          units: 1,
          barcode: 'NSK-932',
          serialNumber: 60000518
        },
        {
          description: 'HERRAMIENTA - TORQUÍMETRO PARA LA UNIDAD VIVA ACE',
          units: 1,
          barcode: 'NSK-933',
          serialNumber: 60000519
        },
        {
          description: 'HERRAMIENTA - TORQUÍMETRO PARA LA UNIDAD VIVASUPPORT 2',
          units: 1,
          barcode: 'NSK-934',
          serialNumber: 60000520
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO PARA CONTRA ÁNGULOS S-MAX',
          units: 1,
          barcode: 'NSK-935',
          serialNumber: 60000524
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO',
          units: 1,
          barcode: 'NSK-936',
          serialNumber: 60000525
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO PARA PEDAL FC-79',
          units: 1,
          barcode: 'NSK-937',
          serialNumber: 60000526
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO',
          units: 1,
          barcode: 'NSK-938',
          serialNumber: 60000527
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO PARA TURBINAS NEUMÁTICAS TI-MAX',
          units: 1,
          barcode: 'NSK-939',
          serialNumber: 60000528
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO',
          units: 1,
          barcode: 'NSK-940',
          serialNumber: 60000529
        },
        {
          description: 'HERRAMIENTA - MANGO PARA AGARRE DE EJES DE CONTRA ÁNGULOS TI-MAX',
          units: 1,
          barcode: 'NSK-941',
          serialNumber: 60000631
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR DINAMOMÉTRICO PARA CONTRA ÁNGULOS FX57',
          units: 1,
          barcode: 'NSK-942',
          serialNumber: 60000638
        },
        {
          description: 'HERRAMIENTA - EJE PARA MICROMOTOR',
          units: 1,
          barcode: 'NSK-943',
          serialNumber: 60000691
        },
        {
          description: 'HERRAMIENTA GENERAL',
          units: 1,
          barcode: 'NSK-485',
          serialNumber: 'C034751'
        },
        {
          description: 'HERRAMIENTA - LLAVE TAPA DE CABEZAL PARA CONTRA ÁNGULO FX22',
          units: 1,
          barcode: 'NSK-911',
          serialNumber: 'C071751'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULO FX',
          units: 1,
          barcode: 'NSK-460',
          serialNumber: 'C880A751A'
        },
        {
          description: 'HERRAMIENTA - BORNERA SUPERIOR PARA PRENSA DE PUNTA RECTA',
          units: 1,
          barcode: 'NSK-466',
          serialNumber: 'DT-131'
        },
        {
          description: 'HERRAMIENTA - BORNERA INFERIOR PARA PRENSA DE PUNTA RECTA',
          units: 1,
          barcode: 'NSK-467',
          serialNumber: 'DT-132'
        },
        {
          description: 'HERRAMIENTA - LLAVE FIJA DE 10MM Y 11MM',
          units: 1,
          barcode: 'NSK-470',
          serialNumber: 'DT-134'
        },
        {
          description: 'HERRAMIENTA - EXTRACTOR DE PRISIONEROS PARA PUNTAS RECTAS',
          units: 1,
          barcode: 'NSK-468',
          serialNumber: 'DT-137'
        },
        {
          description: 'HERRAMIENTA - EXTRACTOR ARENDELAS PUNTAS RECTAS',
          units: 1,
          barcode: 'NSK-469',
          serialNumber: 'DT-138'
        },
        {
          description: 'HERRAMIENTA - PARA EXTRACCIÓN DE PASADORES',
          units: 1,
          barcode: 'NSK-944',
          serialNumber: 'DT-141'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTAS RECTAS UHR, VR, VH',
          units: 1,
          barcode: 'NSK-945',
          serialNumber: 'DT-145'
        },
        {
          description: 'HERRAMIENTA PARA MICROMOTOR EX203C',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-153'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TI 205 IS 205 EX 103 EX 203',
          units: 1,
          barcode: 'NSK-294',
          serialNumber: 'DT-153'
        },
        {
          description: 'HERRAMIENTA PARA MICROMOTOR EX203C',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-166'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TORNILLO DE RESTA MICROMOTOR E',
          units: 1,
          barcode: 'NSK-946',
          serialNumber: 'DT-166'
        },
        {
          description:
            'HERRAMIENTA - LLAVE PARA LA EXTRACCION DEL ANILLO DE RETENCION PARA EL AS20',
          units: 1,
          barcode: 'NSK-476',
          serialNumber: 'DT-171'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTAS RECTAS EX 6B',
          units: 1,
          barcode: 'NSK-947',
          serialNumber: 'DT-175'
        },
        {
          description: 'HERRAMIENTA - PUNTERO PARA LA EXTRACCION DEL PERNO DE LAS PUNTAS RECTAS',
          units: 1,
          barcode: 'NSK-454',
          serialNumber: 'DT-179'
        },
        {
          description: 'HERRAMIENTA - PARA INSERCIÓN DE ANILLO',
          units: 1,
          barcode: 'NSK-948',
          serialNumber: 'DT-185'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTAS RECTAS UHR, VR, VH',
          units: 1,
          barcode: 'NSK-949',
          serialNumber: 'DT-203'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL PARA PIEZA DE MANO PANA AIR- T',
          units: 1,
          barcode: 'NSK-1110',
          serialNumber: 'DT-208'
        },
        {
          description: 'HERRAMIENTA RECTIFICADOR DE CABEZAL PANA AIR MINI',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-214'
        },
        {
          description: 'HERRAMIENTA - RECTIFICADOR DE CABEZAL PANA AIR MINI',
          units: 1,
          barcode: 'NSK-366',
          serialNumber: 'DT-214'
        },
        {
          description: 'HERRAMIENTA RECTIFICADOR DE CABEZAL PANAIR STD',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-215'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL PARA PIEZA DE MANO PANA AIR STD',
          units: 1,
          barcode: 'NSK-196',
          serialNumber: 'DT-215'
        },
        {
          description: 'HERRAMIENTA - EXTRACTORA DEL ANILLO DE RETENCION PARA LAS DIMAX X',
          units: 1,
          barcode: 'NSK-449',
          serialNumber: 'DT-216'
        },
        {
          description: 'HERRAMIENTA - DESTORNILLADOR PARA RETIRAR EL FILTRO DE LA Z95L',
          units: 1,
          barcode: 'NSK-456',
          serialNumber: 'DT-241'
        },
        {
          description: 'HERRAMIENTA - PRENSA PARA LA EXTRACCION DEL CUERPO DE LA DAYNALED',
          units: 1,
          barcode: 'NSK-480',
          serialNumber: 'DT-250'
        },
        {
          description: 'HERRAMIENTA DT 260',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-260'
        },
        {
          description: 'HERRAMIENTA VISE-- PRENSA PUNTA RECT',
          units: 1,
          barcode: 'NSK-594',
          serialNumber: 'DT-267'
        },
        {
          description: 'HERRAMIENTA - ADAPTADOR PARA PUNTAS RECTAS UHR, VR, VH',
          units: 1,
          barcode: 'NSK-951',
          serialNumber: 'DT-267-20'
        },
        {
          description: 'HERRAMIENTA - EJE GUIA PARA TURBINAS TI-MAX X',
          units: 1,
          barcode: 'NSK-952',
          serialNumber: 'DT-282'
        },
        {
          description: 'HERRAMIENTA - PARA EMPUJAR FRESAS DE TURBINAS TI-MAX X',
          units: 1,
          barcode: 'NSK-953',
          serialNumber: 'DT-283'
        },
        {
          description: 'HERRAMIENTA - GUIA MINI PARA TURBINAS TI-MAX X500L',
          units: 1,
          barcode: 'NSK-954',
          serialNumber: 'DT-284'
        },
        {
          description: 'HERRAMIENTA- GUIA ESTÁNDAR PARA TURNIBAS TI-MAX X600L',
          units: 1,
          barcode: 'NSK-955',
          serialNumber: 'DT-285'
        },
        {
          description: 'HERRAMIENTA- GUIA DE TORSIÓN PARA TURBINAS TI-MAX X700L',
          units: 1,
          barcode: 'NSK-956',
          serialNumber: 'DT-286'
        },
        {
          description: 'HERRAMIENTA - BLOQUE PARA CABEZAL MINI DE TURBINAS TI-MAX X500L',
          units: 1,
          barcode: 'NSK-957',
          serialNumber: 'DT-295'
        },
        {
          description: 'HERRAMIENTA - BLOQUE PARA CABEZAL ESTANDAR DE TURBINAS TI-MAX X600L',
          units: 1,
          barcode: 'NSK-958',
          serialNumber: 'DT-296'
        },
        {
          description: 'HERRAMIENTA - BLOQUE PARA CABEZAL DE TORSIÓN DE TURBINAS TI-MAX X700L',
          units: 1,
          barcode: 'NSK-959',
          serialNumber: 'DT-297'
        },
        {
          description: 'HERRAMIENTA - PARA TIMAX X450/450L',
          units: 2,
          barcode: 'NSK-1272',
          serialNumber: 'DT-298'
        },
        {
          description: 'HERRAMIENTA - PARA DYNALED',
          units: 1,
          barcode: 'NSK-334',
          serialNumber: 'DT-299'
        },
        {
          description: 'HERRAMIENTA - GUIA PARA TURBINAS TI-MAX X600L',
          units: 1,
          barcode: 'NSK-960',
          serialNumber: 'DT-302'
        },
        {
          description: 'HERRAMIENTA - GUIA PARA TURBINAS TI-MAX X700L',
          units: 1,
          barcode: 'NSK-961',
          serialNumber: 'DT-303'
        },
        {
          description: 'HERRAMIENTA PANAMAX STANDAR',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-316'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL PARA TURBINA PAX-SU',
          units: 1,
          barcode: 'NSK-1112',
          serialNumber: 'DT-316'
        },
        {
          description: 'HERRAMIENTA PANAMAX TORQUE',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-317'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL PARA TURBINA PAX-TU',
          units: 1,
          barcode: 'NSK-1113',
          serialNumber: 'DT-317'
        },
        {
          description: 'HERRAMIENTA - PRENSA DE MANO PARA CONTRA ÁNGULOS TI-MAX X',
          units: 1,
          barcode: 'NSK-962',
          serialNumber: 'DT-318'
        },
        {
          description: 'HERRAMIENTA - CUBIERTA DE CABEZAL DE TURBINAS TI-MAX X',
          units: 1,
          barcode: 'NSK-963',
          serialNumber: 'DT-327'
        },
        {
          description: 'HERRAMIENTA - EXTRACCIÓN DE PIEZAS PARA PUNTAS RECTAS X',
          units: 1,
          barcode: 'NSK-966',
          serialNumber: 'DT-352'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS TI-MAX',
          units: 1,
          barcode: 'NSK-968',
          serialNumber: 'DT-357'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PIEZAS DE MANO ULTIMATE',
          units: 1,
          barcode: 'NSK-969',
          serialNumber: 'DT-360'
        },
        {
          description: 'HERRAMIENTA - SOPORTE PARA RODAMIENTOS Y OTROS',
          units: 1,
          barcode: 'NSK-767',
          serialNumber: 'DT-365'
        },
        {
          description: 'HERRAMIENTA - GENERAL',
          units: 0,
          barcode: 'xxx-000',
          serialNumber: 'DT-371'
        },
        {
          description: 'HERRAMIENTA - LLAVES DE 2 VÍAS',
          units: 1,
          barcode: 'NSK-970',
          serialNumber: 'DT-383'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS',
          units: 1,
          barcode: 'NSK-971',
          serialNumber: 'DT-385'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PIEZA DE MANO QUIRÚRGICA SGS',
          units: 1,
          barcode: 'NSK-972',
          serialNumber: 'DT-386'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA ACOPLAMIENTO PTL',
          units: 1,
          barcode: 'NSK-973',
          serialNumber: 'DT-387'
        },
        {
          description: 'HERRAMIENTA PARA MICROMOTOR FX205',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-388'
        },
        {
          description: 'HERRAMIENTA-PARA MICROMOTOR',
          units: 1,
          barcode: 'NSK-582',
          serialNumber: 'DT-388'
        },
        {
          description: 'HERRAMIENTA-LLAVE POSICION DYNALED',
          units: 1,
          barcode: 'NSK-335',
          serialNumber: 'DT-400'
        },
        {
          description: 'HERRAMIENTA PANAMAX PLUS STANDAR',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-402'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL',
          units: 1,
          barcode: 'NSK-369',
          serialNumber: 'DT-402'
        },
        {
          description: 'HERRAMIENTA - CORRECTOR DE CABEZAL PARA M600L, PAP-SU, PANAMAX PLUS MINI',
          units: 1,
          barcode: 'NSK-632',
          serialNumber: 'DT-403'
        },
        {
          description: 'HERRAMIENTA RECTIFICADOR DE CABEZAL PANAMAX PLUS MINI',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-403'
        },
        {
          description: 'HERRAMIENTA - GENERAL',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-407'
        },
        {
          description:
            'HERRAMIENTA - GUIA PARA LA EXTRACCION DE LA PLACA DE PULVERIZACION DE LA Z95L',
          units: 1,
          barcode: 'NSK-462',
          serialNumber: 'DT-411'
        },
        {
          description: 'HERRAMIENTA GENERAL',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-412'
        },
        {
          description: 'HERRAMIENTA - GUIA DE CABEZAL PARA LA Z95L',
          units: 1,
          barcode: 'NSK-337',
          serialNumber: 'DT-412'
        },
        {
          description:
            'HERRAMIENTA - BUJE PARA RETIRAR SISTEMA DE IRRIGACIÓN DEL CABEZAL PARA TI MAX Z',
          units: 1,
          barcode: 'NSK-463',
          serialNumber: 'DT-412'
        },
        {
          description: 'HERRAMIENTA LLAVE PARA ANGULO FX',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-413'
        },
        {
          description:
            'HERRAMIENTA - LLAVE PARA LA EXTRACCION DEL EJE INTERMEDIO DEL CONTRAAGULOS FX',
          units: 1,
          barcode: 'NSK-464',
          serialNumber: 'DT-413'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULO FX',
          units: 1,
          barcode: 'NSK-457',
          serialNumber: 'DT-413'
        },
        {
          description:
            'HERRAMIENTA - LLAVE TUERCAS DE COJINETES PARA PIEZAS DE MANO QUIRÚRGICAS SGS',
          units: 1,
          barcode: 'NSK-976',
          serialNumber: 'DT-416'
        },
        {
          description: 'HERRAMIENTA - LLAVE MONTAJE SUPERIOR PIEZA QUIRÚRGICA SGS',
          units: 1,
          barcode: 'NSK-977',
          serialNumber: 'DT-417'
        },
        {
          description: 'HERRAMIENTA GENERAL',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-418'
        },
        {
          description: 'HERRAMIENTA - EXTRACCIÓN DE COJINETES PIEZAS QUIRÚRGICAS SGS',
          units: 1,
          barcode: 'NSK-979',
          serialNumber: 'DT-421'
        },
        {
          description:
            'HERRAMIENTA - DE FIJACIÓN DE PLACA DE PULVERIZACIÓN CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-980',
          serialNumber: 'DT-431'
        },
        {
          description: 'HERRAMIENTA - MANÓMETRO ICARE',
          units: 1,
          barcode: 'NSK-981',
          serialNumber: 'DT-435'
        },
        {
          description:
            'HERRAMIENTA - PRISIONERO DE AJUSTE DE LAS BORNERAS PARA LA TARJETA ELECTRONICA DEL 36',
          units: 1,
          barcode: 'NSK-483',
          serialNumber: 'DT-436'
        },
        {
          description: 'HERRAMIENTA - REMOVEDOR DE ANILLOS Y EMPAQUES',
          units: 2,
          barcode: 'NSK-280',
          serialNumber: 'DT-437'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA MICROMOTORES DYNALED',
          units: 1,
          barcode: 'NSK-982',
          serialNumber: 'DT-440'
        },
        {
          description: 'HERRAMIENTA-RECTIFICADOR DE CABEZAL PANAMAX2',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-451'
        },
        {
          description: 'HERRAMIENTA - RECTIFICADOR DE CABEZAL PANAMAX2',
          units: 1,
          barcode: 'NSK-633',
          serialNumber: 'DT-451'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN DE PIEZAS TURBINAS',
          units: 1,
          barcode: 'NSK-985',
          serialNumber: 'DT-486'
        },
        {
          description: 'HERRAMIENTA - EJE DE HERRAMIENTAS CONTRA ÁNGULOS TI-MAX X',
          units: 1,
          barcode: 'NSK-986',
          serialNumber: 'DT-487'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-987',
          serialNumber: 'DT-490'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-988',
          serialNumber: 'DT-491'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL CONTRA ÁNGULOS X95',
          units: 1,
          barcode: 'NSK-989',
          serialNumber: 'DT-492'
        },
        {
          description: 'HERRAMIENTA - LLAVE PRA TAPA DE CABEZAL CONTRA ÁNGULOS X-SG20L',
          units: 1,
          barcode: 'NSK-990',
          serialNumber: 'DT-493'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL TURBINAS X700L',
          units: 1,
          barcode: 'NSK-991',
          serialNumber: 'DT-494'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL TURBINAS TI-MAX X600L',
          units: 1,
          barcode: 'NSK-992',
          serialNumber: 'DT-495'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DE CABEZAL TURBINAS TI-MAX X700L',
          units: 1,
          barcode: 'NSK-993',
          serialNumber: 'DT-496'
        },
        {
          description: 'HERRAMIENTA - LLAVE AJUSTABLE',
          units: 1,
          barcode: 'NSK-994',
          serialNumber: 'DT-498'
        },
        {
          description: 'HERRAMIENTA - LLAVE AJUSTABLE',
          units: 1,
          barcode: 'NSK-994',
          serialNumber: 'DT-498'
        },
        {
          description: 'HERRAMIENTA - LLAVE AJUSTABLE',
          units: 1,
          barcode: 'NSK-994',
          serialNumber: 'DT-498'
        },
        {
          description: 'HERRAMIENTA - DE GUÍA',
          units: 1,
          barcode: 'NSK-995',
          serialNumber: 'DT-499'
        },
        {
          description: 'HERRAMIENTA - DE GUÍA',
          units: 1,
          barcode: 'NSK-996',
          serialNumber: 'DT-500'
        },
        {
          description: 'HERRAMIENTA - PARA INSERCIÓN DE JUNTAS TÓRICAS Z85L',
          units: 1,
          barcode: 'NSK-997',
          serialNumber: 'DT-501'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS NO ÓPTICO',
          units: 1,
          barcode: 'NSK-998',
          serialNumber: 'DT-504'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS M95L',
          units: 1,
          barcode: 'NSK-999',
          serialNumber: 'DT-505'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS FX22',
          units: 1,
          barcode: 'NSK-1004',
          serialNumber: 'DT-508'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN DE PIEZAS CONTRA ÁNGULOS TI-MAX M, Z, X',
          units: 1,
          barcode: 'NSK-1005',
          serialNumber: 'DT-511'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN DE CABEZAL CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1006',
          serialNumber: 'DT-512'
        },
        {
          description: 'HERRAMIENTA - COJINETE PARA CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1007',
          serialNumber: 'DT-513'
        },
        {
          description: 'HERRAMIENTA - COJINETE PARA CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1008',
          serialNumber: 'DT-514'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL DE LAS PIEZAS DE MANO PANAMAX2',
          units: 1,
          barcode: 'NSK-1009',
          serialNumber: 'DT-522'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL Z900 REF : DT-538',
          units: 1,
          barcode: 'NSK-1170',
          serialNumber: 'DT-538'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL DE LAS PIEZAS DE MANO PAP S',
          units: 1,
          barcode: 'NSK-1013',
          serialNumber: 'DT-540'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL DE LAS PIEZAS DE MANO PAP M',
          units: 1,
          barcode: 'NSK-1014',
          serialNumber: 'DT-541'
        },
        {
          description:
            'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL DE LAS PIEZAS DE MANO PANAMAX ESTANDAR',
          units: 1,
          barcode: 'NSK-1015',
          serialNumber: 'DT-543'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1016',
          serialNumber: 'DT-553'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA PIEZAS DE MANO PANAMAX2',
          units: 1,
          barcode: 'NSK-1017',
          serialNumber: 'DT-555'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS TI-MAX X',
          units: 1,
          barcode: 'NSK-1018',
          serialNumber: 'DT-557'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1019',
          serialNumber: 'DT-570'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS TI-MAX Z',
          units: 1,
          barcode: 'NSK-1020',
          serialNumber: 'DT-573'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS S-MAX M',
          units: 1,
          barcode: 'NSK-1021',
          serialNumber: 'DT-574'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA CONTRA ÁNGULOS SG20L',
          units: 1,
          barcode: 'NSK-1022',
          serialNumber: 'DT-575'
        },
        {
          description: 'HERRAMIENTA - PARA TIMAX X450/450L',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'DT-582'
        },
        {
          description: 'HERRAMIENTA - LLAVE DE AJUSTE EN EL RETENEDOR DE MICROMOTOR EX203',
          units: 1,
          barcode: 'NSK-1026',
          serialNumber: 'DT-608'
        },
        {
          description: 'HERRAMIENTA - LLAVE DE AJUSTE EN EL RETENEDOR DE MICROMOTOR FX205',
          units: 1,
          barcode: 'NSK-1027',
          serialNumber: 'DT-611'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS TI-MAX X',
          units: 1,
          barcode: 'NSK-1028',
          serialNumber: 'DT-624'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS TI-MAX M95L',
          units: 1,
          barcode: 'NSK-1029',
          serialNumber: 'DT-625'
        },
        {
          description: 'HERRAMIENTA - REMOVEDOR PARA MICROMOTOR NLX NANO',
          units: 1,
          barcode: 'NSK-1032',
          serialNumber: 'DT-628'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA MICROMOTORES FX',
          units: 1,
          barcode: 'NSK-1034',
          serialNumber: 'DT-639'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA MICROMOTORES EX',
          units: 1,
          barcode: 'NSK-1035',
          serialNumber: 'DT-640'
        },
        {
          description: 'HERRAMIENTA-LLAVE PARA PIEZAS DE MANO QUIRURGICAS SGS-E2',
          units: 1,
          barcode: 'NSK-1036',
          serialNumber: 'DT-641'
        },
        {
          description: 'HERRAMIENTA - PARA EL POSICIONAMIENTO PARA SCALER NEUMÁTICO AS2000',
          units: 1,
          barcode: 'NSK-1037',
          serialNumber: 'DT-643'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA MICROMOTORES FX SERIES, NLX SERIES',
          units: 1,
          barcode: 'NSK-1040',
          serialNumber: 'DT-653'
        },
        {
          description:
            'HERRAMIENTA - LLAVE PARA EL SISTEMA DE MANTENIMIENTO ICARE (LLAVE FIJA 4Xmm',
          units: 1,
          barcode: 'NSK-1041',
          serialNumber: 'H001755'
        },
        {
          description: 'HERRAMIENTA - CONTADOR DE REVOLUCIONES',
          units: 1,
          barcode: 'NSK-634',
          serialNumber: 'HPW-2'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA MICROMOTORES NLX NANO',
          units: 1,
          barcode: 'NSK-1044',
          serialNumber: 'JG028898'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS TI-MAX X95L, X-SG20L, M95L',
          units: 1,
          barcode: 'NSK-1050',
          serialNumber: 'JG029035'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA MICROMOTORES NLX NANO',
          units: 1,
          barcode: 'NSK-1051',
          serialNumber: 'JG029072'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS X-SG20L',
          units: 1,
          barcode: 'NSK-1053',
          serialNumber: 'JG029162'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS X-SG20L',
          units: 1,
          barcode: 'NSK-1054',
          serialNumber: 'JG029182'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA PIEZAS DE MANO QUIRÚRGICAS SGA-E2S',
          units: 1,
          barcode: 'NSK-1055',
          serialNumber: 'JG029206'
        },
        {
          description: 'HERRAMIENTA - DE EMPUJE PARA CONTRA ÁNGULOS TI-MAX X',
          units: 1,
          barcode: 'NSK-1057',
          serialNumber: 'JG029236'
        },
        {
          description: 'HERRAMIENTA-LLAVE PARA PIEZAS DE MANO QUIRURGICAS SGS-E2',
          units: 1,
          barcode: 'NSK-1061',
          serialNumber: 'JG029558'
        },
        {
          description:
            'HERRAMIENTA - DE FIJACIÓN DE SOPORTE PARA PIEZAS DE MANO QUIRÚRGICAS SGS-E2S',
          units: 1,
          barcode: 'NSK-1062',
          serialNumber: 'JG029560'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PIEZAS DE MANO QUIRÚRGICAS SGS-E2S',
          units: 1,
          barcode: 'NSK-1063',
          serialNumber: 'JG029565'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PIEZAS DE MANO QUIRÚRGICAS SGS-E2S',
          units: 1,
          barcode: 'NSK-1064',
          serialNumber: 'JG029593'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN SUPERIOR PARA PIEZAS DE MANO QUIRÚRGICAS SGS-E2S',
          units: 1,
          barcode: 'NSK-1065',
          serialNumber: 'JG029719'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN INFERIOR PARA PIEZAS DE MANO QUIRÚRGICAS SGS-E2S',
          units: 1,
          barcode: 'NSK-1066',
          serialNumber: 'JG029720'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN PARA CONTRA ÁNGULOS S-MAX M SERIES, M95L, M25L',
          units: 1,
          barcode: 'NSK-1071',
          serialNumber: 'JG030257'
        },
        {
          description: 'HERRAMIENTA - PIN PARA CONTRA ÁNGULOS S-MAX M95, M25, M15',
          units: 1,
          barcode: 'NSK-1075',
          serialNumber: 'JG030657'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA EL CABEZAL DE CONTRA ÁNGULOS S-MAX M SERIES, M95L',
          units: 1,
          barcode: 'NSK-1076',
          serialNumber: 'JG030721'
        },
        {
          description: 'HERRAMIENTA LLAVE 7X5.1',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'K015751'
        },
        {
          description: 'HERRAMIENTA - LLAVE 7 X 5.1',
          units: 1,
          barcode: 'NSK-354',
          serialNumber: 'K015751'
        },
        {
          description: 'HERRAMIENTA - LLAVE ARA PIEZAS DE MANO QUIRÚRGICAS SGA-E2S',
          units: 1,
          barcode: 'NSK-1079',
          serialNumber: 'K018751A'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTAS RECTAS EX-6D, EX-5B, FX65M / FX65',
          units: 1,
          barcode: 'NSK-1080',
          serialNumber: 'K040751'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA SISTEMA DE PULIDO PERIO-MATE',
          units: 1,
          barcode: 'NSK-1081',
          serialNumber: 'K133751'
        },
        {
          description: 'HERRAMIENTA - DE FIJACIÓN BLOQUE V',
          units: 1,
          barcode: 'NSK-1082',
          serialNumber: 'KT-117'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA ICARE',
          units: 1,
          barcode: 'NSK-1086',
          serialNumber: 'KT-698'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA ICARE',
          units: 1,
          barcode: 'NSK-1087',
          serialNumber: 'KT-699'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA PMN, PER',
          units: 1,
          barcode: 'NSK-1088',
          serialNumber: 'KT-700'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA SGS-E2',
          units: 1,
          barcode: 'NSK-1089',
          serialNumber: 'KT-701'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA PMN, PER',
          units: 1,
          barcode: 'NSK-1090',
          serialNumber: 'KT-702'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA ICARE',
          units: 1,
          barcode: 'NSK-1091',
          serialNumber: 'KT-703'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA CONTRA ÁNGULO TD-10',
          units: 1,
          barcode: 'NSK-1092',
          serialNumber: 'KT-704'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA CONTRA ÁNGULO',
          units: 1,
          barcode: 'NSK-1093',
          serialNumber: 'KT-706'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA CONTRA ÁNGULO',
          units: 1,
          barcode: 'NSK-1094',
          serialNumber: 'KT-707'
        },
        {
          description: 'HERRAMIENTA - CABEZAL DE LLAVE DINAMOMÉTRICA CONTRA ÁNGULO TI-MAX X',
          units: 1,
          barcode: 'NSK-1095',
          serialNumber: 'KT-731'
        },
        {
          description: 'HERRAMIENTA - EJE DE HERRAMEINTAS CONTRA ÁNGULO TI-MAX Z',
          units: 1,
          barcode: 'NSK-1096',
          serialNumber: 'KT-997'
        },
        {
          description: 'HERRAMIENTA - LLAVE PIEZA DE MANO QUIRÚRGICA SGA-EM',
          units: 1,
          barcode: 'NSK-1097',
          serialNumber: 'MT-014'
        },
        {
          description: 'HERRAMIENTA-LLAVE PARA PAX',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'P074765'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA TAPA DEL CABEZAL PARA PAX2',
          units: 1,
          barcode: 'NSK-303',
          serialNumber: 'P1190765'
        },
        {
          description: 'HERRAMIENTA- LLAVE PARA AT45',
          units: 1,
          barcode: 'NSK-342',
          serialNumber: 'P624765'
        },
        {
          description: 'HERRAMIENTA - PINZA GENERAL',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'T-2'
        },
        {
          description: 'HERRAMIENTA - PINZA SUGECION T2',
          units: 1,
          barcode: 'NSK-295',
          serialNumber: 'T-2'
        },
        {
          description: 'HERRAMIENTA - PINZA SUGECION T2',
          units: 1,
          barcode: 'NSK-295',
          serialNumber: 'T-2'
        },
        {
          description: 'HERRAMIENTA PINZA GENERAL',
          units: 1,
          barcode: 'xxx-000',
          serialNumber: 'T-3'
        },
        {
          description: 'HERRAMIENTA - PINZAS DE COBRE DE DOS AGUJEROS',
          units: 1,
          barcode: 'NSK-447',
          serialNumber: 'T-3'
        },
        {
          description: 'HERRAMIENTA - PINZAS DE COBRE DE DOS AGUJEROS',
          units: 1,
          barcode: 'NSK-447',
          serialNumber: 'T-3'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA ULTIMATE XL, UHRXL-T',
          units: 1,
          barcode: 'NSK-824',
          serialNumber: 'T-41'
        },
        {
          description: 'HERRAMIENTA - SUJETADOR DE CABEZAL PARA CONTRA ÁNGULOS TI-MAX X,Z',
          units: 1,
          barcode: 'NSK-923',
          serialNumber: 'T599710'
        },
        {
          description: 'HERRAMIENTA-LLAVE DE ANILLO PARA PIEZAS DE MANO PROPHY-M',
          units: 1,
          barcode: 'NSK-914',
          serialNumber: 'T797601'
        },
        {
          description: 'HERRAMIENTA - ALAMBRE DE LIMPIEZA RECTO PARA PIEZAS DE MANO PMN, PER',
          units: 1,
          barcode: 'NSK-921',
          serialNumber: 'T798091'
        },
        {
          description: 'HERRAMIENTA - ALAMBRE DE LIMPIEZA RECTO PARA PIEZAS DE MANO PMN, PER',
          units: 1,
          barcode: 'NSK-921',
          serialNumber: 'T798091'
        },
        {
          description: 'HERRAMIENTA - ALAMBRE DE LIMPIEZA PARA PIEZAS DE MANO PMN, PER',
          units: 1,
          barcode: 'NSK-920',
          serialNumber: 'T798092'
        },
        {
          description: 'HERRAMIENTA - ALAMBRE DE LIMPIEZA PARA PIEZAS DE MANO PMN, PER',
          units: 1,
          barcode: 'NSK-920',
          serialNumber: 'T798092'
        },
        {
          description: 'HERRAMIENTA - CEPILLO DE LIMPIEZA PARA PIEZAS DE MANO PMN, PER',
          units: 1,
          barcode: 'NSK-919',
          serialNumber: 'T798093'
        },
        {
          description: 'REPUESTO-PINZA PARA LIMA IPEX II',
          units: 1,
          barcode: 'NSK-300',
          serialNumber: 'U1109351'
        },
        {
          description: 'REPUESTO-SONDA IPEX II',
          units: 1,
          barcode: 'NSK-620',
          serialNumber: 'U1109352'
        },
        {
          description: 'REPUESTO-TESTER IPEX II',
          units: 1,
          barcode: 'NSK-346',
          serialNumber: 'U1109353'
        },
        {
          description: 'LLAVE DE CALIBRACION',
          units: 1,
          barcode: 'NSK-829',
          serialNumber: 'U494304'
        },
        {
          description: 'HERRAMIENTA - FRESA DE PRUEBA PUNTA RECTA VR-EB',
          units: 1,
          barcode: 'NSK-1104',
          serialNumber: 'Z070101'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTA RECTA FX65',
          units: 1,
          barcode: 'NSK-1108',
          serialNumber: 'Z103101'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTA RECTA UHRXL',
          units: 1,
          barcode: 'NSK-1107',
          serialNumber: 'Z103115'
        },
        {
          description: 'HERRAMIENTA - LLAVE PARA PUNTA RECTA FX65',
          units: 1,
          barcode: 'NSK-1109',
          serialNumber: 'Z103118'
        },
        {
          description: 'HERRAMIENTA MANOMETRO',
          units: 1,
          barcode: 'NSK-636',
          serialNumber: 'Z109200'
        },
        {
          description: 'REPUESTO-LLAVE SUSTITUCION DE PUNTAS',
          units: 1,
          barcode: 'NSK-171',
          serialNumber: 'Z221076'
        },
        {
          description: 'HERRAMIENTA - TESTER CHUCK',
          units: 2,
          barcode: '00',
          serialNumber: 'NSK-320'
        }
      ];

      for (const tool of tools) {
        await fireStoreService.addDocument('tools', {
          barcode: tool.barcode,
          description: tool.description,
          serialNumber: tool.serialNumber,
          created: new Date().toISOString(),
          creatorId: user.uid
        });
        console.log({ tool });
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
      closePanel,
      importTools
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
