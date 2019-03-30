<template>
  <div>
    <h1 class="page-title">Unco Goods</h1>

    <div class="swiper" v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <!-- item slide -->
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in items" :key="item.productId">
          <div class="slide-container">
            <div
              class="suzuri-widget-product"
              :data-suzuri-product-id="item.productId"
              :data-suzuri-item-variant-id="item.itemVariantId"
            >
              <a :href="item.url" target="_blank">
                <img class="suzuri-image" :src="item.image" width="323" height="323">
              </a>
            </div>
            <h2 class="price">¥{{ item.price }}</h2>
            <v-btn color="dark" :href="item.url" target="_blank">Buy</v-btn>
          </div>
        </div>
      </div>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>

    <no-ssr>
      <PtsCanvas class="pts" type="line"/>
    </no-ssr>
  </div>
</template>

<script lang="ts" src="./Goods.ts"></script>
<style lang="scss" scoped src="./Goods.scss"></style>