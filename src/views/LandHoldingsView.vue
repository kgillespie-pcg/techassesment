<template>
  <div>
    <h1>All Land Holdings</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by legal entity or section name"
    />
    <div v-for="landHolding in filteredLandHoldings" :key="landHolding.id">
      <div class="card">
        <p>Land Holding Name: {{ landHolding.name }}</p>
        <p>Section Name: {{ landHolding.sectionName }}</p>
        <p>Owner's Name: {{ landHolding.owner.name }}</p>
        <button @click="goToLandHoldingAboutPage(landHolding.id)">About</button>
        <button @click="goToOwnerAboutPage(landHolding.owner.id)">Owner</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLandHoldingStore } from "../store/landHoldingStore";
import { ref, computed } from "vue";

export default {
  name: "LandHoldingsView",
  setup() {
    const landHoldingStore = useLandHoldingStore();

    const searchQuery = ref("");

    const filteredLandHoldings = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return landHoldingStore.landHoldings.filter(
        (landHolding) =>
          landHolding.legalEntity.toLowerCase().includes(query) ||
          landHolding.sectionName.toLowerCase().includes(query)
      );
    });

    const goToLandHoldingAboutPage = (landHoldingId) => {
      this.$router.push(`/landholdings/${landHoldingId}`);
    };

    const goToOwnerAboutPage = (ownerId) => {
      this.$router.push(`/owners/${ownerId}`);
    };

    return {
      searchQuery,
      filteredLandHoldings,
      goToLandHoldingAboutPage,
      goToOwnerAboutPage,
    };
  },
};
</script>
