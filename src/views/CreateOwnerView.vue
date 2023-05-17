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
            value="competitor"
            v-model="owner.ownerType"
            required
          />
          Competitor
        </label>
        <label>
          <input
            type="radio"
            value="seller"
            v-model="owner.ownerType"
            required
          />
          Seller
        </label>
        <label>
          <input
            type="radio"
            value="investor"
            v-model="owner.ownerType"
            required
          />
          Investor
        </label>
        <label>
          <input
            type="radio"
            value="professional"
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
          value="company"
          v-model="owner.entityType"
          required
        />
        Company
      </label>
      <label>
        <input
          type="radio"
          value="individual"
          v-model="owner.entityType"
          required
        />
        Individual
      </label>
      <label>
        <input
          type="radio"
          value="investor"
          v-model="owner.entityType"
          required
        />
        Investor
      </label>
      <label>
        <input type="radio" value="trust" v-model="owner.entityType" required />
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
        const createdOwner = await ownerStore.createOwner(owner);
        const ownerId = createdOwner.id;

        //Redirect to the owner's detail view
        router.replace({ name: "OwnerAboutView", params: { id: ownerId } });
        console.log(createdOwner);
      } catch (error) {
        console.error("Failed to create owner:", error);
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
