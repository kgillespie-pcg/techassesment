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
    getCurrentLandHolding(state) {
      return state.currentLandHolding;
    },
  },
  actions: {
    async createLandHolding(landHolding, ownerId) {
      try {
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        const ownerCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("Owners");
        const newLandHolding = {
          legalEntity: landHolding.legalEntity,
          netMineralAcres: landHolding.netMineralAcres,
          mineralOwnerRoyalty: landHolding.mineralOwnerRoyalty,
          section: landHolding.section,
          township: landHolding.township,
          range: landHolding.range,
          titleSource: landHolding.titleSource,
          ownerId: ownerId,
        };

        const insertedLandHolding = await landHoldingCollection.insertOne(
          newLandHolding
        );
        const landHoldingId = insertedLandHolding.insertedId.toString();

        console.log("LandHolding ID:", landHoldingId);
        const query = ObjectId(ownerId);
        console.log("query ID type:", typeof query);
        // Push the landHoldingId to the landHoldings array of the owner
        //const findOwner = await ownerCollection.findOne({ _id: query });
        const updatedOwner = await ownerCollection.findOneAndUpdate(
          { _id: query },
          { $push: { landHoldings: landHoldingId } },
          { returnOriginal: false }
        );

        //console.log("Found Owner:", findOwner);
        console.log("Updated Owner:", updatedOwner);
        console.log("inserted land Holding 2 ", newLandHolding);

        return { id: landHoldingId, ownerId };
      } catch (error) {
        console.error("Failed to create landHolding:", error);
        throw error;
      }
    },
    async getLandHoldingById(landHoldingId) {
      try {
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");
        console.log("landholding ID type:", typeof landHoldingId);

        console.log(landHoldingCollection);
        let query = ObjectId(landHoldingId);
        const landHolding = await landHoldingCollection.findOne({ _id: query });
        console.log("Fetched landHolding: ", landHolding);
        return landHolding;
      } catch (error) {
        console.error("Failed to get landHolding by ID:", error);
        throw error;
      }
    },
    async deleteLandHolding(landHoldingId, ownerId) {
      try {
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
    async getAllLandHoldings() {
      try {
        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");
        const landHoldings = await landHoldingCollection.find();
        this.landHoldings = landHoldings;

        console.log("Fetched landHoldings:", landHoldings);

        return landHoldings;
      } catch (error) {
        console.error("Failed to get land holdings", error);
        throw error;
      }
    },
  },
});
