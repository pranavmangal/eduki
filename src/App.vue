<template>
  <v-app>
    <Navigation v-if="isLoggedIn" :user="user"></Navigation>
    <v-content v-if="showContent">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Navigation from "./components/Navigation";

export default {
  name: "App",
  data: function() {
    return {
      user: null
    };
  },
  components: {
    Navigation,
  },
  computed: {
    isLoggedIn: function() {
      return this.user !== null;
    },
    showContent: function() {
      return this.isLoggedIn || this.$route.path === "/login";
    }
  },
  mounted: async function() {
    firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        if (this.user !== null) {
          this.$router.replace({path: "/"});
        } else {
          this.$router.replace({path: "/login"})
        }
    });
    this.user = await firebase.auth().currentUser;
    if (this.user !== null) {
      this.$router.replace({path: "/"});
    } else {
      this.$router.replace({path: "/login"})
    }
  }
};
</script>
