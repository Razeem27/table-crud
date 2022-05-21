<template>
  <v-app>
    <v-app-bar app class="">
      <v-container>
        <v-row>
          <v-col>
            <router-link to="/" class="mr-10 text-decoration-none">Home</router-link>
            <router-link to="/create" class="text-decoration-none">Create</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
