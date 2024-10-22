import axios from "axios";
import UserService from "./userService";

const us = new UserService();

const API_URL = import.meta.env.VITE_API_URL;

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

export async function getAllEventsWithUnpublishedEvents() {
  try {
    const response = await api.get("/event/pubAndNotPub");
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
    const response = await api.post("/event/", event, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEvent(event, id) {
  try {
    const response = await api.patch(`/event/${id}`, event, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function publishUnpublishEvent(state, id) {
  try {
    const response = await api.patch(`/event/${id}`, state, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await api.delete(`/event/${id}`, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNearByEvents() {
  try {
    const geoResponse = await axios.get("https://get.geojs.io/v1/ip/geo.json");
    const { latitude, longitude } = geoResponse.data;
    // Hacer la solicitud al backend con las coordenadas
    const response = await api.get("/event/nearby", {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    // Procesar la respuesta de eventos cercanos
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
