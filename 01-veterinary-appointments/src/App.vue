<template>
  <div className="container mx-auto mt-20">
    <HeaderComponent />

    <div className="mt-12 md:flex">
      <FormComponent :patient="patient" :patients="patients" @addPatient="addPatient" @editPatient="editPatient" />
      <PatientList :patients="patients" @deletePatient="deletePatient" @selectPatient="selectPatient" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, onMounted, watch } from 'vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import PatientList from '@/components/PatientList.vue'
  import FormComponent from '@/components/FormComponent.vue'
  import IPatient from './interfaces/IPatient';

  const patients:Ref<Array<IPatient>> = ref([])
  const patient:Ref<IPatient> = ref<IPatient>({})

  onMounted(() => {
    const patientsLS = JSON.parse(localStorage.getItem('patients')) || []
    patients.value = patientsLS 
  })

  watch(patients, (newVal) => {
    localStorage.setItem('patients', JSON.stringify(newVal))
  }, {
    deep: true
  })

  const addPatient = (patient:IPatient) => {
    patients.value = [ ...patients.value, patient ]
  }

  const deletePatient = (patientSelected:IPatient) => {
    patients.value = patients.value.filter(patient => patient.id !== patientSelected.id)
  }

  const selectPatient = (patientSelected:IPatient) => {
    patient.value = patientSelected
  }

  const editPatient = (patientEdit:IPatient) => {
    deletePatient(patientEdit)
    addPatient(patientEdit)
    patient.value = {}
  }

</script>
