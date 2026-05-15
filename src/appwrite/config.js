/**
 * Appwrite client configuration.
 *
 * Env vars (see .env.example):
 *  - VITE_ENDPOINT          e.g. https://cloud.appwrite.io/v1
 *  - VITE_PROJECT_ID
 *  - VITE_DATABASE_ID
 *  - VITE_COLLECTION_NOTES_ID
 */
import { Client, Databases } from "appwrite";

// Single shared client for the whole app.
const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

// Collections registry — add more entries here if you grow beyond notes.
const collections = [
  {
    name: "notes",
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
];

export { client, databases, collections };
