<template>
  <div v-if="owner">
    <h1>{{ owner.name }}</h1>
    <p>Address: {{ owner.address }}</p>
    <p>Owner Type: {{ owner.ownerType }}</p>
    <p>Entity Type: {{ owner.entityType }}</p>
    <!-- Display other fields of the owner -->
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "OwnerAboutView",
  setup() {
    const ownerStore = useOwnerStore();
    const router = useRouter();

    const ownerId = computed(() => router.currentRoute.value.params.id);
    const owner = computed(() => ownerStore.owner);

    const fetchOwner = async () => {
      try {
        const fetchedOwner = await ownerStore.getOwnerById(ownerId.value);
        console.log(fetchedOwner);
        //ownerStore.setOwner(fetchedOwner); // Set the fetched owner in the store
      } catch (error) {
        console.error("Failed to fetch owner:", error);
      }
    };

    onMounted(() => {
      fetchOwner();
    });

    return {
      owner,
    };
  },
};
</script>
