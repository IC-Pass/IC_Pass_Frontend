<script lang="ts" setup>
import type { PassListItem } from "@/common/domain/PassListItem";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";
import AppPassStrength from "@/ui-kit/AppPassStrength.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";

defineProps<{
  list: PassListItem[];
  compressed?: boolean;
}>();
</script>
<template>
  <table class="pass-list" cellpadding="0" cellspacing="0">
    <tbody>
      <tr
        v-for="(item, index) in list"
        :key="index"
        class="pass-list__item pass-item"
      >
        <td>
          <div class="pass-item__cell">
            <div class="pass-item__icon">
              <img :src="item.template.imgSrc" :alt="item.template.label" />
            </div>
            <div>
              <p class="body-16">{{ item.template.label }}</p>
              <p class="pass-item__email body-12">{{ item.email }}</p>
            </div>
          </div>
        </td>
        <td v-if="!compressed">
          <div class="pass-item__cell">
            <p class="pass-item__link body-16">
              {{ item.link }}
            </p>
          </div>
        </td>
        <td v-if="!compressed">
          <div class="pass-item__cell">
            <AppChipsItem
              size="sm"
              :label="item.tag.label"
              :icon="item.tag.icon"
            />
          </div>
        </td>
        <td v-if="!compressed">
          <div class="pass-item__cell">
            <AppPassStrength password="link" />
          </div>
        </td>
        <td>
          <div class="d-flex items-center justify-end">
            <div class="pass-item__cell">
              <AppIcon
                class="pass-item__action"
                name="info-circle"
                size="xxl"
              />
              <AppIcon class="pass-item__action" name="copy" size="xxl" />
              <AppIcon
                class="pass-item__action"
                name="edit"
                size="xxl"
                @click="$emit('edit', item)"
              />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
.pass-list {
  width: 100%;
  border-collapse: collapse;
}
.pass-item {
  flex-wrap: wrap;
  overflow: hidden;
  @include min-desktop() {
    &:hover td {
      background-color: $color-grey-700;
    }
  }
  &__cell {
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: rem(14) 0;
  }
  td {
    vertical-align: middle;
    height: 100%;
    &:first-child {
      border-radius: 8px 0 0 8px;
      padding-left: rem(16);
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
      padding-right: rem(16);
    }
  }
  &__icon {
    width: rem(36);
    height: rem(36);
    border-radius: 50%;
    overflow: hidden;
    margin-right: rem(16);
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-position: center;
    }
  }
  &__email {
    color: $color-grey-400;
  }
  &__action {
    cursor: pointer;
  }
}
</style>
