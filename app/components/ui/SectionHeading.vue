<script setup lang="ts">
interface Props {
  label: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <p class="section-heading">
    <span class="section-heading__dash">—</span>
    {{ label }}
    <span class="section-heading__dot">·</span>
    {{ title }}
  </p>
</template>

<style lang="scss" scoped>
//
.section-heading {
  color: var(--section-heading-color, #C5A367);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>