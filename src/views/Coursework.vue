<template>
  <div>
    <div style="float:left">
      <Navigation></Navigation>
    </div>
    <div>
      <v-container fluid>
        <v-layout>
          <h1>CW Page</h1>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";

export default {
  name: "Coursework",
  components: {
    Navigation
  }
};
</script>