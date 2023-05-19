<template>
  <div>
    <h1>Card Container</h1>
    <div>
      <div id="cards-container">
        <OwnerCard
          v-for="owner in filteredOwners"
          :key="owner.id"
          :owner="owner"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { ref, onMounted } from "vue";
import OwnerCard from "./../components/OwnerCard.vue";

export default {
  name: "OwnersView",
  components: {
    OwnerCard,
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
<style scoped>
p {
  color: orange;
}

/* .card {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  color: red;
} */
/* #cards-container {
  border: 1px solid black;
} */
</style>
