<template>
  <div>
    <div>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <h1>Learn</h1>
            <br />
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="event in events" :key="event.name">
                <template>
                  <v-expansion-panel-header>
                    <span class="headline">{{ event.name }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pt-6">
                    <p>
                      <strong>Type:</strong>
                      {{ eventType(event) }}
                    </p>
                    <p v-if="event.type == 'workshop'">
                      <strong>Instructor:</strong>
                      {{ instructor(event) }}
                    </p>
                    <p>
                      <strong>Start Time:</strong>
                      {{ time(event) }}
                    </p>
                    <p>
                      <strong>End Time:</strong>
                      {{ endTime(event) }}
                    </p>
                    <v-btn v-if="!isGoing(event)" color="primary">Attend</v-btn>
                  </v-expansion-panel-content>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" sm="6">
            <h1>Teach</h1>
            <br />
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="event in events" :key="event.name">
                <template>
                  <v-expansion-panel-header>
                    <span class="headline">{{ event.name }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pt-6">
                    <p>
                      <strong>Type:</strong>
                      {{ eventType(event) }}
                    </p>
                    <p v-if="event.type == 'workshop'">
                      <strong>Instructor:</strong>
                      {{ instructor(event) }}
                    </p>
                    <p>
                      <strong>Start Time:</strong>
                      {{ time(event) }}
                    </p>
                    <p>
                      <strong>End Time:</strong>
                      {{ endTime(event) }}
                    </p>
                    <v-btn v-if="!isGoing(event)" color="primary">Teach</v-btn>
                  </v-expansion-panel-content>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

export default {
  name: "Events",
  mounted() {
    let vm = this;

    let userId = firebase.auth().currentUser.uid;
    window.console.log(userId);

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then(function(doc) {
        vm.user = doc.data();
        window.console.log("User", vm.user);
      });

    firebase
      .firestore()
      .collection("events")
      .get()
      .then(function(querySnapshot) {
        let documents = [];
        querySnapshot.forEach(document => {
          documents.push(document);
        });
        vm.events = documents.map(d => {
          let data = d.data();
          data.id = d.id;
          return data;
        });
      });
  },
  data() {
    return {
      user: null,
      events: [],
      workshops: [],
      groupStudySessions: []
    };
  },
  methods: {
    instructor(event) {
      if (event && event.instructor) {
        return event.instructor;
      } else {
        return "None";
      }
    },
    time(event) {
      if (event.start_time) {
        const date = event.start_time.toDate();
        return moment(date).format("HH:mm - Do MMM YYYY");
      } else {
        return null;
      }
    },
    endTime(event) {
      if (event.start_time) {
        const date = event.end_time.toDate();
        return moment(date).format("HH:mm - Do MMM YYYY");
      } else {
        return null;
      }
    },
    isGoing(event) {
      return this.user.events.includes(event.id);
    },
    eventType(event) {
      if (event.type == "workshop") {
        return "workshop";
      } else {
        return "group study";
      }
    }
  }
};
</script>
