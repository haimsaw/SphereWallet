<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="history">
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.title" avatar @click>
              <v-list-tile-avatar>
                <img :src="item.avatar" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <a :href="item.subtitle" target="_blank">
                  <v-list-tile-sub-title>See Transaction Details</v-list-tile-sub-title>
                </a>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// data_url = "https://api.myjson.com/bins/wzf3c";

export default {
  data() {
    return {
      items: [
        // { header: "Today" },
        // {
        //   avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
        //   title: "Bitcoin payment",
        //   subtitle: "0.21245 BTC"
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
        //   title: "Bitcoin payment",
        //   subtitle: "0.2125 BTC"
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
        //   title: "Bitcoin payment",
        //   subtitle: "0.17245 BTC"
        // }
      ]
    };
  },
  mounted() {
    // fetch("https://api.myjson.com/bins/wzf3c")
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.warn(data);
    //     let mapped = data.map(function(item) {
    //       return {
    //         avatar: item.avatar,
    //         title: item.description,
    //         subtitle: item.country
    //       };
    //     });
    //     console.warn(mapped);
    //     mapped.forEach(item => {
    //       this.items.push(item);
    //       this.items.push({ divider: true, inset: true });
    //     });
    //   });
    fetch("http://localhost:3000/getTransactions")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.warn(data);
        let mapped = data.map(function(hash) {
          return {
            avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
            title: "BTC Transaction",
            subtitle: "https://blockstream.info/testnet/tx/" + hash
          };
        });
        console.warn(mapped);
        mapped.forEach(item => {
          this.items.push(item);
          this.items.push({ divider: true, inset: true });
        });
      });
  }
};
</script>

<style>
.v-card.history {
  margin-top: 50px;
}
</style>
