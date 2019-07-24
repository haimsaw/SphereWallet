<template lang="html">

  <section class="send-dialog">
    <v-dialog v-model="isOpen" width="500">
      <v-card>
        <v-card-title class="headline">Send Money</v-card-title>
        <v-card-text>
          <v-text-field outline v-model="address" clearable label="Recipient Address"></v-text-field>
          <v-text-field outline v-model="amount" clearable label="Amount in Satoshi$"></v-text-field>
                  <v-expand-transition>
                   <v-layout v-bind:class="messageClass" v-show="showMessage" justify-center >
                      <p v-if="!isError">
                        <v-icon>check-circle-outline</v-icon>
                        Transaction Succeded!
                        <a :href="messageLink">Show details</a>
                      </p>
                      <p v-else>
                        <v-icon color="red">close</v-icon>
                        Transaction Failed! Please try again
                      </p>
                   </v-layout>
                  </v-expand-transition>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgb(92, 190, 223)" flat="flat" @click="emit(false)">Cancel</v-btn>
          <v-btn color="rgba(145, 227, 255)" :loading="isLoading" @click="sendRequestAndClose()">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </section>

</template>

<script lang="js">
import axios from "axios";

  export default  {
    name: 'send-dialog',
    props: ["value"],
    components: {
      
    },
    mounted() {

    },
    data: getDefaultData,
  methods:{
    emit: function(val) {
      this.isOpen= val;
      this.$emit("input", val)
    },
      sendRequestAndClose: function() {
        const {address, amount} = this;
        this.isLoading = true
        axios.post("http://localhost:3000/send", {address,amount})
        .then(res => {
                this.message =  "Sending funds succeded! " 
                this.messageClass = "msg-succ";

              this.isLoading = false;
              this.showMessage = true;
              this.messageLink= "https://blockstream.info/testnet/tx/"+res.data
              this.isError = false;
              // Close this component
              //this.emit(false)
        }).catch((e) => {
              this.message = "Error sending funds! Please try again";
              this.messageClass = "msg-err";
              this.showMessage = true;
              this.isLoading = false;
              this.isError = true;
          })
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

function getDefaultData() {
    return {
        isOpen: this.value,
        showMessage: false,
        isLoading:false,
        messageClass: "",
        messageLink :"",
        isError: false,
        address:"",
        amount: ""
    }
}


</script>

<style >
.msg-err {
  color: red;
}

.msg-succ {
  color: green;
}
</style>
