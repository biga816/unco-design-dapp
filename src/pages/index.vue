<template>
  <div class="home">
    <!-- <swiper class="swiper" :options="swiperOption" ref="mySwiper"> -->
    <div class="swiper" v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="slide-container">
            <img class="logo" alt="Unco logo" src="../assets/img/logo@4x.png">
            <div class="message">
              <h2>Record the Unco designed in the world...</h2>
              <p class="authers">
                produced by
                <a
                  href="https://twitter.com/biga816"
                  target="_blank"
                  rel="biga816"
                >@biga816</a>,
                <a href="https://twitter.com/atsukita" target="_blank" rel="noopener">@atsukita</a>.
              </p>
            </div>
          </div>
        </div>

        <no-ssr>
          <div class="swiper-slide">
            <div class="about slide-container">
              <h1>What is Unco?</h1>
              <img class="stamp" alt="Unco stamp" src="../assets/img/stamp@4x.png">
              <p class="description">
                Unco, which mean the solid or semisolid remains of the food
                that could not be digested in the small intestine,
                are called feces (or poo) in english.
                <br>Unco in Japanese is called with various names such as Unko and Unchi.
                <br>We redesign the Unco and send it to the world as a new concept.
              </p>
            </div>
          </div>
        </no-ssr>
      </div>

      <!-- <div class="swiper-pagination"></div> -->
    </div>

    <div class="slide-buttons">
      <!-- <v-btn outline color="black" fab>
        <v-icon>add</v-icon>
      </v-btn>-->
      <!-- dialog -->
      <NewUncoDialog v-on:onSave="save($event)"></NewUncoDialog>
      <v-btn outline color="black" fab>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        outline
        color="black"
        v-on:click="slideTo()"
        v-bind:class="{reverse: activeIndex !== 0}"
        fab
      >
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </div>

    <no-ssr>
      <PtsCanvas class="pts" type="line"/>
    </no-ssr>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped src="./index.scss"></style>
