import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

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
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");
        console.log(ownerCollection);
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
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");
        console.log(ownerCollection);
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
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");

        // Check if an owner with the same name and address already exists
        const existingOwner = await ownerCollection.findOne({
          name: owner.name,
          address: owner.address,
        });

        if (existingOwner) {
          alert("Owner with the same name and address already exists");
          throw new Error(
            "Owner with the same name and address already exists"
          );
        }

        console.log(ownerCollection);
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
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");
        console.log(ownerCollection);
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");
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
