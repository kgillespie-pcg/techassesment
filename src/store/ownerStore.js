import { defineStore } from 'pinia';
import { realmApp } from '../realmService';

// Define the owner store
export const useOwnerStore = defineStore('owner', {
  state: () => ({
    owners: [], // Array to store all owners
    owner: null // Currently selected owner
  }),
  mutations: {
    setOwner(owner) {
      // Mutation to set the owner in the store
      this.owner = owner;
    },
  },
  actions: {
    async createOwner(owner) {
      try {
        const newOwner = {
          // Create a new owner object
          name: owner.name,
          address: owner.address,
          ownerType: owner.ownerType,
          entityType: owner.entityType,
          LandHoldings: []
        };
        
        const ownerCollection = realmApp
        .currentUser.mongoClient('mongodb-atlas')
        .db('Kamary')
        .collection('Owners');
        
        // Insert the new owner document into the owners collection
        const insertedOwner = await ownerCollection.insertOne(newOwner);
        const ownerId = insertedOwner.insertedId.toString(); // Extract the owner ID
        
        // Fetch the created owner from the database
        const createdOwner = await this.getOwnerById(ownerId);
        console.log(ownerId);
        
        console.log("Newly created owner:", createdOwner);
        
        return { id: ownerId }; // Return the created owner object with the ID
      } catch (error) {
        console.error("Failed to create owner:", error);
        throw error; // Rethrow the error to be caught in the component
      }
    },
    async getOwnerById(ownerId) {
      try {
        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');
    
        // Find the owner document by ID in the owners collection
        const owner = await ownerCollection.findOne({ _id: ownerId });
    
        // Update the owner state in the store
        this.$patch({ owner });
    
        // Return the owner document
        console.log("hello "+owner)
        return owner;
      } catch (error) {
        console.error('Failed to fetch owner:', error);
        throw error;
      }
    },
    
    
    async deleteOwner(ownerId) {
      try {
        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');
        
        // Delete the owner document from the owners collection
        await ownerCollection.deleteOne({ _id: ownerId });
        
        // Update the store by removing the deleted owner from the owners array
        this.owners = this.owners.filter((owner) => owner._id !== ownerId);
      } catch (error) {
        console.error('Failed to delete owner:', error);
      }
    },
    
    
    async updateOwner(updatedOwner) {
      try {
        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');
        
        // Update the owner document in the owners collection
        await ownerCollection.updateOne({ _id: updatedOwner._id }, { $set: updatedOwner });
        
        // Update the store by finding the updated owner and replacing it in the owners array
        const index = this.owners.findIndex((owner) => owner._id === updatedOwner._id);
        if (index !== -1) {
          this.owners.splice(index, 1, updatedOwner);
        }
      } catch (error) {
        console.error('Failed to update owner:', error);
      }
    },
  },
});
