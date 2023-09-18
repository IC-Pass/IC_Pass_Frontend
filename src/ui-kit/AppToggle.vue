<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  label: string;
}>();
</script>
<template>
  <label class="toggle">
    <span v-if="props.label || $slots.label" class="body-16 toggle__label">
      {{ props.label || "" }}
      <slot name="label" />
    </span>
    <input
      type="checkbox"
      :checked="props.modelValue"
      @input="(e) => $emit('update:modelValue', e.target.checked)"
    />
    <span class="toggle__container body-16">
      <span>Off</span>
      <span>On</span>
      <span class="toggle__thumb" />
    </span>
  </label>
</template>
<style lang="scss" scoped>
.toggle {
  position: relative;
  display: flex;
  align-items: center;
  &__label {
    margin-right: auto;
  }
  &__container {
    position: relative;
    padding: rem(3) rem(8);
    display: flex;
    gap: rem(8);
    border-radius: 16px;
    background-color: $color-grey-700;
  }
  input {
    display: none;
  }
  input:checked + &__container &__thumb {
    transform: translateX(calc(-100% - 0.5px));
    background-color: $color-green-base;
  }
  &__thumb {
    position: absolute;
    transition: 0.3s;
    top: rem(3);
    bottom: rem(3);
    right: rem(3);
    width: rem(32);
    border-radius: 32px;
    background-color: $color-grey-600;
  }
}
</style>
