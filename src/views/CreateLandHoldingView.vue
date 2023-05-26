<template>
  <DashboardView />
  <div>
    <h2>Create Land Holding</h2>
    <form @submit.prevent="createLandHolding">
      <div class="form-question">
        <label for="legalEntity">Legal Entity:</label>
        <input
          type="text"
          id="legalEntity"
          class="text-area"
          v-model="landHolding.legalEntity"
          required
        />
      </div>
      <div class="form-question">
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input
          type="text"
          id="netMineralAcres"
          class="text-area"
          v-model="landHolding.netMineralAcres"
          required
          pattern="[0-9]+"
          @invalid="showNumberError = true"
          @input="showNumberError = false"
        />
        <div v-if="showNumberError" class="error-message">
          Input must be a number.
        </div>
      </div>
      <div class="form-question">
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty:</label>
        <input
          type="text"
          id="mineralOwnerRoyalty"
          class="text-area"
          v-model="landHolding.mineralOwnerRoyalty"
          pattern="[0-9]+"
          required
          @invalid="showNumberError2 = true"
          @input="showNumberError2 = false"
        />
        <div v-if="showNumberError2" class="error-message">
          Input must be a number.
        </div>
      </div>
      <div class="form-question">
        <label for="section">Section:</label>
        <input
          type="text"
          class="text-area"
          id="section"
          v-model="landHolding.section"
          pattern="[0-9]{3}"
          required
          @invalid="showSectionError = true"
          @input="showSectionError = false"
        />
        <div v-if="showSectionError" class="error-message">
          Section must be a 3-digit number.
        </div>
      </div>
      <div class="form-question">
        <label for="township">Township:</label>
        <input
          type="text"
          id="township"
          class="text-area"
          v-model="landHolding.township"
          pattern="[0-9]{3}[NS]"
          required
          @invalid="showTownshipError = true"
          @input="showTownshipError = false"
        />
        <div v-if="showTownshipError" class="error-message">
          Township must be a 3-digit number followed by 'N' or 'S'.
        </div>
      </div>
      <div class="form-question">
        <label for="range">Range:</label>
        <input
          type="text"
          class="text-area"
          id="range"
          v-model="landHolding.range"
          pattern="[0-9]{3}[EW]"
          required
          @invalid="showRangeError = true"
          @input="showRangeError = false"
        />
        <div v-if="showRangeError" class="error-message">
          Range must be a 3-digit number followed by 'E' or 'W'.
        </div>
      </div>
      <div class="form-question">
        <label for="titleSource">Title Source:</label>
        <div>
          <div>
            <input
              type="radio"
              value="Class A"
              v-model="landHolding.titleSource"
              name="titleSource"
              required
            />
            Class A
          </div>
          <div>
            <input
              type="radio"
              value="Class B"
              v-model="landHolding.titleSource"
              name="titleSource"
              required
            />
            Class B
          </div>
          <div>
            <input
              type="radio"
              value="Class C"
              v-model="landHolding.titleSource"
              name="titleSource"
              required
            />
            Class C
          </div>
          <div>
            <input
              type="radio"
              value="Class D"
              v-model="landHolding.titleSource"
              name="titleSource"
              required
            />
            Class D
          </div>
        </div>
        <div v-if="!isTitleSourceSelected" class="error-message">
          Please select a title source.
        </div>
      </div>

      <button type="submit" class="button">Create</button>
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
  computed: {
    isTitleSourceSelected() {
      return !!this.landHolding.titleSource;
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
