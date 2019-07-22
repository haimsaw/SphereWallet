<template>
  <v-app>
    <v-content>
      <Header></Header>
      <History></History>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import History from "./components/History";

export default {
  name: "App",
  components: {
    Header,
    History
  },
  data() {
    return {
      //
    };
  }
};
</script>
