<template>
  <v-container class="root-container">
    <v-card>
      <v-card-title>Sign in</v-card-title>
      <v-container class="login">
          <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="text"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  v-model="email"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="password"
                  label="Password"
                  :rules="[rules.required]"
                  v-model="password"
                  outlined
                ></v-text-field>
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-col>
          </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
.root-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
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

<style scoped>
.root-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
