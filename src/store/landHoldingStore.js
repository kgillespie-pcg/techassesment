import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

export const useLandHoldingStore = defineStore("landHolding", {
  state: () => ({
    landHoldings: [],
    currentLandHolding: null,
  }),
  getters: {
    // Getter to retrieve the current land holding from the state
    getCurrentLandHolding(state) {
      return state.currentLandHolding;
    },
  },
  actions: {
    // Action to create a new land holding
    async createLandHolding(landHolding, ownerId) {
      try {
        // Get the collection for land holdings and owners
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");

        // Build the section name and land holding name
        const sectionName = `${landHolding.section} - ${landHolding.township} - ${landHolding.range}`;
        const name = `${sectionName} - ${landHolding.legalEntity}`;

        // Create a new land holding object
        const newLandHolding = {
          name: name,
          sectionName: sectionName,
          legalEntity: landHolding.legalEntity,
          netMineralAcres: landHolding.netMineralAcres,
          mineralOwnerRoyalty: landHolding.mineralOwnerRoyalty,
          section: landHolding.section,
          township: landHolding.township,
          range: landHolding.range,
          titleSource: landHolding.titleSource,
          ownerId: ownerId,
        };

        // Insert the new land holding into the collection
        const insertedLandHolding = await landHoldingCollection.insertOne(
          newLandHolding
        );
        const landHoldingId = insertedLandHolding.insertedId.toString();

        console.log("LandHolding ID:", landHoldingId);

        // Prepare the query for updating the owner
        const query = ObjectId(ownerId);
        console.log("query ID type:", typeof query);

        // Update the owner's landHoldings array with the new land holding ID
        const updatedOwner = await ownerCollection.findOneAndUpdate(
          { _id: query },
          { $push: { landHoldings: landHoldingId } },
          { returnOriginal: false }
        );

        console.log("Updated Owner:", updatedOwner);
        console.log("Inserted Land Holding:", newLandHolding);

        return { id: landHoldingId, ownerId };
      } catch (error) {
        console.error("Failed to create landHolding:", error);
        throw error;
      }
    },

    // Action to get a land holding by its ID
    async getLandHoldingById(landHoldingId) {
      try {
        // Get the land holding collection
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        console.log("landholding ID type:", typeof landHoldingId);

        console.log(landHoldingCollection);

        // Prepare the query for retrieving the land holding
        let query = ObjectId(landHoldingId);

        // Find the land holding using the provided ID
        const landHolding = await landHoldingCollection.findOne({ _id: query });

        console.log("Fetched landHolding: ", landHolding);

        return landHolding;
      } catch (error) {
        console.error("Failed to get landHolding by ID:", error);
        throw error;
      }
    },

    // Action to delete a land holding
    async deleteLandHolding(landHoldingId, ownerId) {
      try {
        // Get the land holding and owner collections
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");

        // Delete the landholding by ID
        await landHoldingCollection.deleteOne({ _id: ObjectId(landHoldingId) });

        // Remove the landholding ID from the owner's landHoldings array
        await ownerCollection.updateOne(
          { _id: ObjectId(ownerId) },
          { $pull: { landHoldings: landHoldingId } }
        );

        return true; // Return a success indicator if needed
      } catch (error) {
        console.error("Failed to delete landHolding:", error);
        throw error;
      }
    },

    // Action to retrieve all land holdings
    async getAllLandHoldings() {
      try {
        // Get the land holding collection
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        // Find all land holdings
        const landHoldings = await landHoldingCollection.find();
        this.landHoldings = landHoldings;

        console.log("Fetched landHoldings:", landHoldings);

        return landHoldings;
      } catch (error) {
        console.error("Failed to get land holdings", error);
        throw error;
      }
    },

    // Action to update a land holding
    async updateLandHolding(landHoldingId, updatedLandHolding) {
      try {
        // Get the land holding collection
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        // re/,Build the section name and  name based on the updated values
        const sectionName = `${updatedLandHolding.section} - ${updatedLandHolding.township} - ${updatedLandHolding.range}`;
        const name = `${sectionName} - ${updatedLandHolding.legalEntity}`;

        // Create the updated land holding object
        const updatedLandHoldingObj = {
          name: name,
          sectionName: sectionName,
          legalEntity: updatedLandHolding.legalEntity,
          mineralOwnerRoyalty: updatedLandHolding.mineralOwnerRoyalty,
          netMineralAcres: updatedLandHolding.netMineralAcres,
          range: updatedLandHolding.range,
          section: updatedLandHolding.section,
          township: updatedLandHolding.township,
          titleSource: updatedLandHolding.titleSource,
        };

        // Update the land holding with the provided ID
        await landHoldingCollection.updateOne(
          { _id: ObjectId(landHoldingId) },
          { $set: updatedLandHoldingObj }
        );

        console.log("Updated Land Holding:", updatedLandHoldingObj);

        return true; // Return a success indicator if needed
      } catch (error) {
        console.error("Failed to update landHolding:", error);
        throw error;
      }
    },
  },
});
