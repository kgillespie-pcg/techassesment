<template>
  <DashboardView />
  <div>
    <div v-if="owner">
      <h2><strong> Viewing Owner: </strong>{{ owner.name }}</h2>
      <div class="button-div">
        <button @click="deleteOwnerAndRedirect">Delete Owner</button>
        <button @click="redirectToCreateLandholding">Add Landholding</button>
        <button @click="redirectToUpdateOwner">Update Owner</button>
      </div>
      <div class="about-card">
        <p><span>Name: </span> {{ owner.name }}</p>
        <p><span>Address: </span> {{ owner.address }}</p>
        <p><span>Owner Type: </span> {{ owner.ownerType }}</p>
        <p><span>Entity Type: </span> {{ owner.entityType }}</p>
        <p>
          <span>Number of Land Holdings: </span> {{ owner.landHoldings.length }}
        </p>
      </div>

      <h2>Land Holdings:</h2>
      <div class="card-container" v-if="owner.landHoldings.length > 0">
        <div
          class="card"
          v-for="landHolding in owner.landHoldings"
          :key="landHolding._id"
        >
          <div class="content">
            <p><strong>Name: </strong>{{ landHolding.name }}</p>
            <p>
              <strong>Mineral Owner Royalty: </strong
              >{{ landHolding.mineralOwnerRoyalty }}
            </p>
            <p>
              <strong>Net Mineral Acres: </strong
              >{{ landHolding.netMineralAcres }}
            </p>
            <p><strong>Title Source: </strong>{{ landHolding.titleSource }}</p>
            <!-- <p>Mineral Owner Royalty: {{ landHolding.mineralOwnerRoyalty }}</p>
            <p>Net Mineral Acres: {{ landHolding.netMineralAcres }}</p> -->
          </div>
          <!-- Add more properties as needed -->
          <button>
            <router-link :to="`/landholdings/${landHolding._id}`">
              View Land Holding
            </router-link>
          </button>
        </div>
      </div>
      <div class="card-container" v-else>
        <p class="card">This owner has no land holdings</p>
      </div>
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
