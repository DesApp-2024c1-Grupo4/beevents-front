import axios from "axios";

export async function getAllLocations() {
  try {
    const response = await axios.get(`https://beevents-back-dev.onrender.com/location`);
    //console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocationById(id) {
  try {
    const response = await axios.get(`https://beevents-back-dev.onrender.com/location/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createLocation(location) {
  try {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, location);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLocation(id) {
  try {
    const response = await axios.delete(`https://beevents-back-dev.onrender.com/location/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
