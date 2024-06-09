import axios from "axios";

const API_URL = "https://beevents-back-dev.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export async function getAllLocations() {
  try {
    const response = await api.get(`/location`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocationById(id) {
  try {
    const response = await api.get(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createLocation(location) {
  try {
    const response = await api.post(`/location/`, location);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLocation(id) {
  try {
    const response = await api.delete(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
