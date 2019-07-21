<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{"ZenGo - Microsoft "}}</span>
        <span class="font-weight-light">Hackathon</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Header></Header>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      //
    };
  }
};
</script>
