<template>
  <v-app>
    <Navigation v-if="isLoggedIn()"></Navigation>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  },
  methods: {
    async isLoggedIn() {
      let user = firebase.auth().currentUser;
      return user !== null;
    }
  }
};
</script>
