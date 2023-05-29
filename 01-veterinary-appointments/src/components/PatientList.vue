<template>
  <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
    <div v-if="props.patients.length > 0">
      <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tus <span className="text-indigo-600 font-bold ">Pacientes y Citas</span>
      </p>
      
      <PatientDetail v-for="patient in patients" :key="patient" :patient="patient" @deletePatient="deletePatient" />
    </div>
    
    <div v-else>
      <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Comienza agregando pacientes <span className="text-indigo-600 font-bold ">y aparecerán en este lugar</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import PatientDetail from './PatientDetail.vue'
  import IPatient from '../interfaces/IPatient'

  const props = defineProps({
    patients: {
      type: Array,
      required: true
    }
  })

  const emits = defineEmits(['deletePatient'])

  const deletePatient = (patient:IPatient) => {
    emits('deletePatient', patient)
  }

  // const selectPatient = (patient:IPatient) => {
  //   emits('selectPatient', patient)
  // }
</script>
