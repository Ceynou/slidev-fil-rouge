<script setup lang="ts">
const props = defineProps<{
  url: string
}>();

const unscaledSize = 'calc(100% * var(--slidev-slide-scale))';
const unscaledTransform = 'scale(calc(1 / var(--slidev-slide-scale)))';
</script>

<template>
  <div class="h-full w-full">
    <div relative :style="{ width: unscaledSize, height: unscaledSize }">
      <iframe
        id="frame" class="w-full h-full"
        :src="url"
        :style="{ transform: unscaledTransform, transformOrigin: 'top left' }"
      />
    </div>
  </div>
</template>