<template>
  <DashboardView />
  <div>
    <h2>Viewing All Owners</h2>
    <div id="card-container">
      <OwnerCard
        v-for="owner in filteredOwners"
        :key="owner.id"
        :owner="owner"
      />
    </div>
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { ref, onMounted } from "vue";
import OwnerCard from "./../components/OwnerCard.vue";
import DashboardView from "./DashboardView.vue";

export default {
  name: "OwnersView",
  components: {
    OwnerCard,
    DashboardView,
  },

  setup() {
    const ownerStore = useOwnerStore();
    const searchQuery = ref("");

    // const goToOwnerAboutPage = (ownerId) => {
    //   this.$router.push(`/owners/${ownerId}`);
    // };

    onMounted(async () => {
      let allOwners = await ownerStore.getAllOwners();
      filteredOwners.value = allOwners;
    });
    const filteredOwners = ref([]);

    return {
      searchQuery,
      filteredOwners,

      //goToOwnerAboutPage,
    };
  },
};
</script>
