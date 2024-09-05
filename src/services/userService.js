import axios from "axios";

const API_URL = "https://beevents-back-dev.onrender.com";
//const API_URL = "https://beevents-back-test.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default class UserService {
  async createUser(userData) {
    try {
      //const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      //const id = Date.now().toString();
      //const newUser = { id, email, password };
      //existingUsers.push(newUser);
      //localStorage.setItem("users", JSON.stringify(existingUsers));
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
      /**
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        return { success: true, userId: user.id };
      
      } else {
        return { success: false, message: "Invalid username or password" };
      }
     */
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
