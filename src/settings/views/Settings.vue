<script lang="ts" setup>
import HomeCard from "@/home/views/parts/HomeCard.vue";
import { useProfileStore } from "@/common/domain/stores/profileStore";
import { ref } from "vue";
import AppToggle from "@/ui-kit/AppToggle.vue";

const profileStore = useProfileStore();
const isEmailNotification = ref(false);
</script>
<template>
  <div class="settings">
    <HomeCard class="settings__config config">
      <template #header>
        <div class="config__header">
          <h1 class="heading config__title">{{ profileStore.profile.name }}</h1>
          <p class="subtitle-10 config__subtitle">
            use pass since {{ profileStore.profile.createdDate }}
          </p>
        </div>
      </template>
      <div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="Email Notification"
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="System notifications"
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="Show my wallet number"
            class="generator-area__toggle"
          />
        </div>
      </div>
    </HomeCard>
    <HomeCard class="settings__config config">
      <template #header>
        <h1 class="heading config__title">{{ profileStore.profile.name }}</h1>
        <p class="subtitle-10 config__subtitle">
          use pass since {{ profileStore.profile.createdDate }}
        </p>
      </template>
    </HomeCard>
  </div>
</template>
<style lang="scss" scoped>
.settings {
  width: 100%;
  display: flex;
  gap: rem(10);
  &__config {
    width: 50%;
  }
}
.config {
  &__header {
    padding: rem(24);
  }
  &__title {
    text-align: center;
  }
  &__subtitle {
    margin-top: rem(12);
    text-align: center;
    color: $color-grey-200;
  }
}
</style>
