<template>
  <div class="card">
    <p>{{ owner.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  /* Add your card styles here */
}
</style>
