<template>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">eduki</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title v-html="username"></v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
          class="nav-list-item"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" style="text-align: center;">
          <v-btn color="primary" :to="'/events/new'">
            <v-icon>mdi-plus</v-icon>New event
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>

<script>

export default {
  name: "Navigation",
  props: [
    "user",
  ],
  data() {
    return {
      items: [
        { title: "Home", path: "/", icon: "mdi-home" },
        {
          title: "Coursework",
          path: "/coursework",
          icon: "mdi-file-document"
        },
        { title: "Events", path: "/events", icon: "mdi-chat" }
      ],
      right: null,
    };
  },
  computed: {
    username: function() {
      if (this.user === null) {
        return "";
      }
      return this.user.email;
    }
  }
};
</script>
