<template>
  <div>
    <h1>Land Holding About View</h1>
    <div v-if="landHolding">
      <p>Name: {{ landHolding.name }}</p>
      <p>Section Name: {{ landHolding.sectionName }}</p>
      <p>Legal Entity: {{ landHolding.legalEntity }}</p>
      <p>Mineral Owner Royalty: {{ landHolding.mineralOwnerRoyalty }}</p>
      <p>Net Mineral Acres: {{ landHolding.netMineralAcres }}</p>
      <p>Range: {{ landHolding.range }}</p>
      <p>Section: {{ landHolding.section }}</p>
      <p>Township: {{ landHolding.township }}</p>
      <p>Range: {{ landHolding.range }}</p>
      <p>Title Source: {{ landHolding.titleSource }}</p>
      <p>Id: {{ landHolding._id }}</p>
      <p>Owner Id: {{ landHolding.ownerId }}</p>
      <button @click="deleteLandHolding">Delete Land Holding</button>
      <router-link :to="`/owner/${landHolding.ownerId}`">
        <button>View Owner</button>
      </router-link>
      <router-link :to="`/update-landholding/${landHolding._id}`">
        <button>Update Land Holding</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { useRouter } from "vue-router";

export default {
  name: "LandHoldingAboutView",

  setup() {
    const landHoldingStore = useLandHoldingStore();
    const landHolding = reactive({
      name: null,
      sectionName: null,
      legalEntity: null,
      mineralOwnerRoyalty: null,
      netMineralAcres: null,
      range: null,
      section: null,
      titleSource: null,
      township: null,
      ownerId: null,
    });
    const router = useRouter();
    const landHoldingId = router.currentRoute.value.params.id;

    onMounted(async () => {
      try {
        let retrievedLandHolding = await landHoldingStore.getLandHoldingById(
          landHoldingId
        );
        landHolding.name = retrievedLandHolding.name;
        landHolding.sectionName = retrievedLandHolding.sectionName;
        landHolding.legalEntity = retrievedLandHolding.legalEntity;
        landHolding.mineralOwnerRoyalty =
          retrievedLandHolding.mineralOwnerRoyalty;
        landHolding.netMineralAcres = retrievedLandHolding.netMineralAcres;
        landHolding.section = retrievedLandHolding.section;
        landHolding.township = retrievedLandHolding.township;
        landHolding.range = retrievedLandHolding.range;
        landHolding.titleSource = retrievedLandHolding.titleSource;
        landHolding.ownerId = retrievedLandHolding.ownerId;
        landHolding._id = retrievedLandHolding._id;
      } catch (error) {
        console.error("Failed to get landholding by ID:", error);
      }
    });

    const deleteLandHolding = async () => {
      try {
        await landHoldingStore.deleteLandHolding(
          landHoldingId,
          landHolding.ownerId
        );
        router.push(`/owner/${landHolding.ownerId}`);
      } catch (error) {
        console.error("Failed to delete landholding:", error);
      }
    };

    return {
      landHolding,
      deleteLandHolding,
    };
  },
};
</script>
