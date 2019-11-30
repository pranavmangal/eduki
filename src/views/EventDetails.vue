<template>
  <div class="root">
    <v-progress-circular v-if="event == null" indeterminate></v-progress-circular>
    <div v-else>
      <v-card class="event-card">
        <h1 class="display-2">{{ event.name }}</h1>
        <v-divider class="divider"></v-divider>
        <p class="headline">Instructor: {{ instructor }}</p>
        <p>
          <strong>Time:</strong>
          {{ time }}
        </p>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

export default {
  props: ["id", "type"],
  mounted: function() {
    let collection;
    let vm = this;

    if (this.type == "workshop") {
      collection = "workshops";
    } else if (this.type == "group-study") {
      collection = "group-study-sessions";
    } else {
      window.console.error("Invalid event type: " + this.type);
      return;
    }

    firebase
      .firestore()
      .collection(collection)
      .doc(this.id)
      .get()
      .then(function(document) {
        vm.updateEvent(document.data());
      })
      .catch(function(error) {
        window.console.error(`Failed to get workshop with id: ${vm.id}`, error);
      });
  },
  data() {
    return {
      event: null
    };
  },
  computed: {
    instructor: function() {
      if (this.event && this.event.instructor) {
        return this.event.instructor;
      } else {
        return "None";
      }
    },
    time: function() {
      const date = this.event.start_time.toDate();
      return moment(date).format("HH:mm - Do MMM YYYY");
    }
    // duration: function() {}
  },
  methods: {
    updateEvent(event) {
      this.event = event;
    }
  }
};
</script>

<style scoped>
.root {
  padding: 2rem;
}

.event-card {
  padding: 1.5rem;
}

.divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
