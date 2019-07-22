<template lang="html">

  <section class="send-dialog">

    <v-dialog v-model="isOpen" max-width="290">
      <v-card>
        <v-card-title class="headline">Send Money</v-card-title>
        <v-card-text>
          <v-text-field outline clearable label="Recipient"></v-text-field>
          <v-text-field outline clearable label="Amount in Bit$"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgb(92, 190, 223)" flat="flat" @click="emit(false)">Cancel</v-btn>
          <v-btn color="rgba(145, 227, 255)" @click="emit(false)">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </section>

</template>

<script lang="js">
  export default  {
    name: 'send-dialog',
    props: ["value"],
    mounted() {

    },
    data() {
      console.log("calculation data " + this.isOpenProp)
      return {
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
