<script setup lang="ts">
import { ref } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()
</script>

<!-- an example footer for pages -->
<template>
  <header
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="absolute top-0 left-100 right-0 p-2"
  >
    YILMAZ Ceyhane
  </header>
</template>

// TODO fix that damn iframeB error