import { defineStore } from 'pinia';
import { realmApp } from '../realmService';

export const useLandHoldingStore = defineStore('landHolding', {
  state: () => ({
    landHoldings: [],
  }),
  actions: {
    async createLandHolding(landHolding) {
      try {
        const landHoldingCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('LandHoldings');

        // Insert the land holding document into the landHoldings collection
        await landHoldingCollection.insertOne(landHolding);

        // Update the store with the newly created land holding
        this.landHoldings.push(landHolding);
      } catch (error) {
        console.error('Failed to create land holding:', error);
      }
    },

    async deleteLandHolding(landHoldingId) {
      try {
        const landHoldingCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('LandHoldings');

        // Delete the land holding document from the landHoldings collection
        await landHoldingCollection.deleteOne({ _id: landHoldingId });

        // Update the store by removing the deleted land holding
        this.landHoldings = this.landHoldings.filter((landHolding) => landHolding._id !== landHoldingId);
      } catch (error) {
        console.error('Failed to delete land holding:', error);
      }
    },

    async getLandHoldingById(landHoldingId) {
      try {
        const landHoldingCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('LandHoldings');

        // Retrieve the land holding document by ID
        const landHolding = await landHoldingCollection.findOne({ _id: landHoldingId });

        return landHolding;
      } catch (error) {
        console.error('Failed to get land holding by ID:', error);
        return null;
      }
    },
    async updateLandHolding(landHolding) {
        try {
          const landHoldingCollection = realmApp
            .currentUser.mongoClient('mongodb-atlas')
            .db('Kamary')
            .collection('LandHoldings');
  
          // Update the land holding document in the landHoldings collection
          await landHoldingCollection.updateOne({ _id: landHolding._id }, { $set: landHolding });
  
          // Update the store with the updated land holding
          const index = this.landHoldings.findIndex((lh) => lh._id === landHolding._id);
          if (index !== -1) {
            this.landHoldings[index] = landHolding;
          }
        } catch (error) {
          console.error('Failed to update land holding:', error);
        }
      },
    // async updateOwner(landHoldingId, updatedOwner) {
    //   try {
    //     const landHoldingCollection = realmApp
    //       .currentUser.mongoClient('mongodb-atlas')
    //       .db('Kamary')
    //       .collection('LandHoldings');

    //     // Update the owner field of the land holding document
    //     await landHoldingCollection.updateOne({ _id: landHoldingId }, { $set: { owner: updatedOwner } });

    //     // Update the store by finding the updated land holding and updating its owner
    //     const updatedLandHoldingIndex = this.landHoldings.findIndex((landHolding) => landHolding._id === landHoldingId);
    //     if (updatedLandHoldingIndex !== -1) {
    //       this.landHoldings[updatedLandHoldingIndex].owner = updatedOwner;
    //     }
    //   } catch (error) {
    //     console.error('Failed to update owner of land holding:', error);
    //   }
    // },
  },
});

