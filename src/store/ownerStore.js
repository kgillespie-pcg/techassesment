import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

const landHoldingCollection = realmApp.currentUser
  .mongoClient("mongodb-atlas")
  .db("Kamary")
  .collection("LandHoldings");
const ownerCollection = realmApp.currentUser
  .mongoClient("mongodb-atlas")
  .db("Kamary")
  .collection("Owners");
console.log(ownerCollection);
export const useOwnerStore = defineStore("owner", {
  state: () => ({
    owners: [],
    currentOwner: null,
  }),
  getters: {
    getCurrentOwner(state) {
      return state.currentOwner;
    },
  },
  actions: {
    async getOwnerById(ownerId) {
      try {
        console.log("Owner ID type:", typeof ownerId);
        let query = ObjectId(ownerId);
        const owner = await ownerCollection.findOne({ _id: query });
        console.log("Fetched owner:", owner);
        return owner;
      } catch (error) {
        console.error("Failed to get owner by ID:", error);
        throw error;
      }
    },
    async getAllOwners() {
      try {
        //console.log(ownerCollection)

        const owners = await ownerCollection.find();
        this.owners = owners;

        console.log("Fetched owner:", owners);

        return owners;
      } catch (error) {
        console.error("Failed to get owner by ID:", error);
        throw error;
      }
    },

    async createOwner(owner) {
      try {
        const newOwner = {
          name: owner.name,
          address: owner.address,
          ownerType: owner.ownerType,
          entityType: owner.entityType,
          LandHoldings: [],
        };

        const insertedOwner = await ownerCollection.insertOne(newOwner);
        const ownerId = insertedOwner.insertedId.toString();

        console.log(ownerId);

        return { id: ownerId };
      } catch (error) {
        console.error("Failed to create owner:", error);
        throw error;
      }
    },

    async deleteOwner(ownerId) {
      try {
        const query = ObjectId(ownerId);

        // Delete the owner
        const deleteResult = await ownerCollection.deleteOne({ _id: query });
        console.log("Deleted owner:", deleteResult);

        // Delete all landholdings associated with the owner
        await landHoldingCollection.deleteMany({ ownerId: ownerId });
        console.log("Deleted associated landholdings");

        // Remove the deleted owner from the owners array
        this.owners = this.owners.filter(
          (owner) => owner._id.toString() !== ownerId
        );

        return deleteResult;
      } catch (error) {
        console.error("Failed to delete owner:", error);
        throw error;
      }
    },
  },
});
