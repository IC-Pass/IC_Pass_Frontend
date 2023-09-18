<script setup lang="ts">
import sprite from "@/assets/icons/sprite.svg";

const props = defineProps({
  name: {
    type: String,
    default: "diamond",
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  size: {
    type: String,
    default: "sm",
    validator: (value: string) => {
      return ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"].indexOf(value) >= 0;
    },
  },
});
</script>
<template>
  <div class="icon" :class="{ [props.size]: props.size, disabled: disabled }">
    <svg>
      <use :href="`${sprite}#${props.name}`" />
    </svg>
  </div>
</template>
<style lang="scss" scoped>
$sizes: (
  "xxs": 8,
  "xs": 12,
  "sm": 16,
  "md": 20,
  "lg": 24,
  "xl": 28,
  "xxl": 32,
);
.icon {
  display: inline-block;
  flex-shrink: 0;
  @each $name, $size in $sizes {
    &.#{$name} {
      width: #{$size / 16}rem;
      height: #{$size / 16}rem;
    }
  }
  svg {
    fill: currentColor;
    display: block;
    width: 100%;
    height: 100%;
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
