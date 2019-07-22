<template lang="html">

  <section class="recieve-dialog">

    <v-dialog v-model="isOpen" max-width="350">
      <v-card>
        <v-card-title class="headline">Addrees To Recieve Funds</v-card-title>
        <v-card-text>
          {{message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgba(145, 227, 255)" @click="emit(false)">Thanks!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </section>

</template>

<script lang="js">
import axios from "axios";
  export default  {
    name: 'recieve-dialog',
    props: ["value"],
    mounted() {
    axios
      .get('http://localhost:3000/recieve')
      .then(response => (this.message = response.data))
    },
    data() {
      return {
          message: null,
        isOpen: this.value
      }
    },
  methods:{
    emit: function(val) {
      this.isOpen= val;
      this.$emit("input", val)
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
