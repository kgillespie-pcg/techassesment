<template>
  <div>
    <h1>Create Land Holding</h1>
    <form @submit.prevent="createLandHolding">
      <label for="legalEntity">Legal Entity:</label>
      <input
        type="text"
        id="legalEntity"
        v-model="landHolding.legalEntity"
        required
      />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { useLandHoldingStore } from "@/store/landHoldingStore";
import { ref } from "vue";
//import { useRouter } from "vue-router";

export default {
  name: "CreateLandHoldingView",
  setup() {
    const landHoldingStore = useLandHoldingStore();
    const landHolding = ref({
      legalEntity: "",
    });
    //const router = useRouter();

    const createLandHolding = async () => {
      try {
        const createdLandHolding = await landHoldingStore.createLandHolding(
          landHolding.value
        );
        //console.log(createdOwner.name);

        //const landHoldingId = createdLandHolding.id;

        // Redirect to the owner's detail view
        //router.replace({ name: "OwnerAboutView", params: { id: ownerId } });
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
