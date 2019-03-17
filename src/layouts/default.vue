<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list subheader>
        <v-subheader>Pages</v-subheader>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Links</v-subheader>
        <v-list-tile v-for="(item, i) in links" :key="i" :href="item.to" target="_blank">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-spacer/>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>-->
      <v-toolbar-title>{{accounts[0] || 'No wallet address'}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid ma-0 pa-0>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; 2019 Akihiro Tanaka</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts" src="./default.ts"></script>
<style lang="scss" scoped src="./default.scss"></style>