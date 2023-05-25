<template>
  <DashboardView />
  <div>
    <div v-if="landHolding">
      <h2><strong>Viewing Land Holding: </strong>{{ landHolding.name }}</h2>
      <div class="button-div">
        <button @click="deleteLandHolding">Delete Land Holding</button>
        <router-link :to="`/owner/${landHolding.ownerId}`">
          <button>View Owner</button>
        </router-link>
        <router-link :to="`/update-landholding/${landHolding._id}`">
          <button>Update Land Holding</button>
        </router-link>
      </div>
      <div class="about-card">
        <p><span>Name: </span>{{ landHolding.name }}</p>
        <p><span>Section Name: </span>{{ landHolding.sectionName }}</p>
        <p><span>Legal Entity: </span>{{ landHolding.legalEntity }}</p>
        <p>
          <span>Mineral Owner Royalty: </span
          >{{ landHolding.mineralOwnerRoyalty }}
        </p>
        <p>
          <span>Net Mineral Acres: </span> {{ landHolding.netMineralAcres }}
        </p>
        <p><span>Section: </span> {{ landHolding.section }}</p>
        <p><span>Township: </span> {{ landHolding.township }}</p>
        <p><span>Range: </span> {{ landHolding.range }}</p>
        <p><span>Title Source: </span> {{ landHolding.titleSource }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { useRouter } from "vue-router";
import DashboardView from "./DashboardView.vue";

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
  components: { DashboardView },
};
</script>
