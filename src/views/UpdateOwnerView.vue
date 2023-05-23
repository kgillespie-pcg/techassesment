<template>
  <div>
    <h1>Update Owner</h1>
    <form @submit.prevent="updateOwner">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="updatedOwner.name" required />
      </div>
      <div>
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          v-model="updatedOwner.address"
          required
        />
      </div>
      <div>
        <label for="ownerType">Owner Type:</label>
        <div>
          <label>
            <input
              type="radio"
              value="Competitor"
              v-model="updatedOwner.ownerType"
              required
            />
            Competitor
          </label>
          <label>
            <input
              type="radio"
              value="Seller"
              v-model="updatedOwner.ownerType"
              required
            />
            Seller
          </label>
          <label>
            <input
              type="radio"
              value="Investor"
              v-model="updatedOwner.ownerType"
              required
            />
            Investor
          </label>
          <label>
            <input
              type="radio"
              value="Professional"
              v-model="updatedOwner.ownerType"
              required
            />
            Professional
          </label>
        </div>
      </div>
      <div>
        <label for="entityType">Entity Type:</label>
        <label>
          <input
            type="radio"
            value="Company"
            v-model="updatedOwner.entityType"
            required
          />
          Company
        </label>
        <label>
          <input
            type="radio"
            value="Individual"
            v-model="updatedOwner.entityType"
            required
          />
          Individual
        </label>
        <label>
          <input
            type="radio"
            value="Investor"
            v-model="updatedOwner.entityType"
            required
          />
          Investor
        </label>
        <label>
          <input
            type="radio"
            value="Trust"
            v-model="updatedOwner.entityType"
            required
          />
          Trust
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useOwnerStore } from "@/store/ownerStore";
import { useRouter } from "vue-router";

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
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
