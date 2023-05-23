<template>
  <div class="card">
    <p><strong>Name:</strong> {{ landHolding.name }}</p>
    <p><strong>Net Mineral Acres:</strong> {{ landHolding.netMineralAcres }}</p>
    <p>
      <strong>Mineral Owner Royalty:</strong>
      {{ landHolding.mineralOwnerRoyalty }}
    </p>
    <p>
      <strong>Title Source:</strong>
      {{ landHolding.titleSource }}
    </p>
    <button @click="redirectToLandHolding">View Details</button>
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
  methods: {
    redirectToLandHolding() {
      // Access the owner ID and navigate to the corresponding route
      const landHoldingId = this.landHolding._id;
      this.$router.push(`/landholdings/${landHoldingId}`);
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
