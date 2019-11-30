<template>
  <v-app>
    <Calendar msg="Welcome to Vue"/>
    <router-view />
  </v-app>
</template>

<script>
import {} from "vue-router";
import Calendar from "./components/Calendar";

export default {
  name: "App",
  components: {
    Calendar
  },
  data: () => ({
    //
  })
};
</script>
