<template>
  <DashboardView />
  <div>
    <h1>Owner About View</h1>
    <div v-if="owner">
      <h2>Name: {{ owner.name }}</h2>
      <p>Address: {{ owner.address }}</p>
      <p>Owner Type: {{ owner.ownerType }}</p>
      <p>Entity Type: {{ owner.entityType }}</p>
      <p>Number of Land Holdings: {{ owner.landHoldings.length }}</p>
      <h3>Land Holdings:</h3>
      <div v-if="owner.landHoldings.length > 0">
        <div v-for="landHolding in owner.landHoldings" :key="landHolding._id">
          <p>Legal Entity: {{ landHolding.legalEntity }}</p>
          <p>Mineral Owner Royalty: {{ landHolding.mineralOwnerRoyalty }}</p>
          <p>Net Mineral Acres: {{ landHolding.netMineralAcres }}</p>
          <!-- Add more properties as needed -->
          <router-link :to="`/landholdings/${landHolding._id}`">
            <button>View Land Holding</button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>This owner has no land holdings</p>
      </div>
      <button @click="deleteOwnerAndRedirect">Delete Owner</button>
      <button @click="redirectToCreateLandholding">Create Landholding</button>
      <button @click="redirectToUpdateOwner">Update Owner</button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useOwnerStore } from "@/store/ownerStore";
import { useRouter } from "vue-router";
import { useLandHoldingStore } from "@/store/landHoldingStore";
import DashboardView from "./DashboardView.vue";

export default {
  name: "OwnerAboutView",
  setup() {
    const ownerStore = useOwnerStore();
    const landHoldingStore = useLandHoldingStore();
    const owner = reactive({
      name: null,
      address: null,
      ownerType: null,
      entityType: null,
      landHoldings: [],
    });
    const router = useRouter();
    const ownerId = router.currentRoute.value.params.id;
    console.log("Owner ID On About Page:", ownerId);
    onMounted(async () => {
      try {
        let retrievedOwner = await ownerStore.getOwnerById(ownerId);
        owner.name = retrievedOwner.name;
        owner.address = retrievedOwner.address;
        owner.ownerType = retrievedOwner.ownerType;
        owner.entityType = retrievedOwner.entityType;
        if (retrievedOwner.landHoldings) {
          // Fetch each landholding's data
          const landHoldingPromises = retrievedOwner.landHoldings.map(
            async (landHoldingId) => {
              const landHolding = await landHoldingStore.getLandHoldingById(
                landHoldingId
              );
              return landHolding;
            }
          );
          owner.landHoldings = await Promise.all(landHoldingPromises);
        }
      } catch (error) {
        console.error("Failed to get owner by ID:", error);
      }
    });
    const deleteOwnerAndRedirect = async () => {
      try {
        await ownerStore.deleteOwner(ownerId);
        router.push("/owners");
      } catch (error) {
        console.error("Failed to delete owner:", error);
      }
    };
    const redirectToCreateLandholding = () => {
      router.push(`/owners/${ownerId}/create-landholding`);
    };
    const redirectToUpdateOwner = () => {
      router.push(`/update-owner/${ownerId}`);
    };
    return {
      owner,
      deleteOwnerAndRedirect,
      redirectToCreateLandholding,
      redirectToUpdateOwner,
    };
  },
  components: { DashboardView },
};
</script>
