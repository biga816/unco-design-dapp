<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn outline small color="green darken-1" :loading="loading" @click.stop="dialog = true">
        <v-icon>publish</v-icon>
        <span>Tokenize</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Confirmation</v-card-title>
      <v-card-text>Are you sure you want to tokenize your Unco data?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
        <v-btn color="info" flat="flat" @click="mintUnco()">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" src="./TokenizeDialog.ts"></script>