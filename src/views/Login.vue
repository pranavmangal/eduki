<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="Email" v-model="email" />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="login">Login</button>
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
