import { openDB } from "idb";

const DB_NAME = "localDB";
const STORE_NAME = "events";

export default class LocalDataBaseService {
  constructor() {
    this.dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }

  async getAllEvents() {
    try {
      const db = await this.dbPromise;
      return await db.getAll(STORE_NAME);
    } catch (error) {
      console.error("Error getting all events:", error);
      return [];
    }
  }

  async getEventById(eventId) {
    try {
      const db = await this.dbPromise;
      return await db.get(STORE_NAME, eventId);
    } catch (error) {
      console.error("Error getting event by ID:", error);
      return null;
    }
  }

  async createEvent(formData) {
    try {
      const db = await this.dbPromise;
      const id = await db.add(STORE_NAME, formData);
      return id;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  }

  async updateEvent(formData) {
    try {
      const db = await this.dbPromise;
      await db.put(STORE_NAME, formData);
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      return false;
    }
  }

  async deleteEvent(eventId) {
    try {
      const db = await this.dbPromise;
      await db.delete(STORE_NAME, eventId);
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  }
}
