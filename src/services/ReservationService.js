import axios from "axios";
import UserService from "./userService";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const us = new UserService();

export async function patchEventReservations(formData) {
  try {
    const response = await api.patch(
      `/event/${formData.eventId}/reservations`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function patchEventSeat(seatData) {
  try {
    const response = await api.patch(
      `/event/${seatData.eventId}/seat`,
      seatData,
      {
        headers: {
          Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function patchEventPlace(placeData) {
  try {
    const response = await api.patch(
      `/event/${placeData.eventId}/place`,
      placeData,
      {
        headers: {
          Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getReservationsByUserId(userId) {
  try {
    const response = await api.get(`/event/reservedBy/${userId}`, {
      headers: {
        Authorization: `Bearer ${us.getUserFromLocalStorage().access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
export async function patchEventSeat(seatData) {
  const url = `${API_URL}/event/${seatData.eventId}/seat`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${us.getUserFromLocalStorage().access_token}`
  };
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(seatData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Patch successful.");
      return data;
    } else {
      console.error(`Failed to patch. Status code: ${response.status}`);
      console.error(`Response: ${await response.text()}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}
 

export async function patchEventPlace(placeData) {
  const url = `${API_URL}/event/${placeData.eventId}/place`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${us.getUserFromLocalStorage().access_token}`
  };
  
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(placeData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Patch successful.");
      return data;
    } else {
      console.error(`Failed to patch. Status code: ${response.status}`);
      console.error(`Response: ${await response.text()}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}
*/
