<template>
  <div>
    <div class="swiper" v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <div class="swiper-wrapper">
        <template v-if="$store.state.history.ipfsDataList.length > 0">
          <div
            class="swiper-slide"
            v-for="ipfsData in $store.state.history.ipfsDataList"
            :key="ipfsData.id"
          >
            <v-card class="card-container">
              <!-- chart -->
              <div class="chart">
                <RadarChart
                  :chartData="[ipfsData.data.sharpness, ipfsData.data.volume, ipfsData.data.smell]"
                ></RadarChart>
              </div>

              <!-- info -->
              <v-card-title primary-title>
                <div>
                  <div class="headline">No. {{ipfsData.data.id}}</div>
                  <span>Created at {{ipfsData.data.timestamp | unixtimeToDate('YYYY/MM/DD hh:mm')}}</span>
                  <div class="ipfs-hash">{{ipfsData.hash}}</div>
                </div>
              </v-card-title>
            </v-card>
          </div>
        </template>
        <template v-else>
          <v-card class="no-data-container">
            <div>
              <h1>No Unco fond.</h1>
              <p>Let's record the state of Unco today in a distributed network (IPFS) for free.</p>
              <NewUncoDialog btnColor="white"></NewUncoDialog>
            </div>
          </v-card>
        </template>
      </div>
    </div>

    <div class="slide-buttons">
      <NewUncoDialog btnColor="white"></NewUncoDialog>
      <v-btn outline color="white" fab to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn outline color="white" v-on:click="slideTo()" v-bind:class="{reverse: isLastSlide}" fab>
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./History.ts"></script>
<style lang="scss" scoped src="./History.scss"></style>