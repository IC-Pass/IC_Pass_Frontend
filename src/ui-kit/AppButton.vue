<script setup lang="ts">
import { computed } from "vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
const emit = defineEmits(["click"]);
type types =
  | "primary"
  | "secondary"
  | "danger"
  | "white"
  | "transparent"
  | "outline";
const props = defineProps<{
  type?: types;
  onHover?: types;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
}>();
const btnType = computed<string>(() => props.type || "");
</script>
<template>
  <button
    class="btn"
    :class="{ [btnType]: btnType, ['on-hover-' + onHover]: onHover }"
    @click="emit('click')"
    :disabled="disabled"
  >
    <AppIcon size="lg" :name="props.iconLeft" v-if="props.iconLeft" />
    <slot></slot>
    <AppIcon size="lg" :name="props.iconRight" v-if="props.iconRight" />
  </button>
</template>

<style scoped lang="scss">
.btn {
  &,
  &:link {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: rem(15) rem(28);
    gap: 4px;
    color: $color-grey-50;
    border-radius: 8px;
    font-size: rem(16);
    font-weight: 300;
    line-height: rem(22);
    font-family: inherit;
    background-color: transparent;
    border: 1px solid $color-grey-50;
    cursor: pointer;
    transition: all 0.3s;
    max-height: rem(52);
  }
  &:focus {
    outline: none;
  }
  &.primary {
    background-color: $color-grey-700;
    border: none;
    @include min-desktop() {
      &:hover {
        background-color: lighten($color-grey-700, 5);
      }
    }
  }
  &.on-hover {
    @include min-desktop() {
      &-danger {
        &:hover {
          background-color: $color-red-base;
          border-color: $color-red-base;
        }
      }
    }
  }
  &.danger {
    background-color: $color-red-base;
    border: none;
    @include min-desktop() {
      &:hover {
        background-color: lighten($color-red-base, 5);
      }
    }
  }
  &.white {
    background-color: #fff;
    border: none;
    color: $color-grey-800;
    @include min-desktop() {
      &:hover {
        background-color: darken(#fff, 20);
      }
    }
  }
  &.secondary {
    background-color: $color-green-base;
    border: 1px solid transparent;
    color: $color-grey-800;
    @include min-desktop() {
      &:hover {
        background-color: $color-green-light;
      }
    }
  }
  &.outline {
    border: 1px solid $color-grey-50;
  }
  &.transparent {
    border: none;
  }
  &:disabled,
  &[disabled="disabled"] {
    background-color: transparent !important;
    cursor: auto;
    border: 1.5px solid $color-grey-700;
    color: $color-grey-50;
    opacity: 0.6;
  }
}
</style>
