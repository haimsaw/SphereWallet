<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
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
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { header: "Today" },
        {
          avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
          title: "Bitcoin transaction one",
          subtitle: "$212 - 0.21245 BTC"
        },
        { divider: true, inset: true },
        {
          avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
          title: "Bitcoin transaction one",
          subtitle: "$212 - 0.21245 BTC"
        },
        { divider: true, inset: true },
        {
          avatar: "https://bitcoin.org/img/icons/opengraph.png?1563473161",
          title: "Bitcoin transaction one",
          subtitle: "$212 - 0.21245 BTC"
        }
      ]
    };
  }
};
</script>

<style>
.v-card {
  margin-top: 80px;
}
</style>
