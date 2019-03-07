<template>
  <!-- dialog -->
  <v-dialog v-model="dialog" scrollable persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <!-- <slot v-on="on"></slot> -->
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn outline color="black" fab v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">Record Today`s Unco</div>
          <span>Let's record the state of Unco today in a distributed network (IPFS). You do not need to pay fees except in the case of registering as NFT (ERC721).</span>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md pa-0>
          <v-layout wrap class="unco-status">
            <!-- date -->
            <v-flex xs6 sm6 md6>
              <v-dialog
                ref="dateDialog"
                v-model="dateDialog"
                :return-value.sync="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateDialog = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>

            <!-- time -->
            <v-flex xs6 sm6 md6>
              <v-dialog
                ref="timeDialog"
                v-model="timeDialog"
                :return-value.sync="time"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="Time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="timeDialog" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timeDialog = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>

            <!-- Sound -->
            <v-flex xs12>
              <v-slider
                label="Sound"
                v-model="sound"
                :tick-labels="soundLabels"
                :max="4"
                thumb-label="always"
                step="1"
                ticks="always"
                tick-size="1"
              ></v-slider>
            </v-flex>

            <!-- Sharpness -->
            <v-flex xs12>
              <v-slider
                label="Sharpness"
                v-model="sharpness"
                :tick-labels="sharpnessLabels"
                :max="4"
                thumb-label="always"
                step="1"
                ticks="always"
                tick-size="1"
              ></v-slider>
            </v-flex>

            <!-- Smell -->
            <v-flex xs12>
              <v-slider
                label="Smell"
                v-model="smell"
                :tick-labels="smellLabels"
                :max="4"
                thumb-label="always"
                step="1"
                ticks="always"
                tick-size="1"
              ></v-slider>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="onSave()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" src="./NewUncoDialog.ts"></script>
<style lang="scss" src="./NewUncoDialog.scss"></style>