<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{"ZenGo - Microsoft "}}</span>
        <span class="font-weight-light">Hackathon</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content></v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  }
};
</script>
