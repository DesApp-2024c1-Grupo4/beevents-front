import axios from "axios";
import UserService from "./userService";

const us = new UserService();
const loggedUser = us.getUserFromLocalStorage();

//const API_URL = "https://beevents-back-dev.onrender.com";
const API_URL = "https://beevents-back-test.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

const api_secure = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${loggedUser.access_token}`
  }
})

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
    const response = await api_secure.post("/event/", event);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateEvent(event, id) {
  try {
    const response = await api_secure.put(`/event/${id}`, event);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await api_secure.delete(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
