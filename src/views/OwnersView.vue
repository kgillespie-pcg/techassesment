<template>
  <h1>card container</h1>
  <div>
    <div id="cards-container">
      <OwnerCard v-for="owner in allOwners" :key="owner.id" :owner="owner" />
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
      console.log(allOwners);
      // Assuming you have a container element with the id "cards-container" in your HTML
      const container = document.getElementById("cards-container");

      // Map through each object in the allOwners array
      allOwners.map((owner) => {
        // Create a card element
        const card = document.createElement("div");
        card.classList.add("card"); // You can add CSS classes to style the card

        // Create a paragraph element to display the owner's name
        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Name: " + owner.name;

        // Append the name paragraph to the card element
        card.appendChild(nameParagraph);
        // Create a paragraph element to display the owner's name
        const entityTypeParagraph = document.createElement("p");
        entityTypeParagraph.textContent = "Entity Type: " + owner.entityType;

        // Append the name paragraph to the card element
        card.appendChild(entityTypeParagraph);
        // Create a paragraph element to display the owner's name
        const addressParagraph = document.createElement("p");
        addressParagraph.textContent = "Address: " + owner.address;

        // Append the name paragraph to the card element
        card.appendChild(addressParagraph);
        const ownerTypeParagraph = document.createElement("p");
        ownerTypeParagraph.textContent = "OwnerType: " + owner.ownerType;

        // Append the name paragraph to the card element
        card.appendChild(ownerTypeParagraph);

        // Append the card element to the container
        container.appendChild(card);
      });
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
</style>
