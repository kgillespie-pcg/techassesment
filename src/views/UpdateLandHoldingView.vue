<template>
  <DashboardView />
  <div>
    <h2>Update Land Holding</h2>
    <form @submit.prevent="updateLandHolding">
      <div class="form-question">
        <label for="legalEntity">Legal Entity:</label>
        <input
          type="text"
          id="legalEntity"
          class="text-area"
          v-model="updatedLandHolding.legalEntity"
          required
        />
      </div>
      <div class="form-question">
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty:</label>
        <input
          type="text"
          id="mineralOwnerRoyalty"
          class="text-area"
          v-model="updatedLandHolding.mineralOwnerRoyalty"
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
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input
          type="text"
          id="netMineralAcres"
          class="text-area"
          v-model="updatedLandHolding.netMineralAcres"
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
        <label for="section">Section:</label>
        <input
          type="text"
          class="text-area"
          id="section"
          v-model="updatedLandHolding.section"
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
          v-model="updatedLandHolding.township"
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
          v-model="updatedLandHolding.range"
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
              v-model="updatedLandHolding.titleSource"
              required
            />
            Class A
          </div>
          <div>
            <input
              type="radio"
              value="Class B"
              v-model="updatedLandHolding.titleSource"
              required
            />
            Class B
          </div>
          <div>
            <input
              type="radio"
              value="Class C"
              v-model="updatedLandHolding.titleSource"
              required
            />
            Class C
          </div>
          <div>
            <input
              type="radio"
              value="Class D"
              v-model="updatedLandHolding.titleSource"
              required
            />
            Class D
          </div>
        </div>
      </div>
      <button class="button" type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { useRouter } from "vue-router";
import DashboardView from "./DashboardView.vue";

export default {
  name: "UpdateLandHoldingView",
  setup() {
    const landHoldingStore = useLandHoldingStore();
    const router = useRouter();
    const landHoldingId = router.currentRoute.value.params.id;
    const updatedLandHolding = reactive({
      name: null,
      sectionName: null,
      legalEntity: null,
      mineralOwnerRoyalty: null,
      netMineralAcres: null,
      range: null,
      section: null,
      township: null,
      titleSource: null,
    });
    const showSectionError = ref(false);
    const showTownshipError = ref(false);
    const showRangeError = ref(false);
    const showNumberError = ref(false);
    const showNumberError2 = ref(false);
    onMounted(async () => {
      try {
        let retrievedLandHolding = await landHoldingStore.getLandHoldingById(
          landHoldingId
        );
        updatedLandHolding.name = retrievedLandHolding.name;
        updatedLandHolding.sectionName = retrievedLandHolding.sectionName;
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
        if (
          updatedLandHolding.section &&
          updatedLandHolding.township &&
          updatedLandHolding.range
        ) {
          await landHoldingStore.updateLandHolding(
            landHoldingId,
            updatedLandHolding
          );
          router.push(`/landholdings/${updatedLandHolding._id}`);
        }
      } catch (error) {
        console.error("Failed to update landholding:", error);
      }
    };
    return {
      updatedLandHolding,
      updateLandHolding,
      showRangeError,
      showSectionError,
      showTownshipError,
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
