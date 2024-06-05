import axios from "axios";

const API_URL = "https://beevents-back-dev.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export async function getAllEvents() {
  try {
    const response = await api.get("/event");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getEventById(id) {
  try {
    const response = await api.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createEvent(event) {
  try {
    const response = await api.post("/event/", event);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteEvent(id) {
  try {
    const response = await api.delete(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
