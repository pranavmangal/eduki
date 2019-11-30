<template>
  <div class="col-sm-8 col-md-4 col-12 login">
    <v-layout align-center>
      <v-flex fill-height>
        <h3 style="margin-bottom: 4%">Sign In</h3>
        <v-text-field type="text" label="Email" outlined v-model="email"></v-text-field>
        <v-text-field type="password" label="Password" outlined v-model="password"></v-text-field>
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            window.console.log(user);
            alert(`${user} is logged in`);
          },
          function(err) {
            window.console.log("An error occurred.", err);
          }
        );
    }
  }
};
</script>