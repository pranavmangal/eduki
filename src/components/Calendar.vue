<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          :event-color="getEventColor"
          color="primary"
          type="week"
        >
          <!-- the events at the top (all-day) -->
          <template v-slot:day-header="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:day-body="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>

<script>
  import firebase from "firebase";

  export default {
    data: function() {
      return {
        today: this.dateToCalendarString(new Date(Date.now())),
        events: [
          {
            name: 'Start of the modern era',
            start: '2000-01-01',
          },
        ],
      }
    },
    mounted () {
      this.$refs.calendar.scrollToTime('08:00');

      var db = firebase.firestore();

      db.collection("workshops")
          .onSnapshot((snapshot) => {
              this.updateEvents(snapshot, "workshop");
          }, (error) => {
              window.console.log(error);
          });
      db.collection("group-study-sessions")
          .onSnapshot((snapshot) => {
              this.updateEvents(snapshot, "group-study-session");
          }, (error) => {
              window.console.log(error);
          });
    },
    methods: {
      updateEvents(snapshot, eventType) {
        /* Remove old workshops */
        this.events = this.events.filter(e => e.type !== eventType);
        /* Add newly fetched workshops */
        snapshot.forEach(doc => {
          let data = doc.data();
          let start = new Date(data.start_time.toDate());
          let end = new Date(data.end_time.toDate());

          let start_time_string = this.dateToCalendarString(start);
          let end_time_string = this.dateToCalendarString(end);

          let color = "primary";
          switch (eventType) {
            case "workshop":
              if (data.confirmed) {
                color = "green";
              } else {
                color = "secondary";
              }
              break;
            case "group-study-session":
              color = "red";
              break;
          }

          /* Add the workshops to the events */
          this.events.push({
            name: data.name,
            start: start_time_string,
            end: end_time_string,
            type: eventType,
            color: color
          });
        })
      },
      /* Converts date to a calendar string with a bit of magic */
      dateToCalendarString(date) {
        return date.toISOString().substring(0, 10) + ' '
            + date.toISOString().substring(11, 16);
      },
      getEventColor(e) {
        return e.color;
      }
    },
  }
</script>
