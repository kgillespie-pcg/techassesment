<template>
  <div class="card">
    <p><strong>Name:</strong> {{ owner.name }}</p>
    <p><strong>Entity Type:</strong> {{ owner.entityType }}</p>
    <p><strong>Address:</strong> {{ owner.address }}</p>
    <p><strong>Owner Type:</strong> {{ owner.ownerType }}</p>
    <p><strong>Owner id:</strong> {{ owner._id }}</p>
    <button @click="redirectToOwner">View Details</button>
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
  methods: {
    redirectToOwner() {
      // Access the owner ID and navigate to the corresponding route
      const ownerId = this.owner._id;
      this.$router.push(`/owner/${ownerId}`);
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
