<template>
  <div>
    <div style="float:left">
      <Navigation />
    </div>
    <div>
      <Calendar />
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Calendar from "../components/Calendar";

export default {
  name: "Home",
  components: {
    Navigation,
    Calendar
  }
};
</script>