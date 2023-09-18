<script setup lang="ts">
import { ref } from "vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import { useRoute } from "vue-router";
import AppBlockChainBtn from "@/common/views/components/AppBlockChainBtn.vue";
const route = useRoute();

const full = "25rem";

const isDropdown = ref(true);

const links = [
  {
    icon: "home",
    name: "Home",
    route: "Home",
    children: [],
  },
  {
    icon: "openMail",
    name: "Notifications",
    route: "",
    children: [],
  },
  {
    icon: "history",
    name: "History",
    route: "History",
    children: [],
  },
  {
    icon: "members",
    name: "Members",
    route: "Members",
    children: [],
    chips: "Coming soon",
  },
  {
    icon: "team",
    name: "Team",
    route: "Team",
    children: [],
    chips: "Coming soon",
  },
  {
    icon: "settings",
    name: "Settings",
    route: "Settings",
    children: [],
  },
];

function checkRoute(currentRouteName: string): boolean {
  return route.matched.map((item) => item.name).includes(currentRouteName);
}
</script>

<template>
  <div class="navbar">
    <div class="navbar__list">
      <div
        v-for="link in links"
        :key="link.name"
        class="navbar__list-item"
        :class="{
          active: link.route === $route.name,
        }"
      >
        <div class="navbar__link-header">
          <router-link :to="{ name: link.route }" class="navbar__link">
            <AppIcon
              class="navbar__icon"
              size="xxl"
              :name="link.icon"
            />
            <span class="navbar__item">
              {{ link.name }}
            </span>
            <span class="navbar__item-chips" v-if="link.chips">
              {{ link.chips }}
            </span>
          </router-link>
          <button
            class="navbar__chevron"
            :class="{ reverse: !isDropdown }"
            @click="isDropdown = !isDropdown"
            v-if="link.children.length"
          >
            <AppIcon name="chevron-down" size="xs" />
          </button>
        </div>
        <template v-if="link.children.length">
          <Transition>
            <div class="navbar__dropdown" v-if="isDropdown">
              <router-link
                v-for="child in link.children"
                :key="child.name"
                :to="{ name: child.route }"
                class="navbar__dropdown-item"
                :class="{ active: checkRoute(child.route) }"
              >
                {{ child.name }}
              </router-link>
            </div>
          </Transition>
        </template>
      </div>
    </div>
    <div class="navbar__chain-btn">
      <AppBlockChainBtn />
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  height: calc(100vh - #{rem(232)});
  max-height: 100vh;
  transition: width 0.3s ease-out;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  &__logo {
    width: rem(156);
    margin: 0 auto;
    display: block;
  }
  &__list-item {
    position: relative;
    margin-bottom: rem(12);
  }
  &__list-item.active &__link-header {
    background-color: $color-grey-800;
    color: $color-grey-50;
    border-radius: 8px;
  }
  &__list-item.rolled &__link-header {
    width: 4.4rem;
    margin-left: -1rem;
    transition: all 0.3s ease-out;
  }
  &__link-header {
    display: flex;
    align-items: center;
    width: 100%;
    color: $color-grey-200;
  }
  &__list-item.active &__item {
    color: $color-grey-50;
  }
  &__list-item.active &__icon {
    fill: $color-grey-50;
    color: $color-grey-50;
  }
  &__item-chips {
    padding: rem(5) rem(8);
    font-weight: 300;
    font-size: rem(12);
    white-space: nowrap;
    border-radius: 20px;
    background: $color-grey-800;
  }
  &__icon {
    display: block;
    transition: all 0.3s ease-out;
    fill: $color-grey-400;
    color: $color-grey-400;
    &.rolled {
      margin: 0;
      margin-left: 1rem;
      transition: all 0.3s ease-out;
    }
  }
  &__link {
    display: flex;
    align-items: center;
    gap: rem(12);
    padding: rem(6) rem(10);
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-out;
    color: $color-grey-50;
  }
  &__item {
    color: $color-grey-50;
    animation: fade 0.3s ease-out;
    transition: all 0.3s ease-out;
    font-weight: 300;
    font-size: rem(16);
    line-height: rem(22);
  }
  &__chevron {
    margin: 0 0 0 auto;
    display: block;
    height: 100%;
    padding: 0 rem(16);
    color: $color-grey-50;
    transition: all 0.3s ease-out;
    cursor: pointer;
    background: none;
    border: none;
    & > div {
      transition: all 0.3s ease-out;
    }
    &.reverse > div {
      transform: rotate(180deg);
    }
  }
  &__dropdown {
    position: relative;
    padding-left: 6rem;
    &-item {
      display: block;
      margin-top: 1.8rem;
      color: $color-grey-lighter;
      text-decoration: none;
      transition: color 0.3s ease-out;
      animation: fade 0.3s ease-out;
      border-radius: 4px;
      &.active {
        font-weight: 600;
        color: $color-white;
      }
    }
  }
  &__chain-btn {
    margin-top: auto;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
