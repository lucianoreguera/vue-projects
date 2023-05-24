<template>
  <div class="md:w-1/2 lg:w-2/5 mx-5">
    <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>

    <p class="text-lg mt-5 text-center mb-10">
      Añade Pacientes y <span class="text-indigo-600 font-bold ">Administralos</span>
    </p>

    <form 
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      @submit.prevent="handleSubmit"
    >
      <ErrorComponent v-show="error" message="Todos los campos son obligatorios" />
      <div class="mb-5">
        <label htmlFor="pet" class="block text-gray-700 uppercase font-bold">
          Nombre Mascota
        </label>
        <input
          id="pet"
          type="text"
          placeholder="Nombre de la Mascota"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="pet"
        />  
      </div>

      <div class="mb-5">
        <label htmlFor="owner" class="block text-gray-700 uppercase font-bold">
          Nombre Propietario
        </label>
        <input
          id="owner"
          type="text"
          placeholder="Nombre del Propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="owner"
        />  
      </div>

      <div class="mb-5">
          <label htmlFor="email" class="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            v-model="email"
          />  
      </div>

      <div class="mb-5">
        <label htmlFor="alta" class="block text-gray-700 uppercase font-bold">
          Alta
        </label>
        <input
          id="alta"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="entryDate"
        />  
      </div>

      <div class="mb-5">
        <label htmlFor="sintomas" class="block text-gray-700 uppercase font-bold">
          Síntomas
        </label>
        <textarea 
          id="sintomas"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Describe los Síntomas"
          v-model="symptoms"
        />
      </div>

      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits, Ref, ref, watchEffect } from 'vue'
  import ErrorComponent from './ErrorComponent.vue';
  import { generateUUID } from '../helpers/index';
  import IPatient from '../interfaces/IPatient';

  let pet:Ref<string> = ref<string>('')
  let owner:Ref<string> = ref<string>('')
  let email:Ref<string> = ref<string>('')
  let entryDate:Ref<Date> = ref<Date>(new Date())
  let symptoms:Ref<string> = ref<string>('')
  // let patientsList:Ref<Array<IPatient>> = ref<Array<IPatient>>([])
  const error:Ref<boolean> = ref<boolean>(false)

  const props = defineProps({
    patient: {
      type: Object,
      required: true
    },
    patients: {
      type: Array,
      required: true
    }
  })

  const emits = defineEmits(['setPatientsList'])

  // watchEffect(() => {
  //   if( Object.keys(props.patient).length > 0  ) {
  //     pet.value = props.patient.pet
  //     owner.value = props.patient.owner
  //     email.value = props.patient.email
  //     entryDate.value = props.patient.entryDate
  //     symptoms.value = props.patient.symptoms
  //   }

  //   // patientsList.value = props.patients
  //   // console.log(typeof props.patients)
  //   // patientsList.value = props.patients.map( patient => patient. === props.patient.id ? newPatient : patient )
  // });

  const handleSubmit = () => {
    if ( [ pet.value, owner.value, email.value, symptoms.value ].includes('') ) {
      error.value = true
      return;
    }

    error.value = false
    
    const newPatient:IPatient = {
      pet: pet.value,
      owner: owner.value,
      email: email.value,
      entryDate: entryDate.value,
      symptoms: symptoms.value
    }

    // if(props.patient.id) {
    //   // Edit
    //   // newPatient.id = props.patient.id
    //   // const newPatientsList = props.patients.map( patient => console.log(patient) )//patient => patient.id === props.patient.id ? newPatient : patient )

    //   // setPacientes(pacientesActualizados)
    //   // setPaciente({})
    //   // console.log(newPatientsList)

    // } else {
    //   // Nuevo registro
    //   // objetoPaciente.id = generarId();
    //   // setPacientes([...pacientes, objetoPaciente]);
    // }

    pet.value = ''
    owner.value = ''
    email.value = ''
    entryDate.value = new Date()
    symptoms.value = ''
    savePatient(newPatient)    
  }

  const savePatient = (patient:IPatient) => {
    emits('setPatientsList', patient)
  }
</script>
