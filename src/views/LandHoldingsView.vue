<template>
  <DashboardView />
  <div>
    <h2>Viewing All Land Holdings</h2>
    <div>
      <div id="card-container">
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
import DashboardView from "./DashboardView.vue";

export default {
  name: "LandHoldingsView",
  components: {
    LandHoldingCard,
    DashboardView,
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
