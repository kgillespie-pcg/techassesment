<template>
  <DashboardView />
  <div>
    <h1>Create Land Holding</h1>
    <form @submit.prevent="createLandHolding">
      <div>
        <label for="legalEntity">Legal Entity:</label>
        <input
          type="text"
          id="legalEntity"
          v-model="landHolding.legalEntity"
          required
        />
      </div>
      <div>
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input
          type="text"
          id="netMineralAcres"
          v-model="landHolding.netMineralAcres"
          required
          pattern="[0-9]"
          @invalid="showNumberError = true"
          @input="showNumberError = false"
        />
        <div v-if="showNumberError" style="color: red">
          Input must be a number.
        </div>
      </div>
      <div>
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty:</label>
        <input
          type="text"
          id="mineralOwnerRoyalty"
          v-model="landHolding.mineralOwnerRoyalty"
          pattern="[0-9]"
          required
          @invalid="showNumberError2 = true"
          @input="showNumberError2 = false"
        />
        <div v-if="showNumberError2" style="color: red">
          Input must be a number.
        </div>
      </div>
      <div>
        <label for="section">Section:</label>
        <input
          type="text"
          id="section"
          v-model="landHolding.section"
          pattern="[0-9]{3}"
          required
          @invalid="showSectionError = true"
          @input="showSectionError = false"
        />
        <div v-if="showSectionError" style="color: red">
          Section must be a 3-digit number.
        </div>
      </div>
      <div>
        <label for="township">Township:</label>
        <input
          type="text"
          id="township"
          v-model="landHolding.township"
          pattern="[0-9]{3}[nNsS]"
          required
          @invalid="showTownshipError = true"
          @input="showTownshipError = false"
        />
        <div v-if="showTownshipError" style="color: red">
          Township must be a 3-digit number followed by 'n' or 's'.
        </div>
      </div>
      <div>
        <label for="range">Range:</label>
        <input
          type="text"
          id="range"
          v-model="landHolding.range"
          pattern="[0-9]{3}[eEwW]"
          required
          @invalid="showRangeError = true"
          @input="showRangeError = false"
        />
        <div v-if="showRangeError" style="color: red">
          Range must be a 3-digit number followed by 'e' or 'w'.
        </div>
      </div>
      <div>
        <label for="titleSource">Title Source:</label>
        <div>
          <label>
            <input
              type="radio"
              value="Class A"
              v-model="landHolding.titleSource"
              required
            />
            Class A
          </label>
          <label>
            <input
              type="radio"
              value="Class B"
              v-model="landHolding.titleSource"
              required
            />
            Class B
          </label>
          <label>
            <input
              type="radio"
              value="Class C"
              v-model="landHolding.titleSource"
              required
            />
            Class C
          </label>
          <label>
            <input
              type="radio"
              value="Class D"
              v-model="landHolding.titleSource"
              required
            />
            Class D
          </label>
        </div>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import DashboardView from "./DashboardView.vue";

export default {
  name: "CreateLandHoldingView",
  setup() {
    const landHoldingStore = useLandHoldingStore();
    const router = useRouter();
    const ownerId = router.currentRoute.value.params.id;
    console.log("Owner ID On create land holding Page:", ownerId);
    const landHolding = ref({
      legalEntity: "",
      netMineralAcres: "",
      mineralOwnerRoyalty: "",
      section: "",
      township: "",
      range: "",
      titleSource: "",
      ownerId: ownerId,
    });
    const showSectionError = ref(false);
    const showTownshipError = ref(false);
    const showRangeError = ref(false);
    const showNumberError = ref(false);
    const showNumberError2 = ref(false);
    const createLandHolding = async () => {
      try {
        const createdLandHolding = await landHoldingStore.createLandHolding(
          landHolding.value,
          ownerId
        );
        const landHoldingId = createdLandHolding.id;
        console.log(landHoldingId);
        // Redirect to the land holding's detail view
        router.replace({
          name: "landholding-about",
          params: { id: landHoldingId },
        });
        console.log(createdLandHolding);
      } catch (error) {
        console.error("Failed to create land holding - vue:", error);
      }
    };
    return {
      landHolding,
      showSectionError,
      showTownshipError,
      showRangeError,
      createLandHolding,
      showNumberError,
      showNumberError2,
    };
  },
  components: { DashboardView },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
