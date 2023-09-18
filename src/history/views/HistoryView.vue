<script setup lang="ts">
import AppListPass from "@/common/views/components/AppListPass.vue";
import { useHistoryStore } from "@/history/domain/historyStore";
import HomeCard from "@/home/views/parts/HomeCard.vue";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";

const historyStore = useHistoryStore();
</script>
<template>
  <HomeCard class="history" narrow-content>
    <template #header>
      <div class="history__tags">
        <AppChipsItem
          v-for="(tag, index) in historyStore.historyTags"
          :key="index"
          :label="tag.label"
          :count="tag.count"
          :type="tag.count > 0 ? 'grey-50' : 'grey'"
        />
      </div>
    </template>
    <AppListPass :list="historyStore.historyList" />
  </HomeCard>
</template>
<style scoped lang="scss">
.history {
  &__tags {
    display: flex;
    gap: rem(12);
    padding: rem(30);
  }
}
</style>
