import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default class UserService {
  async createUser(userData) {
    try {
      console.log(userData);
      const response = await api.post("/auth/register", userData);
      console.log(`User created: ${response.data.email}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.error("Error creating user: ", error.message);
      return null;
    }
  }

  async loginUser(userData) {
    try {
      const response = await api.post("/auth/login", userData);
      if (response.status === 201) {
        localStorage.setItem("loggedUser", JSON.stringify(response.data));
      }
      console.log(`Logged user with role: ${response.data.role}`);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      return null;
    }
  }

  async updateUser(user, id) {
    try {
      const userInStorage = localStorage.getItem("loggedUser");
      const loggedUser = JSON.parse(userInStorage);
      const response = await api.patch(`/user/${id}`, user, {
        headers: {
          Authorization: `Bearer ${loggedUser.access_token}`,
        },
      });
      const updatedUser = { ...loggedUser, names: user.names, surname: user.surname }
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
      return response.data;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async updatePassword(passwords, id) {
    try {
      const userInStorage = localStorage.getItem("loggedUser");
      const loggedUser = JSON.parse(userInStorage);
      const response = await api.patch(`/user/passchange/${id}`, passwords, {
        headers: {
          Authorization: `Bearer ${loggedUser.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  saveUserToLocalStorage(user) {
    try {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to local storage:", error);
    }
  }

  removeUserFromLocalStorage() {
    try {
      localStorage.removeItem("loggedUser");
    } catch (error) {
      console.error("Error removing user from local storage:", error);
    }
  }

  getUserFromLocalStorage() {
    try {
      const user = localStorage.getItem("loggedUser");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user from local storage:", error);
      return null;
    }
  }
}
