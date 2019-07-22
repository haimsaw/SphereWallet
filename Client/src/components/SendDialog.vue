<template lang="html">

  <section class="send-dialog">

    <v-dialog v-model="isOpen" max-width="350">
      <v-card>
        <v-card-title class="headline">Send Money</v-card-title>
        <v-card-text>
          <v-text-field outline v-model="address" clearable label="Recipient"></v-text-field>
          <v-text-field outline v-model="amount" clearable label="Amount in Bit$"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgb(92, 190, 223)" flat="flat" @click="emit(false)">Cancel</v-btn>
          <v-btn color="rgba(145, 227, 255)" @click="sendRequestAndClose()">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </section>

</template>

<script lang="js">
import axios from "axios";

  export default  {
    name: 'send-dialog',
    props: ["value"],
    mounted() {

    },
    data() {
      console.log("calculation data " + this.isOpenProp)
      return {
        isOpen: this.value,
        address:"",
        amount: ""
      }
    },
  methods:{
    emit: function(val) {
      this.isOpen= val;
      this.$emit("input", val)
    },
        sendRequestAndClose: function() {
          const {address, amount} = this
          axios.post("http://localhost:3000/send", {address,amount})
          .then(res => console.log(res.data))

          // Close this component
          this.emit(false);

    }

  },
    watch: {
    isOpen (val) {
         this.$emit("input", val)
    },
    value(val) {
      this.isOpen = val
    }
  },
    computed: {

    }
}
</script>

<style >
.send-dialog {
}
</style>
