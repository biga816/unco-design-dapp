<template>
  <div class="home">
    <div class="swiper" v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="slide-container">
            <img class="logo" alt="Unco logo" src="../assets/img/logo@4x.png">
            <div class="message">
              <h2>Record the Unco in the world...</h2>
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
                <br>You can record the status of Unco in a distributed network (IPFS) for free,
                and you can also tokenize it as an NFT (ERC721).
              </p>
            </div>
          </div>
        </no-ssr>
      </div>
    </div>

    <div class="slide-buttons">
      <NewUncoDialog btnColor="black"></NewUncoDialog>
      <v-btn outline color="black" fab to="/history">
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        outline
        color="black"
        v-on:click="slideTo()"
        v-bind:class="{reverse: activeIndex !== 0}"
        fab
      >
        <template v-if="activeIndex === 0">?</template>
        <template v-else>
          <v-icon>close</v-icon>
        </template>
      </v-btn>
    </div>

    <no-ssr>
      <!-- <PtsCanvas v-if="animated" class="pts" type="line"/> -->
      <PtsCanvas class="pts" type="line"/>
    </no-ssr>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped src="./index.scss"></style>
