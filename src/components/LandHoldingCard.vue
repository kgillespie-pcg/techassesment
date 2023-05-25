<template>
  <div class="card">
    <div class="content">
      <p><strong>Name:</strong> {{ landHolding.name }}</p>
      <p>
        <strong>Net Mineral Acres:</strong> {{ landHolding.netMineralAcres }}
      </p>
      <p>
        <strong>Mineral Owner Royalty:</strong>
        {{ landHolding.mineralOwnerRoyalty }}
      </p>
      <p>
        <strong>Title Source:</strong>
        {{ landHolding.titleSource }}
      </p>
    </div>

    <button @click="redirectToLandHolding">View Details</button>
  </div>
</template>

<script>
export default {
  props: {
    landHolding: {
      //Will be recieving the land holding information as an object, this is what is being passed as props
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
