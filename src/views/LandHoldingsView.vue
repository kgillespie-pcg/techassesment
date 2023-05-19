<template>
  <div>
    <h1>All Land holdings</h1>
    <div>
      <div id="cards-container">
        <LandHoldingCard
          v-for="landHolding in filteredLandHoldings"
          :key="landHolding.id"
          :landHolding="landHolding"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useLandHoldingStore } from "../store/landHoldingStore";
import { ref, onMounted } from "vue";
import LandHoldingCard from "./../components/LandHoldingCard.vue";

export default {
  name: "LandHoldingsView",
  components: {
    LandHoldingCard,
  },

  setup() {
    const landHoldingStore = useLandHoldingStore();
    const searchQuery = ref("");

    onMounted(async () => {
      let allLandHoldings = await landHoldingStore.getAllLandHoldings();
      filteredLandHoldings.value = allLandHoldings;
    });

    const filteredLandHoldings = ref([]);

    return {
      searchQuery,
      filteredLandHoldings,
    };
  },
};
</script>

<style scoped>
p {
  color: orange;
}
</style>
