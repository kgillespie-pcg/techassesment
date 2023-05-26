import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

// Define the owner store
export const useOwnerStore = defineStore("owner", {
  state: () => ({
    owners: [], // Array to store fetched owners
    currentOwner: null, // Current selected owner
  }),
  getters: {
    getCurrentOwner(state) {
      return state.currentOwner; // Getter for the current owner
    },
  },
  actions: {
    /**
     * Retrieves an owner by ID from the database.
     * @param {string} ownerId - The ID of the owner to retrieve.
     * @returns {Object|null} - The fetched owner object or null if not found.
     */
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

    /**
     * Retrieves all owners from the database.
     * @returns {Array} - The array of fetched owner objects.
     */
    async getAllOwners() {
      try {
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");
        console.log(ownerCollection);
        const owners = await ownerCollection.find();
        this.owners = owners; // Update the owners array in the store

        console.log("Fetched owner:", owners);

        return owners;
      } catch (error) {
        console.error("Failed to get owners:", error);
        throw error;
      }
    },

    /**
     * Creates a new owner in the database.
     * @param {Object} owner - The owner object to create.
     * @returns {Object} - The inserted owner object with its generated ID.
     */
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

    /**
     * Deletes an owner from the database.
     * @param {string} ownerId - The ID of the owner to delete.
     * @returns {Object} - The delete result object.
     */
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

    /**
     * Sets the current selected owner in the store.
     * @param {Object} owner - The owner object to set as current.
     */
    async setCurrentOwner(owner) {
      this.currentOwner = owner;
    },

    /**
     * Updates an owner in the database.
     * @param {string} ownerId - The ID of the owner to update.
     * @param {Object} updatedOwner - The updated owner object.
     * @returns {Object} - The update result object.
     */
    async updateOwner(ownerId, updatedOwner) {
      try {
        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");

        const query = { _id: ObjectId(ownerId) };
        const update = { $set: updatedOwner };

        const updateResult = await ownerCollection.updateOne(query, update);

        if (updateResult.modifiedCount === 0) {
          throw new Error(
            "Failed to update owner. Owner not found or no changes were made."
          );
        }

        return updateResult;
      } catch (error) {
        console.error("Failed to update owner:", error);
        throw error;
      }
    },
  },
});
