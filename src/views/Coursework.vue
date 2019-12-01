<template>
  <div>
    <window>
      <card>
        <v-card class="mx-auto" max-width="344" v-for="item in items" :key="item.id">
          <v-card-text>
            <div>{{item.Module}}</div>
            <p class="display-1 text--primary">{{item.title}}</p>
            <p>{{item.Estimated}} hours</p>
            <div class="text--primary">
              <a href="@">{{item.Link}}</a>
              <br />
              {{item.Added}} ~ {{item.Due}}
            </div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-btn text color="deep-purple accent-4" @click="done(item)"> Done </v-btn> -->
          </v-card-actions>
        </v-card>
      </card>
    </window>
    <RightBar>
      <work>
        <div v-for="item in items" :key="item.id">
          <div>{{item.title}} - {{item.Due}}</div>
        </div>
      </work>
    </RightBar>
  </div>
</template>

<script>
import firebase from "firebase";
import RightBar from "../components/RightBar";
import window from "../components/window";
import work from "../components/work";
import card from "../components/card";

// import RightBar from "../components/RightBar"

export default {
  data() {
    var courseworks = [];
    // var finalcourseworks = [];
    var db = firebase.firestore();
    // var averageEstimate
    var course = "EIE";
    db.collection("course")
      .doc(course)
      .collection(course)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var coursework = {
            title: "Coursework0",
            Due: "Date",
            Added: "Added",
            Estimated: 0,
            Width: 0
          };

          // doc.data() is never undefined for query doc snapshots
          coursework["title"] = doc.data().name;
          coursework["Due"] = doc.data().due;
          coursework["Added"] = doc.data().added;
          coursework["Module"] = doc.data().Module;
          coursework["Estimated"] = parseInt(doc.data().estimation);
          coursework["Link"] = doc.data().Link;

          courseworks.push(coursework);
        });
      });

    var items = courseworks;
    return {
      items
    };
  },
  components: {
    RightBar,
    window,
    work,
    card
  }
};
</script>

