<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="Email" />
    <br />
    <input type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    login: function() {
      window.console.log("Hello, world!");
    }
  }
};
</script>
