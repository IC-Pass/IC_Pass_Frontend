<script setup lang="ts">
import AppLogo from "@/ui-kit/AppLogo.vue";
</script>
<template>
  <div class="base-layout">
    <div class="base-layout__header">
      <div class="base-layout__logo">
        <AppLogo />
      </div>
      <header>
        <slot name="header" />
      </header>
    </div>
    <div class="base-layout__content">
      <aside>
        <slot name="aside" />
      </aside>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-layout {
  display: flex;
  flex-wrap: wrap;
  padding: rem(30) rem(24) rem(30) 0;
  &__header {
    width: 100%;
    display: flex;
  }
  header {
    padding: rem(26) rem(24) rem(28);
    height: rem(172);
    flex-grow: 1;
  }
  main {
    overflow-y: auto;
    flex-grow: 1;
    height: rem(672);
  }
  &__content {
    display: flex;
    width: 100%;
    padding-bottom: rem(30);
  }
  .base-layout__logo {
    width: rem(350);
    height: rem(172);
    padding: rem(52) rem(40) rem(78);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  aside {
    width: rem(350);
    padding: 0 rem(40);
  }
}
</style>
