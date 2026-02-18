<template>
  {{currentDate()}}
</template>
<script>
export default {
  methods: {
    currentDate() {
      const current = new Date();
      const day = current.getDate().toString().padStart(2,'0');
      const month = (current.getMonth() + 1).toString().padStart(2,'0');
      const year = current.getFullYear();
      const date = `${day}/${month}/${year}`;
      return date;
    }
  }
};
</script>