<template>
  <div>
    <h1>Update Land Holding</h1>
    <form @submit.prevent="updateLandHolding">
      <div>
        <label for="legalEntity">Legal Entity:</label>
        <input
          type="text"
          id="legalEntity"
          v-model="updatedLandHolding.legalEntity"
          required
        />
      </div>
      <div>
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty:</label>
        <input
          type="text"
          id="mineralOwnerRoyalty"
          v-model="updatedLandHolding.mineralOwnerRoyalty"
          required
        />
      </div>
      <div>
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input
          type="text"
          id="netMineralAcres"
          v-model="updatedLandHolding.netMineralAcres"
          required
        />
      </div>
      <div>
        <label for="range">Range:</label>
        <input
          type="text"
          id="range"
          v-model="updatedLandHolding.range"
          required
        />
      </div>
      <div>
        <label for="section">Section:</label>
        <input
          type="text"
          id="section"
          v-model="updatedLandHolding.section"
          required
        />
      </div>
      <div>
        <label for="township">Township:</label>
        <input
          type="text"
          id="township"
          v-model="updatedLandHolding.township"
          required
        />
      </div>
      <div>
        <label for="titleSource">Title Source:</label>
        <input
          type="text"
          id="titleSource"
          v-model="updatedLandHolding.titleSource"
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { useRouter } from "vue-router";

export default {
  name: "UpdateLandHoldingView",
  setup() {
    const landHoldingStore = useLandHoldingStore();
    const router = useRouter();
    const landHoldingId = router.currentRoute.value.params.id;

    const updatedLandHolding = reactive({
      legalEntity: null,
      mineralOwnerRoyalty: null,
      netMineralAcres: null,
      range: null,
      section: null,
      township: null,
      titleSource: null,
    });

    onMounted(async () => {
      try {
        let retrievedLandHolding = await landHoldingStore.getLandHoldingById(
          landHoldingId
        );
        updatedLandHolding.legalEntity = retrievedLandHolding.legalEntity;
        updatedLandHolding.mineralOwnerRoyalty =
          retrievedLandHolding.mineralOwnerRoyalty;
        updatedLandHolding.netMineralAcres =
          retrievedLandHolding.netMineralAcres;
        updatedLandHolding.range = retrievedLandHolding.range;
        updatedLandHolding.section = retrievedLandHolding.section;
        updatedLandHolding.township = retrievedLandHolding.township;
        updatedLandHolding.titleSource = retrievedLandHolding.titleSource;
        updatedLandHolding._id = retrievedLandHolding._id;
      } catch (error) {
        console.error("Failed to get landholding by ID:", error);
      }
    });

    const updateLandHolding = async () => {
      try {
        await landHoldingStore.updateLandHolding(
          landHoldingId,
          updatedLandHolding
        );
        router.push(`/landholdings/${updatedLandHolding._id}`);
      } catch (error) {
        console.error("Failed to update landholding:", error);
      }
    };
    return {
      updatedLandHolding,
      updateLandHolding,
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
