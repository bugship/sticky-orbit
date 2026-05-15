/**
 * Thin CRUD wrapper around Appwrite Databases.
 * Usage: await db.notes.create(payload) / update / delete / get / list
 */
import { databases, collections } from "./config";
import { ID } from "appwrite";

const db = {};

// Dynamically attach helpers for each collection listed in config.
collections.forEach((collection) => {
  db[collection.name] = {
    /** Create a document; Appwrite generates a unique id unless you pass one. */
    create: async (payload, id = ID.unique()) => {
      return await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        payload,
      );
    },
    /** Partial update of an existing document by id. */
    update: async (id, payload) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        payload,
      );
    },
    /** Permanently delete a document. */
    delete: async (id) => {
      return await databases.deleteDocument(collection.dbId, collection.id, id);
    },
    /** Fetch a single document. */
    get: async (id) => {
      return await databases.getDocument(collection.dbId, collection.id, id);
    },
    /**
     * List documents; pass Appwrite Query[] as `queries` when filtering/sorting.
     * Returns { documents, total, ... }.
     */
    list: async (queries) => {
      return await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries,
      );
    },
  };
});

export { db };
