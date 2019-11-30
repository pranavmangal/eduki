<template>
  <div>
    <div style="float:left">
      <Navigation></Navigation>
    </div>
    <div>
      <v-container fluid>
        <v-layout>
          <h1>Events Page</h1>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  name: "Events",
  components: {
    Navigation
  }
};
</script>