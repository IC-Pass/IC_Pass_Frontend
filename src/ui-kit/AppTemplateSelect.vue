<script lang="ts" setup>
import AppIcon from "@/ui-kit/AppIcon.vue";
import facebook from "@/assets/images/socialMedia/Facebook.jpg";
import flick from "@/assets/images/socialMedia/Flickr.jpg";
import linkedin from "@/assets/images/socialMedia/Linkedin.jpg";
import slack from "@/assets/images/socialMedia/Slack.jpg";
import twitter from "@/assets/images/socialMedia/Twitter.jpg";
import zoom from "@/assets/images/socialMedia/Zoom.jpg";
import AppInput from "@/ui-kit/AppInput.vue";
import { ref } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue?: {
    value: string;
    label: string;
    imgSrc: string;
  };
}>();
const options = [
  {
    value: "facebook",
    label: "Facebook",
    imgSrc: facebook,
  },
  {
    value: "flick",
    label: "Flick",
    imgSrc: flick,
  },
  {
    value: "linkedin",
    label: "Linkedin",
    imgSrc: linkedin,
  },
  {
    value: "slack",
    label: "Slack",
    imgSrc: slack,
  },
  {
    value: "twitter",
    label: "Twitter",
    imgSrc: twitter,
  },
  {
    value: "zoom",
    label: "Zoom",
    imgSrc: zoom,
  },
];
const isOpen = ref(false);
</script>
<template>
  <div class="template-select" :class="{ opened: isOpen }">
    <div class="template-select__header">
      <div class="template-select__img">
        <img
          v-if="props.modelValue.imgSrc?.length"
          :src="props.modelValue.imgSrc"
          alt=""
        />
        <div v-else><AppIcon name="image" class="template-select__icon" /></div>
      </div>
      <div class="template-select__input">
        <AppInput
          label="Choose template"
          placeholder="Type here"
          :default="props.modelValue.label"
          @focus="() => (isOpen = true)"
          @blur="() => (isOpen = false)"
        />
      </div>
    </div>
    <div class="template-select__options">
      <div
        class="template-select__option"
        v-for="(option, index) in options"
        @click="emit('update:modelValue', option)"
        :key="index"
      >
        <div class="template-select__option-img">
          <img :src="option.imgSrc" alt="" />
        </div>
        <p class="template-select__option-label">{{ option.label }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.template-select {
  position: relative;
  &__header {
    display: flex;
    align-items: center;
  }
  &__img {
    width: rem(42);
    height: rem(42);
    border-radius: 50%;
    overflow: hidden;
    border: 1.5px dashed $color-grey-500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: rem(16);
    img {
      width: 100%;
    }
    div {
      background-color: $color-grey-700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__img &__icon {
    border-radius: 50%;
    width: rem(32);
    height: rem(32);
  }
  &__options {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    padding: rem(8);
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: $color-grey-700;
    border-radius: 0 0 16px 16px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
  }
  &__option {
    display: flex;
    align-items: center;
    padding: rem(8) rem(16);
    border-radius: 8px;
    transition: 0.2s;
    &:hover {
      background-color: $color-grey-500;
    }
  }
  &__option-img {
    width: rem(36);
    height: rem(36);
    border-radius: 50%;
    overflow: hidden;
    margin-right: rem(20);
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  &.opened &__options {
    opacity: 1;
    visibility: visible;
  }
}
</style>
