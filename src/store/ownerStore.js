import { defineStore } from 'pinia';
import { realmApp } from '../realmService';

// Define the owner store
export const useOwnerStore = defineStore('owner', {
  
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
        //const createdOwner = await this.getOwnerById(ownerId);
        console.log(ownerId);
        
        //console.log("Newly created owner:", createdOwner);
        
        return { id: ownerId }; // Return the created owner object with the ID
      } catch (error) {
        console.error("Failed to create owner - ownerStore:", error);
        throw error; // Rethrow the error to be caught in the component
      }
    },
 
   },
});
