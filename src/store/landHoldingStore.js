import { defineStore } from "pinia";
import { realmApp } from "../realmService";
// import * as Realm from "realm-web";

// const {
//   BSON: { ObjectId },
// } = Realm;
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
    async createLandHolding(landHolding) {
      try {
        const newLandHolding = {
          legalEntity: landHolding.legalEntity,
          netMineralAcres: landHolding.netMineralAcres,
          mineralOwnerRoyalty: landHolding.mineralOwnerRoyalty,
          section: landHolding.section,
          township: landHolding.township,
          range: landHolding.range,
          titleSource: landHolding.titleSource,
        };

        const landHoldingCollection = realmApp.currentUser
          .mongoClient("mongodb-atlas")
          .db("Kamary")
          .collection("LandHoldings");

        const insertedLandHolding = await landHoldingCollection.insertOne(
          newLandHolding
        );
        const landHoldingId = insertedLandHolding.insertedId.toString();

        console.log(landHoldingId);

        return { id: landHoldingId };
      } catch (error) {
        console.error("Failed to create landHolding:", error);
        throw error;
      }
    },
  },
});
