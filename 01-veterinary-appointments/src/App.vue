<template>
  <div className="container mx-auto mt-20">
    <HeaderComponent />

    <div className="mt-12 md:flex">
      <FormComponent :patient="patient" :patients="patients" @setPatientsList="setPatientsList" />
      <PatientList :patients="patients" @deletePatient="deletePatient" @selectPatient="selectPatient" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref} from 'vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import PatientList from '@/components/PatientList.vue'
  import FormComponent from '@/components/FormComponent.vue'
  import IPatient from './interfaces/IPatient';

  const patients:Ref<Array<IPatient>> = ref([])
  const patient:Ref<IPatient> = ref<IPatient>({})

  const setPatientsList = (patient:IPatient) => {
    patients.value = [ ...patients.value, patient ]
  }

  // const setPatient = (patientSelected:IPatient) => {
  //   patient.value = patientSelected
  // }

  const deletePatient = (patientSelected:IPatient) => {
    patients.value = patients.value.filter(patient => patient.id !== patientSelected.id)
  }

  const selectPatient = (patientSelected:IPatient) => {
    patient.value = patientSelected
  }

  // const editPatient = () => {
  //   console.log('first')
  // }

</script>
