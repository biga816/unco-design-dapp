<template>
  <v-app dark>
    <!-- menu -->
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list subheader>
        <v-subheader>Pages</v-subheader>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          active-class="info--text"
        >
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

    <!-- header -->
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-spacer/>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>-->
      <v-toolbar-title>{{accounts[0] || 'No wallet address'}}</v-toolbar-title>
    </v-toolbar>

    <!-- main content -->
    <v-content>
      <div class="network-info" :class="networkName">TEST NETWORK</div>
      <v-container fluid ma-0 pa-0>
        <nuxt/>
      </v-container>
    </v-content>

    <!-- footer -->
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; 2019 Akihiro Tanaka</div>
    </v-footer>

    <!-- spinner -->
    <v-dialog v-model="spinner" persistent width="240">
      <v-card color="info" dark>
        <v-card-text>
          {{ caution }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      :top="true"
      :right="true"
      :timeout="3000"
      color="info"
    >{{ message }}</v-snackbar>
  </v-app>
</template>

<script lang="ts" src="./default.ts"></script>
<style lang="scss" scoped src="./default.scss"></style>