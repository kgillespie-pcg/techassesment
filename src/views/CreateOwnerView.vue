<template>
  <DashboardView />
  <div>
    <h2>Create An Owner</h2>
    <form @submit.prevent="createOwner">
      <div class="form-question">
        <label for="name">Name:</label>

        <input
          type="text"
          id="name"
          v-model="owner.name"
          class="text-area"
          required
        />
      </div>
      <div class="form-question">
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          v-model="owner.address"
          required
          class="text-area"
        />
      </div>
      <div class="form-question">
        <label for="ownerType">Owner Type:</label>

        <div>
          <input
            type="radio"
            value="Competitor"
            v-model="owner.ownerType"
            required
            placeholder="Competitor"
          />
          Competitor
        </div>
        <div>
          <input
            type="radio"
            value="Seller"
            v-model="owner.ownerType"
            required
          />
          Seller
        </div>
        <div>
          <input
            type="radio"
            value="Investor"
            v-model="owner.ownerType"
            required
          />
          Investor
        </div>
        <div>
          <input
            type="radio"
            value="Professional"
            v-model="owner.ownerType"
            required
          />
          Professional
        </div>
      </div>
      <div class="form-question">
        <label for="entityType">Entity Type:</label>

        <div>
          <input
            type="radio"
            value="Company"
            v-model="owner.entityType"
            required
          />
          Company
        </div>
        <div>
          <input
            type="radio"
            value="Individual"
            v-model="owner.entityType"
            required
          />
          Individual
        </div>
        <div>
          <input
            type="radio"
            value="Investor"
            v-model="owner.entityType"
            required
          />
          Investor
        </div>
        <div>
          <input
            type="radio"
            value="Trust"
            v-model="owner.entityType"
            required
          />
          Trust
        </div>
      </div>
      <button type="submit" class="button">Create</button>
    </form>
  </div>
</template>

<script>
import { useOwnerStore } from "../store/ownerStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import DashboardView from "./DashboardView.vue";

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
  components: { DashboardView },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
