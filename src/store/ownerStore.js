import { defineStore } from 'pinia';
import { realmApp } from '../realmService';
import * as Realm from 'realm-web';

const {
  BSON: { ObjectId },
} = Realm;
export const useOwnerStore = defineStore('owner', {
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
        console.log('Owner ID type:', typeof ownerId); 
        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');
    console.log(ownerCollection)
    let query = ObjectId(ownerId)
        const owner = await ownerCollection.findOne({ _id: query });
        console.log('Fetched owner:', owner); 
        return owner;
      } catch (error) {
        console.error('Failed to get owner by ID:', error);
        throw error;
      }
    },
    async getAllOwners() {
      try {
    
        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');
    //console.log(ownerCollection)
   
        const owners = await ownerCollection.find();
        this.owners=owners
  
        console.log('Fetched owner:', owners); 
    
      
    
        return owners;
      } catch (error) {
        console.error('Failed to get owner by ID:', error);
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

        const ownerCollection = realmApp
          .currentUser.mongoClient('mongodb-atlas')
          .db('Kamary')
          .collection('Owners');

        const insertedOwner = await ownerCollection.insertOne(newOwner);
        const ownerId = insertedOwner.insertedId.toString();

        console.log(ownerId);

        return { id: ownerId };
      } catch (error) {
        console.error('Failed to create owner:', error);
        throw error;
      }
    },
  },
});
