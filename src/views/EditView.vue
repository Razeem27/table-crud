<template>
  <div>
    <v-container class="px-16 d-flex mt-15">
      <h1>Create New Student Data</h1>
      <form class="px-16 col-6" @submit.prevent="handleSubmit">
        <v-text-field v-model="sname" label="Name"></v-text-field>
        <v-select
          v-model="sgender"
          :items="['Male', 'Female']"
          label="Gender"
        ></v-select>
        <v-text-field v-model.number="physics" label="Physics score"></v-text-field>
        <v-text-field v-model.number="maths" label="Maths score"></v-text-field>
        <v-text-field v-model.number="english" label="English score"></v-text-field>

        <v-btn class="mr-4" type="submit"> Update </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-container>
  </div>
</template>

<script>
import Axios from "@/Api/Axios";
import FormData from "@/Mixins/FormMixin";

export default {
  name: "EditView",
  mixins: [FormData],
  async created(){
     let {data}=await Axios.get(`/student/${this.$route.params.id}`)   
     this.sname=data.name;
     this.sgender=data.gender;
     this.maths=data.maths;
     this.physics=data.physics;
     this.english=data.english;
  }
  ,
  methods: {
    async handleSubmit() {
      let newData = {
        name: this.sname,
        gender: this.sgender,
        physics: this.physics,
        maths: this.maths,
        english: this.english,
        total:this.getTotal(),
      };
      await Axios.put(`/student/${this.$route.params.id}`, newData);
      this.$router.push("/");
      this.$vToastify.success("successfully Updated");
    },
  },
};
</script>

<style scoped></style>
