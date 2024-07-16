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
