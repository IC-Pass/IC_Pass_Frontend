<script lang="ts" setup>
import {onMounted, ref} from "vue";

import HomeCard from "./HomeCard.vue";
import AppButton from "@/ui-kit/AppButton.vue";
import AppInput from "@/ui-kit/AppInput.vue";
import Shield from "@/assets/icons/shield.vue";
import AppSelect from "@/ui-kit/AppSelect.vue";
import AppTemplateSelect from "@/ui-kit/AppTemplateSelect.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import AppTextarea from "@/ui-kit/AppTextarea.vue";
import { usePasswordStore } from "@/home/domain/passwordStore";
import PasswordGenerator from "@/home/views/parts/PasswordGenerator.vue";
import SelectTag from "@/home/views/parts/SelectTag.vue";
import {useHistoryStore} from "@/history/domain/historyStore";

const passwordStore = usePasswordStore();

const isGeneratePassword = ref(false);
const isSelectTag = ref(false);
const isNew = ref(true);
const templateModel = ref({
  value: "",
  label: "",
  imgSrc: "",
});
const tagModel = ref({
  label: "",
  value: "",
});
function setPassword(pass: string) {
  if (passwordStore.password) {
    passwordStore.password.password = pass;
    isGeneratePassword.value = false;
  }
}
function setTag(tag: string) {
  if (passwordStore.password) {
    passwordStore.password.tag = tag;
    isSelectTag.value = false;
  }
}
function createItem() {
  passwordStore.password.template = templateModel;
  passwordStore.createPassword();
}
onMounted(() => {
  if (passwordStore.password) {
    templateModel.value = passwordStore.password.template;
    tagModel.value = passwordStore.password.tag;
    isNew.value = false;
  }
});
</script>
<template>
  <HomeCard class="instance-editor" v-if="passwordStore.password">
    <template #header>
      <div class="instance-editor__close" @click="$emit('close')">
        <AppIcon size="xxl" name="cross-dark" />
      </div>
      <h3 class="instance-editor__title subtitle-12">{{ isNew ? 'Add new Item' : 'Edit item'}}</h3>
    </template>
    <template #default>
      <div class="instance-editor__content" v-show="!isSelectTag">
        <div class="main-card-list">
          <div class="main-card-list__item">
            <AppTemplateSelect v-model="templateModel" />
          </div>
          <div class="main-card-list__item">
            <AppInput
              type="email"
              label="Login or email"
              placeholder="Type here"
              :default="passwordStore.password.usernameEmail"
              @handleInputValue="
                (value) => (passwordStore.password.usernameEmail = value)
              "
            />
          </div>
          <div class="main-card-list__item">
            <AppInput
              type="password"
              label="Create password"
              placeholder="Type here"
              :default="passwordStore.password.password"
              @handleInputValue="(value) => (passwordStore.password.password = value)"
            />
          </div>
          <AppButton
            type="secondary"
            class="instance-editor__generate-btn"
            @click="() => (isGeneratePassword = true)"
          >
            <shield />
            <span>Generate secure password</span>
          </AppButton>
          <div class="main-card-list__item">
            <AppInput
              :default="passwordStore.password.link"
              type="text"
              label="Link"
              placeholder="Type here"
              @handleInputValue="(val) => (passwordStore.password.link = val)"
            />
          </div>
          <div class="main-card-list__item">
            <AppSelect
              label="Tag"
              v-model="passwordStore.password.tag"
              @click="() => (isSelectTag = true)"
            />
          </div>
          <div class="main-card-list__item">
            <AppTextarea
              label="Notes or seed phrase"
              placeholder="Type here"
              @handleInput="(value) => (passwordStore.password.notes = value)"
            />
          </div>
        </div>
      </div>
      <div class="instance-overlay" v-if="isGeneratePassword || isSelectTag">
        <PasswordGenerator
          v-if="isGeneratePassword"
          @handleSave="setPassword"
          @close="() => (isGeneratePassword = false)"
        />
        <SelectTag
          v-model="tagModel"
          v-if="isSelectTag"
          @handleSelect="setTag"
          @close="() => (isSelectTag = false)"
        />
      </div>
    </template>
    <template #footer>
      <AppButton type="primary" @click="createItem">Create Item</AppButton>
    </template>
  </HomeCard>
</template>
<style lang="scss" scoped>
@import "src/assets/styles/base/typography";
.instance-editor {
  align-self: stretch;
  position: relative;
  height: 100%;
  &__title {
    text-align: center;
    padding: rem(30);
  }
  &__generate-btn {
    margin: rem(10) 0 rem(16);
  }
  & &__generate-btn {
    padding: rem(9) rem(12);
  }
  &__tag {
    display: flex;
    align-items: center;
  }
  &__close {
    position: absolute;
    top: rem(22);
    left: rem(24);
    cursor: pointer;
  }
}
.profile {
  &__details {
    margin-top: rem(40);
  }
  &__details-plan {
    @extend .body-16 !optional;
    display: flex;
  }
  &__details-plan-name {
    color: $color-green-light;
  }
  &__details-plan-info {
    margin-left: auto;
  }
}
.avatar {
  display: flex;
  align-items: center;
  &__photo {
    width: rem(96);
    height: rem(96);
    border-radius: 50%;
    border: 1.5px dashed $color-grey-500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: rem(32);
    div {
      background-color: $color-grey-700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__photo-img {
    object-fit: cover;
    object-position: center;
  }
  &__photo &__icon,
  &__photo-img {
    border-radius: 50%;
    width: rem(73.99);
    height: rem(73.99);
  }
  &__upload {
    position: relative;
    display: block;
    border: 1.5px solid $color-grey-500;
    border-radius: 8px;
    flex-grow: 1;
    flex-shrink: 0;
    cursor: pointer;
    transition: 0.3s;
    &:deep(.btn) {
      padding: rem(11);
      line-height: rem(22);
      pointer-events: none;
    }
    input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
      z-index: 1;
      &::file-selector-button {
        cursor: pointer;
      }
    }
    div {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    @include min-desktop() {
      &:hover {
        background-color: rgba($color-grey-500, 0.4);
      }
    }
  }
  &__title {
    margin-bottom: rem(12);
  }
  &__btns {
    display: flex;
    gap: 8px;
  }
  &__remove {
    flex-shrink: 1;
    padding: rem(11) rem(16);
    line-height: rem(22);
  }
  &__ext {
    margin-top: rem(8);
    color: $color-grey-400;
  }
}
.instance-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
}
</style>
