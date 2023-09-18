<script lang="ts" setup>
import HomeCard from "@/home/views/parts/HomeCard.vue";
defineProps<{
  title: string;
  desc: string;
  imgSrc: string;
}>();
</script>
<template>
  <HomeCard class="card-plug">
    <div class="card-plug__content">
      <h3 class="card-plug__title heading">{{ title }}</h3>
      <p class="card-plug__desc">
        {{ desc }}
      </p>
      <img class="card-plug__img" :src="imgSrc" :alt="title + ' image'" />
      <slot />
    </div>
  </HomeCard>
</template>
<style lang="scss" scoped>
.card-plug {
  display: flex;
  flex-direction: column;
  &:deep(.home-card__content) {
    padding: rem(80);
  }
  &__content {
    margin: auto 0;
    display: flex;
    flex-direction: column;
  }
  &__title {
    text-align: center;
  }
  &__desc {
    width: rem(346);
    text-align: center;
    margin: 0 auto;
    margin-top: rem(16.12);
    color: $color-grey-400;
  }
  &__img {
    display: block;
    margin: 0 auto;
    margin-top: rem(55.88);
    object-fit: contain;
    width: rem(457);
    height: rem(260);
  }
}
</style>
