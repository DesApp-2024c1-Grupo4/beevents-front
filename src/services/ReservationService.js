export async function patchEventSeat(seatData) {
  const url = `https://beevents-back-reserva-tickets.onrender.com/event/${seatData.eventId}/seat`;
  const headers = {
    "Content-Type": "application/json",
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
  const url = `https://beevents-back-reserva-tickets.onrender.com/event/${placeData.eventId}/place`;
  const headers = {
    "Content-Type": "application/json",
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

import axios from "axios";

const API_URL = "https://beevents-back-reserva-tickets.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
});

export async function getReservationsByUserId(userId) {
  try {
    const response = await api.get(`/event/reservedBy/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}