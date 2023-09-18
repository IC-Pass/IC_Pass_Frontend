<script setup lang="ts">
import AppAllPasswords from "@/common/views/components/AppAllPasswords.vue";
import Onboarding from "@/home/views/Onboarding.vue";
import ProfileDetails from "@/home/views/parts/ProfileDetails.vue";
import InstanceEditor from "@/home/views/parts/InstanceEditor.vue";
import { useHomeStore } from "@/home/domain/homeStore";
import { usePasswordStore } from "@/home/domain/passwordStore";
import Welcome from "@/home/views/Welcome.vue";

const passwordStore = usePasswordStore();

function closeInstanceEditor() {
  homeStore.activeCard = "";
  passwordStore.resetStore();
}
const homeStore = useHomeStore();
</script>
<template>
  <div class="home">
    <Welcome class="home__passwords" v-if="homeStore.isWelcomePass" />
    <AppAllPasswords class="home__passwords" v-else />
    <Onboarding
      class="home__onboarding"
      v-if="homeStore.activeCard === 'onboarding'"
    />
    <ProfileDetails
      class="home__onboarding"
      v-if="homeStore.activeCard === 'profileDetails'"
    />
    <InstanceEditor
      class="home__onboarding"
      @close="closeInstanceEditor"
      v-if="homeStore.activeCard === 'createItem'"
    />
  </div>
</template>
<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  gap: rem(10);
  &__passwords {
    min-width: calc(50% - #{rem(5)});
    flex-grow: 1;
    flex-shrink: 1;
  }
  &__onboarding {
    width: calc(50% - #{rem(5)});
    flex-shrink: 0;
    flex-grow: 1;
  }
}
</style>
