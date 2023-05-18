<template>
  <div>
    <h1>All Owners</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by owner name or address"
    />
    <div v-for="owner in filteredOwners" :key="owner.id">
      <div class="card">
        <p>Name: {{ owner.name }}</p>
        <p>Address: {{ owner.address }}</p>
        <p>Owner Type: {{ owner.ownerType }}</p>
        <p>Entity Type: {{ owner.entityType }}</p>
        <p>Number of Land Holdings: {{ owner.landHoldings.length }}</p>
        <button @click="goToOwnerAboutPage(owner.id)">About</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { ref, computed, onMounted } from "vue";

export default {
  name: "OwnersView",
  setup() {
    const ownerStore = useOwnerStore();
    const searchQuery = ref("");

    const owners = computed(() => {
      return ownerStore.owners;
    });

    const filteredOwners = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return owners.value.filter(
        (owner) =>
          owner.name.toLowerCase().includes(query) ||
          owner.address.toLowerCase().includes(query)
      );
    });

    const goToOwnerAboutPage = (ownerId) => {
      this.$router.push(`/owners/${ownerId}`);
    };

    onMounted(async () => {
      await ownerStore.fetchAllOwners();
    });

    return {
      searchQuery,
      owners,
      filteredOwners,
      goToOwnerAboutPage,
    };
  },
};
</script>
