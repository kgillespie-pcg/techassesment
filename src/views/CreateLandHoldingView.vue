<template>
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
        />
      </div>
      <div>
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty:</label>
        <input
          type="text"
          id="mineralOwnerRoyalty"
          v-model="landHolding.mineralOwnerRoyalty"
          required
        />
      </div>
      <div>
        <label for="section">Section:</label>
        <input
          type="text"
          id="section"
          v-model="landHolding.section"
          required
        />
      </div>
      <div>
        <label for="township">Township:</label>
        <input
          type="text"
          id="township"
          v-model="landHolding.township"
          required
        />
      </div>
      <div>
        <label for="range">Range:</label>
        <input type="text" id="range" v-model="landHolding.range" required />
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

    const createLandHolding = async () => {
      try {
        const createdLandHolding = await landHoldingStore.createLandHolding(
          landHolding.value,
          ownerId
        );

        const landHoldingId = createdLandHolding.id;
        console.log(landHoldingId);

        //Redirect to the land holding's detail view
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
      createLandHolding,
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
