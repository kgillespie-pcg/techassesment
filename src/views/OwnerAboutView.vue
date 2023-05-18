<template>
  <div>
    <h1>Owner About View</h1>
    <div v-if="owner">
      <h2>Name: {{ owner.name }}</h2>
      <p>Address: {{ owner.address }}</p>
      <p>Owner Type:{{ owner.ownerType }}</p>
      <p>Entity Type:{{ owner.entityType }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useOwnerStore } from "@/store/ownerStore";
import { useRouter } from "vue-router";

export default {
  name: "OwnerAboutView",
  setup() {
    const ownerStore = useOwnerStore();
    const owner = reactive({
      name: null,
      address: null,
      ownerType: null,
      entityType: null,
    });
    const router = useRouter();
    const ownerId = router.currentRoute.value.params.id;
    console.log("Owner ID On About Page:", ownerId);

    onMounted(async () => {
      try {
        let retrievedOwner = await ownerStore.getOwnerById(ownerId);
        //console.log(retrievedOwner);
        owner.name = retrievedOwner.name;
        owner.address = retrievedOwner.address;
        owner.ownerType = retrievedOwner.ownerType;
        owner.entityType = retrievedOwner.entityType;
      } catch (error) {
        console.error("Failed to get owner by ID:", error);
      }
    });

    return {
      owner,
    };
  },
};
</script>
