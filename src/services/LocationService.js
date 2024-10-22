import axios from "axios";
import UserService from "./userService";

const us = new UserService();

const API_URL = import.meta.env.VITE_API_URL;

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
    console.log(id);
    const response = await api.get(`/location/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createLocation(location) {
  try {
    const response = await api.post(`/location/`, location, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function patchLocation(locationData) {
  console.log(locationData);
  try {
    const response = await api.patch(
      `/location/${locationData._id}`,
      locationData,
      {
        headers: {
          Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteLocation(id) {
  try {
    const response = await api.delete(`/location/${id}`, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
