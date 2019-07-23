<template>
  <v-container fluid v-bind:class="containerClass">
    <!-- Balance div -->
    <v-layout align-center row justify-center class="text-uppercase balance-cont">
      <v-flex v-bind:class="centerText">
        <div class="balance-text">{{balance/100000000 + " BTC"}}</div>
        <v-spacer></v-spacer>BALANCE
      </v-flex>
    </v-layout>

    <!-- Buttons -->
    <v-layout row justify-center>
      <v-flex xs7>
        <v-layout justify-space-around xs10 offset-xs1>
          <v-btn @click.stop="sendDialogIsOpen=true" v-bind:class="buttonClass" round large>
            <v-icon>send</v-icon>Send
          </v-btn>
          <v-btn v-bind:class="buttonClass" @click.stop="recieveDialogIsOpen=true" round large>
            <v-icon>archive</v-icon>Recive
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Dialogs -->
    <SendDialog v-model="sendDialogIsOpen"></SendDialog>
    <RecieveDialog v-model="recieveDialogIsOpen"></RecieveDialog>
  </v-container>
</template>


<script>
import SendDialog from "./SendDialog";
import RecieveDialog from "./RecieveDialog";
import axios from "axios";

let balace = 0;

export default {
  props: [],
  components: {
    SendDialog,
    RecieveDialog
  },
  data: () => ({
    buttonClass: "button",
    containerClass: "container",
    centerText: "centerText",
    balance: balace,
    sendDialogIsOpen: false,
    recieveDialogIsOpen: false
  }),
  mounted() {
    axios
      .get("http://localhost:3000/balance")
      .then(
        response =>
          (this.balance =
            Number(response.data.confirmed) + Number(response.data.unconfirmed))
      );
  },
  methods: {}
};
</script>

<style>
.button {
  color: rgb(92, 190, 223) !important;
  width: 150px;
}

.container {
  background: rgb(200, 230, 255);
  background: radial-gradient(
    circle,
    rgba(200, 230, 255, 1) 0%,
    rgba(145, 227, 255, 1) 100%
  );
  width: 100%;
  height: 300px;
}

.centerText {
  text-align: center;
}

.balance-cont {
  height: 200px;
}

.balance-text {
  font-size: 5em;
  font-weight: 100;
  color: white;
}
</style>