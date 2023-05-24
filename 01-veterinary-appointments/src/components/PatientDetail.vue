<template>
  <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: <span className="font-normal normal-case">{{ patient.pet }}</span>
    </p>

    <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: <span className="font-normal normal-case">{{ patient.owner }}</span>
    </p>

    <p className="font-bold mb-3 text-gray-700 uppercase">Email: <span className="font-normal normal-case">{{ patient.email }}</span>
    </p>

    <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta: <span className="font-normal normal-case">{{ patient.entryDate }}</span>
    </p>

    <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: <span className="font-normal normal-case">{{ patient.symptoms }}</span>
    </p>

    <div className="flex justify-between mt-10">
        <button 
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
            @click="selectPatient(patient)"
        >Editar</button>

        <button 
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
            @click="deletePatient(patient)"
        >Eliminar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import IPatient from '@/interfaces/IPatient';

  defineProps({
    patient: {
      type: Object,
      required: true
    }
  })

  const emits = defineEmits(['deletePatient', 'selectPatient'])

  const deletePatient = (patient:IPatient) => {
    emits('deletePatient', patient)
  }

  const selectPatient = (patient:IPatient) => {
    emits('selectPatient', patient)
  }
</script>
