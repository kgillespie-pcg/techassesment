<template>
  <div>
    <h1>Create Land Holding</h1>
    <form @submit.prevent="createLandHolding">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="landHolding.name" required />

      <label for="sectionName">Section Name:</label>
      <input
        type="text"
        id="sectionName"
        v-model="landHolding.sectionName"
        required
      />

      <label for="ownerId">Owner ID:</label>
      <input type="text" id="ownerId" v-model="landHolding.ownerId" required />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { useLandHoldingStore } from "../store/landHoldingStore";
import { ref } from "vue";

export default {
  name: "CreateLandHoldingView",
  setup() {
    const landHoldingStore = useLandHoldingStore();
    const landHolding = ref({
      name: "",
      sectionName: "",
      ownerId: "",
    });

    const createLandHolding = () => {
      landHoldingStore.createLandHolding(landHolding.value);
      // Optionally, you can redirect to the land holding's detail view or any other page after creating the land holding
    };

    return {
      landHolding,
      createLandHolding,
    };
  },
};
</script>
