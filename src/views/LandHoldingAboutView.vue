<template>
  <div>
    <h1>{{ landHolding.name }}</h1>
    <p>Section Name: {{ landHolding.sectionName }}</p>
    <p>Owner: {{ landHolding.owner.name }}</p>
    <button @click="deleteLandHolding(landHolding._id)">Delete</button>
    <form @submit.prevent="updateLandHolding">
      <!-- Update land holding form fields -->
      <input type="text" v-model="updatedLandHolding.name" />
      <input type="text" v-model="updatedLandHolding.sectionName" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { useLandHoldingStore } from "../store/landHoldingStore";
import { ref } from "vue";

export default {
  name: "LandHoldingAboutView",
  props: ["landHoldingId"],
  setup(props) {
    const landHoldingStore = useLandHoldingStore();

    const landHolding = ref(null);
    const updatedLandHolding = ref(null);

    const fetchLandHolding = async () => {
      landHolding.value = await landHoldingStore.getLandHoldingById(
        props.landHoldingId
      );
      // Initialize the updatedLandHolding with a clone of the fetched land holding
      updatedLandHolding.value = { ...landHolding.value };
    };

    const deleteLandHolding = async (landHoldingId) => {
      await landHoldingStore.deleteLandHolding(landHoldingId);
      // Redirect to the owner view
      this.$router.push(`/owners/${landHolding.value.owner._id}`);
    };

    const updateLandHolding = async () => {
      await landHoldingStore.updateLandHolding(updatedLandHolding.value);
      // Fetch the updated land holding from the store
      await fetchLandHolding();
    };

    // Fetch the land holding when the component is mounted
    fetchLandHolding();

    return {
      landHolding,
      updatedLandHolding,
      deleteLandHolding,
      updateLandHolding,
    };
  },
};
</script>
