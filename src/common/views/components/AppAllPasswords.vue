<script lang="ts" setup>

import { ref } from "vue";
import { useHistoryStore } from "@/history/domain/historyStore";
import AppListPass from "@/common/views/components/AppListPass.vue";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";
import AppButton from "@/ui-kit/AppButton.vue";
import { useHomeStore } from "@/home/domain/homeStore";
import {usePasswordStore} from "@/home/domain/passwordStore";

const historyStore = useHistoryStore();
const homeStore = useHomeStore();
const passwordStore = usePasswordStore();
const chips = [
  {
    icon: "social",
    title: "Social network",
    count: 0,
  },
  {
    icon: "banking",
    title: "Banking",
    count: 2,
  },
  {
    icon: "eCommerce",
    title: "E-commerce",
    count: 0,
  },
  {
    icon: "services",
    title: "Services",
    count: 0,
  },
  {
    icon: "education",
    title: "Education",
    count: 0,
  },
  {
    icon: "otherPassCategory",
    title: "Other",
    count: 0,
  },
];
const isAllChips = ref(false);
function addPassword() {
  homeStore.activeCard = "createItem";
}
function setPasswordToEdit(item) {
  homeStore.activeCard = "createItem";
  passwordStore.password = item;
}
</script>
<template>
  <div class="passwords">
    <div class="passwords__header">
      <AppChipsItem
        v-for="(chipsItem, index) in chips"
        :key="chipsItem.title"
        :label="chipsItem.title"
        :icon="chipsItem.icon"
        :count="chipsItem.count"
        v-show="index < 3 || isAllChips"
        class="passwords__header-chips"
      />
      <AppChipsItem
        :label="'+' + (chips.length - 3)"
        v-show="!isAllChips"
        @click="isAllChips = true"
        class="passwords__header-chips"
      />
    </div>
    <div class="passwords__content">
      <AppListPass
        compressed
        :list="historyStore.historyList"
        @edit="(item) => setPasswordToEdit(item)"
      />
    </div>
    <div class="passwords__footer">
      <AppButton icon-left="plus" type="primary" @click="addPassword">
        <span>Add Password</span>
      </AppButton>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.passwords {
  background: linear-gradient(180deg, #242526 0%, #202021 50.1%);
  border-radius: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    padding: rem(24);
    border-bottom: 1px solid $color-grey-700;
    display: flex;
    flex-wrap: wrap;
    gap: rem(6);
  }
  &__header-chips {
    cursor: pointer;
  }
  &__content {
    padding: rem(10) rem(8);
  }
  &__heading {
    text-align: center;
  }
  &__subtitle {
    text-align: center;
    letter-spacing: -0.5px;
    max-width: rem(367);
    margin: rem(16) auto rem(28);
    color: $color-grey-400;
  }
  &__footer {
    margin-top: auto;
    border-top: 1px solid $color-grey-700;
    padding: rem(24);
  }
}
</style>
