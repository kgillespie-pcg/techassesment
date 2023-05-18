<template>
  <h1>Hello</h1>
</template>

<script>
//import { conditionalExpression } from "@babel/types";
//import { useOwnerStore } from "../store/ownerStore";
//import { computed, onMounted } from "vue";
//import { useRouter } from "vue-router";

export default {
  name: "OwnerAboutView",
  setup() {
    // Access the ownerStore
    //const ownerStore = useOwnerStore();
    // Access the Vue router
    // const router = useRouter();
    // Compute the ownerId from the current route parameters
    //const ownerId = computed(() => router.currentRoute.value.params.id);
    // Compute the owner from the ownerStore
    //const owner = computed(() => ownerStore.owner);
    // Fetch the owner data from the store or server
    // const fetchOwner = async () => {
    //   try {
    //     // Call the getOwnerById action from the ownerStore and pass the ownerId
    //     const fetchedOwner = await ownerStore.getOwnerById(ownerId.value);
    //     console.log("check " + ownerId.value);
    //     console.log(fetchedOwner);
    //     //ownerStore.setOwner(fetchedOwner); // Set the fetched owner in the store
    //   } catch (error) {
    //     console.error("Failed to fetch owner:", error);
    //   }
    // };
    // // Call fetchOwner when the component is mounted
    // onMounted(() => {
    //   fetchOwner();
    // });
    // // Return the owner computed property to be used in the template
    // return {
    //   owner,
    // };
  },
};
</script>

<!-- <div v-if="owner">
  <h1>{{ owner.name }}</h1>
  <p>Address: {{ owner.address }}</p>
  <p>Owner Type: {{ owner.ownerType }}</p>
  <p>Entity Type: {{ owner.entityType }}</p>
  Display other fields of the owner
</div> -->
