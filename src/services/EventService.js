import axios from "axios";
import UserService from "./userService";

const us = new UserService();

//const API_URL = "https://beevents-back-dev.onrender.com";
const API_URL = "https://beevents-back-test.onrender.com";

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
    const response = await api.post(
      "/event/",
      event,
      { headers: { "Authorization": `Bearer ${us.getUserFromLocalStorage().access_token}` } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateEvent(event, id) {
  try {
    const response = await api.put(
      `/event/${id}`, 
      event,
      { headers: { "Authorization": `Bearer ${us.getUserFromLocalStorage().access_token}` } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await api.delete(
      `/event/${id}`,
      { headers: { "Authorization": `Bearer ${us.getUserFromLocalStorage().access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
