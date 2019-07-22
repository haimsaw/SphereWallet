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
          <v-btn color="rgb(92, 190, 223)" flat="flat" @click="isOpen=false">Cancel</v-btn>
          <v-btn color="rgba(145, 227, 255)" @click="isOpen=false">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </section>

</template>

<script lang="js">
  export default  {
    name: 'send-dialog',
    props: ["value", "isOpenProp"],
    mounted() {

    },
    data() {
      console.log("calculation data " + this.isOpenProp)
      return {
        isOpen: this.isOpenProp
      }
    },
  methods:{

  },
    watch: {
    isOpenProp (val) {
      console.log('emitting');
      this.isOpen=val
         this.$emit("input", val)
    }},
    computed: {

    }
}
</script>

<style >
.send-dialog {
}
</style>
