<script setup lang="ts">
import { ref } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()
</script>

<!-- an example footer for pages -->
<template>
  <footer
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="absolute bottom-0 left-0 right-0 p-2 flex flex-justify-end"
  >
    {{ $slidev.nav.currentPage - 1 }} / {{ $slidev.nav.total - 1 }}
  </footer>
</template>