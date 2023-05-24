<template>
  <DashboardView />
  <div>
    <h2>Update An Owner</h2>
    <form @submit.prevent="updateOwner">
      <div class="form-question">
        <label for="name">Name:</label>
        <div>
          <input
            type="text"
            id="name"
            v-model="updatedOwner.name"
            class="text-area"
            required
          />
        </div>
      </div>
      <div class="form-question">
        <label for="address">Address:</label>
        <div>
          <input
            type="text"
            id="address"
            v-model="updatedOwner.address"
            required
            class="text-area"
          />
        </div>
      </div>
      <div class="form-question">
        <label for="ownerType">Owner Type:</label>
        <div>
          <input
            type="radio"
            value="Competitor"
            v-model="updatedOwner.ownerType"
            required
            placeholder="Competitor"
          />
          Competitor
        </div>
        <div>
          <input
            type="radio"
            value="Seller"
            v-model="updatedOwner.ownerType"
            required
          />
          Seller
        </div>
        <div>
          <input
            type="radio"
            value="Investor"
            v-model="updatedOwner.ownerType"
            required
          />
          Investor
        </div>
        <div>
          <input
            type="radio"
            value="Professional"
            v-model="updatedOwner.ownerType"
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
            v-model="updatedOwner.entityType"
            required
          />
          Company
        </div>
        <div>
          <input
            type="radio"
            value="Individual"
            v-model="updatedOwner.entityType"
            required
          />
          Individual
        </div>
        <div>
          <input
            type="radio"
            value="Investor"
            v-model="updatedOwner.entityType"
            required
          />
          Investor
        </div>
        <div>
          <input
            type="radio"
            value="Trust"
            v-model="updatedOwner.entityType"
            required
          />
          Trust
        </div>
      </div>
      <button type="submit" class="button">Update</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useOwnerStore } from "@/store/ownerStore";
import { useRouter } from "vue-router";
import DashboardView from "./DashboardView.vue";

export default {
  name: "UpdateOwnerView",
  setup() {
    const ownerStore = useOwnerStore();
    const router = useRouter();
    const ownerId = router.currentRoute.value.params.id;
    console.log("Owner ID On Update Owner Page:", ownerId);
    const updatedOwner = reactive({
      name: null,
      address: null,
      ownerType: null,
      entityType: null,
    });
    onMounted(async () => {
      try {
        let retrievedOwner = await ownerStore.getOwnerById(ownerId);
        updatedOwner.name = retrievedOwner.name;
        updatedOwner.address = retrievedOwner.address;
        updatedOwner.ownerType = retrievedOwner.ownerType;
        updatedOwner.entityType = retrievedOwner.entityType;
      } catch (error) {
        console.error("Failed to get owner by ID:", error);
      }
    });
    const updateOwner = async () => {
      try {
        await ownerStore.updateOwner(ownerId, updatedOwner);
        router.push(`/owner/${ownerId}`);
      } catch (error) {
        console.error("Failed to update owner:", error);
      }
    };
    return {
      updatedOwner,
      updateOwner,
    };
  },
  components: { DashboardView },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
