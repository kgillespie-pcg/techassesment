<template>
  <div class="card">
    <p><strong>Legal Entity:</strong> {{ landHolding.legalEntity }}</p>
  </div>
</template>

<script>
export default {
  props: {
    landHolding: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  color: pink;
}
</style>
