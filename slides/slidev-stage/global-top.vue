<script setup lang="ts">
import { ref } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext();
// Hardcode your info here or use a reactive date
const authorName = "YILMAZ Ceyhane | CDA09";
const current = new Date();
const day = current.getDate().toString().padStart(2,'0');
const month = (current.getMonth() + 1).toString().padStart(2,'0');
const year = current.getFullYear();
const date = `${day}/${month}/${year}`;
</script>

<!-- an example footer for pages -->
<template>
  <header
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-sm opacity-80"
  >
    <div class="flex-1 text-left">
      {{ date }}
    </div>
    
    <div class="flex-1 text-center">
      {{ authorName }}
  </div>

    <div class="flex-1 text-right">
      {{ $slidev.nav.currentPage - 1 }} / {{ $slidev.nav.total - 1 }}
    </div>
  </header>
</template>