<template>
  <div>
    <v-sheet height="10vh">
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="90vh">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :now="today"
        :value="today"
        :events="events"
        :event-color="getEventColor"
        color="primary"
        :type="type"
        :weekdays="weekdays"
        @click:more="viewDay"
        @click:date="viewDay"
        @click:event="showEvent"
        @change="updateRange"
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
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div v-if="selectedEvent.type === 'workshop'">
              <span v-if="selectedEvent.instructor !== null">
                <span v-html="selectedEvent.instructor"></span> will be leading this workshop.
              </span>
              <span v-else>This workshop doesn't yet have an assigned instructor.</span>
              <br />
              <span>
                There are
                <span v-html="selectedEvent.attendees.length"></span> participants registered for this event.
              </span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
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
      focus: this.today,
      type: "week",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      events: [
        {
          name: "Start of the modern era",
          start: "2000-01-01"
        }
      ]
    };
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const prefixMonth = startMonth === endMonth ? "" : startMonth;

      const startYear = start.year;
      const endYear = end.year;
      const prefixYear = startYear === endYear ? "" : startYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
          return `${startDay} ${prefixMonth} ${prefixYear} - ${endDay} ${endMonth} ${endYear}`;
        case "day":
          return `${startDay} ${startMonth} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
    this.$refs.calendar.checkChange();

    var db = firebase.firestore();

    db.collection("workshops").onSnapshot(
      snapshot => {
        this.updateEvents(snapshot, "workshop");
      },
      error => {
        window.console.log(error);
      }
    );
    db.collection("group-study-sessions").onSnapshot(
      snapshot => {
        this.updateEvents(snapshot, "group-study-session");
      },
      error => {
        window.console.log(error);
      }
    );
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
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

        let event = {
          name: data.name,
          start: start_time_string,
          end: end_time_string,
          type: eventType
        };

        switch (eventType) {
          case "workshop":
            event.instructor = data.instructor;
            event.attendees = data.attendees;
            if (data.confirmed) {
              event.color = "green";
            } else {
              event.color = "secondary";
            }
            break;
          case "group-study-session":
            event.color = "red";
            break;
        }

        this.events.push(event);
      });
    },
    /* Converts date to a calendar string with a bit of magic */
    dateToCalendarString(date) {
      return (
        date.toISOString().substring(0, 10) +
        " " +
        date.toISOString().substring(11, 16)
      );
    },
    getEventColor(e) {
      return e.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.$refs.calendar.scrollToTime("08:00");
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>
