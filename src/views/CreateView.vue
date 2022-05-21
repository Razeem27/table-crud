<template>
  <div>
    <v-container class="px-16 d-flex mt-15">
      <div class="d-flex flex-column align-center">
        <h1 class="mb-15">Create New Student Data</h1>
         <v-avatar color="indigo" size="128">
      <v-icon dark class="avatar-icon">
        mdi-account-circle
      </v-icon>
    </v-avatar>

      </div>

      <form class="px-16 col-6" @submit.prevent="handleSubmit">
        <v-text-field v-model="sname" label="Name"></v-text-field>
        <v-select
          v-model="sgender"
          :items="['Male', 'Female']"
          label="Gender"
        ></v-select>
        <v-text-field
          v-model.number="physics"
          label="Physics score"
        ></v-text-field>
        <v-text-field v-model.number="maths" label="Maths score"></v-text-field>
        <v-text-field
          v-model.number="english"
          label="English score"
        ></v-text-field>

        <v-btn class="mr-4" type="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-container>
  </div>
</template>

<script>
import FormData from "../Mixins/FormMixin";
export default {
  name: "CreateView",
  mixins: [FormData],
};
</script>

<style scoped>
.avatar-icon {
  font-size: 8rem !important;
}
</style>
