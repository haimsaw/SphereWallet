<template>
  <v-container fluid v-bind:class="containerClass">
    <v-layout align-center row fill-height justify-center class="text-uppercase">
      <v-flex>{{balance}}</v-flex>
    </v-layout>
    <v-layout align-end row justify-center>
      <v-flex xs6>
        <v-layout fill-height justify-space-around xs10 offset-xs1>
          <v-btn v-bind:class="buttonClass" round large>Send</v-btn>
          <v-btn v-bind:class="buttonClass" round large>Recive</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
let balace = 1000;

export default {
  data: () => ({
    buttonClass: "button",
    containerClass: "container",
    balance: balace
  })
};
</script>

<style>
.button {
  color: lightblue !important;
}

.container {
  background-color: lightblue;
  width: 100%;
  height: 300px;
}
</style>