<template>
  <v-card height="100vh" width="15vw" class="mx-left">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">eduki</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="'../' + item.title"
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
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Coursework", icon: "mdi-file-document" },
        { title: "Events", icon: "mdi-chat" }
      ],
      right: null
    };
  }
};
</script>