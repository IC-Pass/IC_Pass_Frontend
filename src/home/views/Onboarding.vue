<script lang="ts" setup>
import {computed, ref} from "vue";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
SwiperCore.use([Navigation, Pagination, A11y]);
import onBoarding1Img from "@/assets/images/onboarding/Onboarding 1.png";
import onBoarding2Img from "@/assets/images/onboarding/Onboarding 2.png";
import onBoarding3Img from "@/assets/images/onboarding/Onboarding 3.png";
import onBoarding4Img from "@/assets/images/onboarding/Onboarding 4.png";
import AppButton from "@/ui-kit/AppButton.vue";
import {useHomeStore} from "@/home/domain/homeStore";

const modules = [Pagination];
const swiper = ref();
const slider = computed(() => {
  return swiper?.value?.$el.swiper || null;
});
const slides = [
  {
    title: "Secure your password<br> with blockchain",
    desc: "Icpass is the first password manager that secures the data you store with blockchain.It saves your logins on a decentralized internet computer protocol and gives you complete control over who can access them.",
    img: onBoarding1Img,
  },
  {
    title: "Generate password<br> in seconds",
    desc: "With just one click, you can create a new secure password or fill in any saved passwords with one simple key.",
    img: onBoarding2Img,
  },
  {
    title: "Real-time security<br> monitoring",
    desc: "Detect any compromised, old, weak, or unsecure passwords with our security monitoring. Get alerts if your personal information is at risk.",
    img: onBoarding3Img,
  },
  {
    title: "Secure sharing among<br> users and team",
    desc: "Easily and securely share your passwords with friends, family, or colleagues in your team. Revoke access at any time.",
    img: onBoarding4Img,
  },
];
const pagination = {
  clickable: true,
  el: ".onboarding__pagination",
};
const homeStore = useHomeStore();

function slideNext() {
  slider.value.slideNext();
}
function finishOnboarding() {
  homeStore.activeCard = "";
}
</script>
<template>
  <div class="onboarding">
    <button class="onboarding__skip body-14" @click="finishOnboarding">Skip</button>
    <div class="onboarding__pagination" />
    <Swiper
      ref="swiper"
      :slides-per-view="1"
      :modules="modules"
      :pagination="pagination"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="onboarding-slide">
          <div class="onboarding-slide__img">
            <img :src="slide.img" :alt="'image for ' + slide.title" />
          </div>
          <div class="onboarding-slide__content">
            <h4 class="onboarding-slide__title" v-html="slide.title" />
            <p class="onboarding-slide__desc">{{ slide.desc }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <AppButton
      class="onboarding__btn"
      type="primary"
      @click="slideNext"
      v-if="slider?.activeIndex < slides.length - 1"
    >
      Next
    </AppButton>
    <AppButton
      class="onboarding__btn"
      type="primary"
      @click="finishOnboarding"
      v-else
    >
      Get started
    </AppButton>
  </div>
</template>
<style lang="scss" scoped>
.onboarding {
  background-color: $color-grey-200;
  background: linear-gradient(180deg, #242526 0%, #202021 50.1%);
  border-radius: 16px;
  padding: rem(39) rem(24) rem(24);
  position: relative;
  overflow: hidden;
  &__pagination {
    position: absolute;
    height: rem(8);
    top: rem(390);
    left: rem(24);
  }
  &__btn {
    margin-top: rem(24);
  }
  &__skip {
    position: absolute;
    top: rem(32);
    right: rem(24);
    border: none;
    display: block;
    background: none;
    letter-spacing: -0.5px;
    color: $color-grey-400;
  }
}
.onboarding-slide {
  &__img {
    width: rem(260);
    height: rem(369);
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
    }
  }
  &__title {
    font-weight: 400;
    font-size: rem(28);
    line-height: rem(32);
    margin: rem(16) 0 rem(24);
  }
  &__desc {
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: $color-grey-200;
  }
}
</style>
