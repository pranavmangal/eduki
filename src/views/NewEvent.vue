<template>
  <div>
    <v-container class="root-container">
      <v-form class="d-flex center-vertical">
        <v-card>
          <v-card-title>Create Event</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Event Name" v-model="eventName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="eventTypes" v-model="eventType" label="Event Type" outlined></v-select>
              </v-col>
            </v-row>
            <v-row></v-row>
            <v-row>
              <v-col cols="12">
                <v-dialog
                  ref="eventDateDialog"
                  v-model="eventDateModal"
                  :return-value.sync="eventDate"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="eventDate" label="Date" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="eventDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="eventDateModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.eventDateDialog.save(eventDate)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-dialog
                  ref="eventStartTimeDialog"
                  v-model="eventStartTimeModal"
                  :return-value.sync="eventStartTime"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="eventStartTime" label="Start Time" readonly v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-model="eventStartTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="eventStartTimeModal = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.eventStartTimeDialog.save(eventStartTime)"
                    >OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-dialog
                  ref="eventEndTimeDialog"
                  v-model="eventEndTimeModal"
                  :return-value.sync="eventEndTime"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="eventEndTime" label="End Time" readonly v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-model="eventEndTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="eventEndTimeModal = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.eventEndTimeDialog.save(eventEndTime)"
                    >OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="primary" @click="onCreateEvent">Create</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-form>
    </v-container>
  </div>
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
import moment from "moment";

export default {
  name: "New Event",
  data() {
    return {
      eventDateModal: false,
      eventStartTimeModal: false,
      eventEndTimeModal: false,
      eventName: "",
      eventType: "",
      eventDate: null,
      eventStartTime: null,
      eventEndTime: null,
      eventTypes: [
        { text: "Workshop", value: "workshop" },
        { text: "Group Study Session", value: "group-study" }
      ],
    };
  },
  methods: {
    onCreateEvent() {
      const eventDate = moment(this.eventDate);
      const startTime = moment(this.eventStartTime, "HH:mm");
      const endTime = moment(this.endTime, "HH:mm");

      const eventStartTime = eventDate
        .add(startTime.hours(), "hours")
        .add(startTime.minutes(), "minutes");
      const eventEndTime = eventDate
        .add(endTime.hours(), "hours")
        .add(endTime.minutes(), "minutes");

      if (this.eventType == "workshop") {
        firebase
          .firestore()
          .collection("workshops")
          .add({
            name: this.eventName,
            start_time: firebase.firestore.Timestamp.fromDate(
              eventStartTime.toDate()
            ),
            end_time: firebase.firestore.Timestamp.fromDate(
              eventEndTime.toDate()
            ),
            instructor: null,
            attendees: [],
            confirmed: false
          });
      }
    }
  }
};
</script>
