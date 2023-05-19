<template>
  <div>
    <h1>Land Holding About View</h1>
    <div v-if="landHolding">
      <p>Legal Entity: {{ landHolding.legalEntity }}</p>
      <p>Mineral Owner Royalty: {{ landHolding.mineralOwnerRoyalty }}</p>
      <p>Net Mineral Acres: {{ landHolding.netMineralAcres }}</p>
      <p>Range: {{ landHolding.range }}</p>
      <p>Section: {{ landHolding.section }}</p>
      <p>Township: {{ landHolding.township }}</p>
      <p>Range: {{ landHolding.range }}</p>
      <p>Title Source: {{ landHolding.titleSource }}</p>
      <p>Owner Id: {{ landHolding.ownerId }}</p>
      <router-link :to="`/owner/${landHolding.ownerId}`">
        <button>View Owner</button>
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
    //const ownerId = router.currentRoute.value.params.ownerId; // Retrieve ownerId from route params
    console.log("land holding ID On About Page:", landHoldingId);
    //console.log("props ownerId On About Page:", props.ownerId);

    onMounted(async () => {
      try {
        let retrievedLandHolding = await landHoldingStore.getLandHoldingById(
          landHoldingId
        );
        landHolding.legalEntity = retrievedLandHolding.legalEntity;
        landHolding.mineralOwnerRoyalty =
          retrievedLandHolding.mineralOwnerRoyalty;
        landHolding.netMineralAcres = retrievedLandHolding.netMineralAcres;
        landHolding.section = retrievedLandHolding.section;
        landHolding.township = retrievedLandHolding.township;
        landHolding.range = retrievedLandHolding.range;
        landHolding.titleSource = retrievedLandHolding.titleSource;
        landHolding.ownerId = retrievedLandHolding.ownerId;
      } catch (error) {
        console.error("Failed to get landholding by ID:", error);
      }
    });

    // const redirectToOwner = () => {
    //   const ownerId = landHolding.ownerId;
    //   router.push(`/owner/${ownerId}`);
    // };
    // const redirectToCreateLandholding = () => {
    //   router.push(`/owners/${ownerId}/create-landholding`);
    // };

    return {
      landHolding,
      //redirectToCreateLandholding,
    };
  },
};
</script>
