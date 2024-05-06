import axios from "axios";
import { API_WEATHER_KEY, API_WEATHER_URL } from "../config/config";

export async function getCurrentWeather(place) {
  const response = await axios.get(
    `${API_WEATHER_URL}/rest/services/timeline/${place}`,
    { params: { unitGroup: 'metric', include: 'current', key: API_WEATHER_KEY, contentType: 'json'} }
  );
  return response.data;
}
