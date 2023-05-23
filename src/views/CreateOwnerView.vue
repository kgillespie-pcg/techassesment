<template>
  <div>
    <h1>Create Owner</h1>
    <form @submit.prevent="createOwner">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="owner.name" required />

      <label for="address">Address:</label>
      <input type="text" id="address" v-model="owner.address" required />

      <label for="ownerType">Owner Type:</label>
      <div>
        <label>
          <input
            type="radio"
            value="Competitor"
            v-model="owner.ownerType"
            required
          />
          Competitor
        </label>
        <label>
          <input
            type="radio"
            value="Seller"
            v-model="owner.ownerType"
            required
          />
          Seller
        </label>
        <label>
          <input
            type="radio"
            value="Investor"
            v-model="owner.ownerType"
            required
          />
          Investor
        </label>
        <label>
          <input
            type="radio"
            value="Professional"
            v-model="owner.ownerType"
            required
          />
          Professional
        </label>
      </div>

      <label for="entityType">Entity Type:</label>
      <label>
        <input
          type="radio"
          value="Company"
          v-model="owner.entityType"
          required
        />
        Company
      </label>
      <label>
        <input
          type="radio"
          value="Individual"
          v-model="owner.entityType"
          required
        />
        Individual
      </label>
      <label>
        <input
          type="radio"
          value="Investor"
          v-model="owner.entityType"
          required
        />
        Investor
      </label>
      <label>
        <input type="radio" value="Trust" v-model="owner.entityType" required />
        Trust
      </label>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "CreateOwnerView",
  setup() {
    const ownerStore = useOwnerStore();
    const owner = ref({
      name: "",
      address: "",
      ownerType: "",
      entityType: "",
    });
    const router = useRouter();

    const createOwner = async () => {
      try {
        const createdOwner = await ownerStore.createOwner(owner.value);
        //console.log(createdOwner.name);
        const ownerId = createdOwner.id;

        // Redirect to the owner's detail view
        router.replace({ name: "OwnerAboutView", params: { id: ownerId } });
        console.log(createdOwner);
      } catch (error) {
        console.error("Failed to create owner - vue:", error);
      }
    };

    return {
      owner,
      createOwner,
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
